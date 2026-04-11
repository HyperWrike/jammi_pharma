#!/usr/bin/env node

/**
 * Advanced scraper for jammi.in products with full details
 * Extracts: name, price, image, description, ingredients, indications, dosage
 */

const https = require('https');
const { promisify } = require('util');
const fs = require('fs').promises;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function extractSection(html, patterns) {
    for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match) {
            return match[1]
                .replace(/<[^>]+>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&quot;/g, '"')
                .trim();
        }
    }
    return '';
}

async function scrapeProductDetails(productUrl) {
    try {
        console.log(`  Scraping: ${productUrl}`);
        await delay(500); // Rate limiting

        const html = await fetchHTML(productUrl);

        // Extract title/name
        const titleMatch = html.match(/<h1[^>]*class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
            html.match(/<title>([\s\S]*?)<\/title>/i);
        const name = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim().split('|')[0].trim() : '';

        // Extract price
        const priceMatch = html.match(/₹\s*([\d,]+)/);
        const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 0;

        // Extract image URL
        const imgMatch = html.match(/<img[^>]*class="[^"]*attachment-[^"]*"[^>]*src="([^"]*)"/i) ||
            html.match(/<img[^>]*data-src="([^"]*)"[^>]*(?:alt|class)="[^"]*product[^"]*"/i) ||
            html.match(/<img[^>]*src="([^"]*(\.jpg|\.png|\.jpeg))"[^>]*/i);
        const image = imgMatch ? imgMatch[1] : '';

        // Extract product description (main content)
        const descMatch = html.match(/<div[^>]*class="[^"]*woocommerce-product-details__short-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
            html.match(/<div[^>]*class="[^"]*product-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
            html.match(/<p[^>]*>([\s\S]{50,400}(?:(?:ayurved|traditional|formulation|boost|support|health)\w*.*?){0,3})<\/p>/i);
        const description = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim().substring(0, 500) : '';

        // Extract Key Ingredients
        const ingredientsPatterns = [
            /<h[2-4][^>]*>(?:Key\s+)?Ingredients?<\/h[2-4]>([\s\S]{0,500}?)(?:<h[2-4]|<\/div>|<\/section>)/i,
            /<strong>Ingredients?<\/strong>:([\s\S]{0,300}?)(?:<\w|$)/i,
            /<li>(?:Key\s+)?Ingredients?:?\s*([\s\S]{0,500}?)<\/li>/i
        ];
        const ingredients = extractSection(html, ingredientsPatterns);

        // Extract Indications
        const indicationsPatterns = [
            /<h[2-4][^>]*>Indications?<\/h[2-4]>([\s\S]{0,500}?)(?:<h[2-4]|<\/div>|<\/section>)/i,
            /<strong>Indications?<\/strong>:([\s\S]{0,300}?)(?:<\w|$)/i,
            /<li>Indications?:?\s*([\s\S]{0,500}?)<\/li>/i
        ];
        const indications = extractSection(html, indicationsPatterns);

        // Extract Dosage
        const dosagePatterns = [
            /<h[2-4][^>]*>Dosage<\/h[2-4]>([\s\S]{0,500}?)(?:<h[2-4]|<\/div>|<\/section>)/i,
            /<strong>Dosage<\/strong>:([\s\S]{0,300}?)(?:<\w|$)/i,
            /<li>Dosage:?\s*([\s\S]{0,500}?)<\/li>/i
        ];
        const dosage = extractSection(html, dosagePatterns);

        return {
            name: name || 'Unknown Product',
            price,
            image,
            description,
            ingredients,
            indications,
            dosage,
            productUrl
        };
    } catch (error) {
        console.error(`    Error scraping ${productUrl}:`, error.message);
        return null;
    }
}

async function scrapeAllProducts() {
    try {
        console.log('Fetching jammi.in wellness products...');

        const listUrl = 'https://jammi.in/product-category/wellness/';
        const listHtml = await fetchHTML(listUrl);

        // Extract product links
        const productLinkRegex = /<a[^>]*href="(https:\/\/jammi\.in\/product\/[^"]+)"[^>]*>/gi;
        const productLinks = [];
        let match;

        while ((match = productLinkRegex.exec(listHtml)) !== null) {
            productLinks.push(match[1]);
            if (productLinks.length >= 50) break;
        }

        console.log(`Found ${productLinks.length} products. Starting scrape...`);

        const products = [];
        for (const link of productLinks) {
            const details = await scrapeProductDetails(link);
            if (details) {
                products.push(details);
            }
        }

        // Save to JSON file
        await fs.writeFile(
            'scripts/jammi-products.json',
            JSON.stringify(products, null, 2)
        );

        console.log(`✓ Scraped ${products.length} products. Saved to scripts/jammi-products.json`);

        return products;
    } catch (error) {
        console.error('Scraping failed:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    scrapeAllProducts();
}

module.exports = { scrapeAllProducts, scrapeProductDetails };