#!/usr/bin/env node

/**
 * Scrape jammi.in wellness products and sync Product Description,
 * Key Ingredients, Indications, and Dosage into Convex products.
 *
 * Usage:
 *   npm run sync:jammi
 */

import { writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { execFile } from "node:child_process";

const execFileAsync = promisify(execFile);

const BASE_CATEGORY_URL = "https://jammi.in/product-category/wellness/";
const MAX_PRODUCTS = 50;
const PAGE_LIMIT = 8;
const BATCH_SIZE = 12;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cleanText = (value) =>
    (value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8230;/g, "...")
    .replace(/&#8377;/g, "₹")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

function slugFromUrl(url) {
    const match = url.match(/\/product\/([^/?#]+)/i);
    return match ? match[1].toLowerCase() : "";
}

function titleToSlug(name) {
    return (name || "")
        .toLowerCase()
        .replace(/<[^>]+>/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function extractAccordionContent(html, sectionTitle) {
    const escaped = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(
        `<div class="accordion-item">[\\s\\S]*?<button[^>]*>[\\s\\S]*?${escaped}[\\s\\S]*?<\\/button>[\\s\\S]*?<div class="accordion-content">([\\s\\S]*?)<\\/div>[\\s\\S]*?<\\/div>`,
        "i"
    );
    const m = html.match(re);
    return m ? cleanText(m[1]) : "";
}

async function fetchHtml(url) {
    const res = await fetch(url, {
        headers: {
            "user-agent": "Mozilla/5.0 (compatible; JammiSyncBot/1.0)",
            accept: "text/html,application/xhtml+xml",
        },
    });
    if (!res.ok) {
        throw new Error(`Failed ${url}: ${res.status}`);
    }
    return res.text();
}

async function collectProductLinks() {
    const links = new Set();

    for (let page = 1; page <= PAGE_LIMIT && links.size < MAX_PRODUCTS; page += 1) {
        const url = page === 1 ? BASE_CATEGORY_URL : `${BASE_CATEGORY_URL}page/${page}/`;
        const html = await fetchHtml(url);

        const re = /href="(https:\/\/jammi\.in\/product\/[^"]+)"/gi;
        let match;
        while ((match = re.exec(html)) !== null) {
            links.add(match[1]);
            if (links.size >= MAX_PRODUCTS) break;
        }

        // Stop early if pagination ended
        if (!html.includes("next page-numbers") && page > 1) {
            break;
        }
    }

    return Array.from(links).slice(0, MAX_PRODUCTS);
}

function extractPrice(html) {
    const m = html.match(/woocommerce-Price-amount[^>]*>\s*<bdi>[\s\S]*?([\d,.]+)\s*<\/bdi>/i) ||
        html.match(/₹\s*([\d,.]+)/i);
    if (!m) return 0;
    const num = Number(String(m[1]).replace(/,/g, ""));
    return Number.isFinite(num) ? num : 0;
}

function extractImage(html) {
    const og = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
    if (og && og[1]) return og[1];

    const img = html.match(/<img[^>]+class="[^"]*wp-post-image[^"]*"[^>]+src="([^"]+)"/i);
    return (img && img[1]) ? img[1] : "";
}

async function scrapeProduct(url) {
    const html = await fetchHtml(url);

    const titleMatch =
        html.match(/<h1[^>]*class="[^"]*product-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
        html.match(/<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i);
    const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
    const resolvedName = (titleMatch && titleMatch[1]) || (ogTitle && ogTitle[1]) || slugFromUrl(url);
    const name = cleanText(resolvedName).split("\n")[0].trim();

    const description = extractAccordionContent(html, "Product Description");
    const ingredients = extractAccordionContent(html, "Key Ingredients") || extractAccordionContent(html, "Ingredients");
    const indications = extractAccordionContent(html, "Indications");
    const dosage = extractAccordionContent(html, "Dosage");

    const slug = slugFromUrl(url) || titleToSlug(name);
    const price = extractPrice(html);
    const image = extractImage(html);

    return {
        name,
        slug,
        price: price || 0,
        description,
        short_description: (description || "").slice(0, 180),
        ingredients,
        indications,
        dosage,
        images: image ? [image] : [],
        category: "Wellness",
        status: "Published",
        source_url: url,
    };
}

function chunk(list, size) {
    const out = [];
    for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
    return out;
}

async function importBatch(productsBatch) {
    const payload = productsBatch.map((p) => ({
        name: p.name,
        slug: p.slug,
        description: p.description,
        short_description: p.short_description,
        ingredients: p.ingredients,
        indications: p.indications,
        dosage: p.dosage,
    }));
    const args = JSON.stringify({ products: payload });
    const { stdout, stderr } = await execFileAsync(
        "npx", [
            "convex",
            "run",
            "--push",
            "functions/products_mutations:importProductBatch",
            args,
        ], { maxBuffer: 1024 * 1024 * 10 }
    );

    if (stderr && stderr.trim()) {
        console.warn(stderr.trim());
    }
    return stdout;
}

async function main() {
    console.log("[1/4] Collecting wellness product links from jammi.in...");
    const links = await collectProductLinks();
    if (links.length === 0) throw new Error("No product links found on jammi.in wellness pages");

    console.log(`[2/4] Scraping ${links.length} product pages for description/ingredients/indications/dosage...`);
    const scraped = [];
    for (let i = 0; i < links.length; i += 1) {
        const url = links[i];
        try {
            const p = await scrapeProduct(url);
            if (p.name && p.slug) scraped.push(p);
            console.log(`  ${i + 1}/${links.length}: ${p.name || p.slug}`);
        } catch (err) {
            console.warn(`  skipped ${url}: ${err.message}`);
        }
        await sleep(300);
    }

    await writeFile("scripts/jammi-products.json", `${JSON.stringify(scraped, null, 2)}\n`);

    console.log(`[3/4] Importing ${scraped.length} products into Convex in batches of ${BATCH_SIZE}...`);
    const batches = chunk(scraped, BATCH_SIZE);
    for (let i = 0; i < batches.length; i += 1) {
        await importBatch(batches[i]);
        console.log(`  imported batch ${i + 1}/${batches.length}`);
    }

    console.log("[4/4] Done. Product content synced to your Jammi site.");
    console.log("Saved scraped snapshot: scripts/jammi-products.json");
}

main().catch((err) => {
    console.error("Sync failed:", err.message);
    process.exit(1);
});