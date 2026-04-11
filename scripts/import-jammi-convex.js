#!/usr/bin/env node

/**
 * Import scraped jammi.in products into Convex
 * Usage: npm run scrape-jammi && node scripts/import-jammi-convex.js
 */

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execPromise = promisify(exec);

async function importProducts() {
    try {
        // First, scrape the products
        console.log('Step 1: Scraping jammi.in products...');
        const scraperScript = require('./scrape-jammi-products');
        const products = await scraperScript.scrapeAllProducts();

        if (!products || products.length === 0) {
            console.error('❌ No products scraped');
            process.exit(1);
        }

        console.log(`\n✓ Scraped ${products.length} products\n`);

        // Transform products to Convex schema
        const convexProducts = products.map((p, idx) => ({
            name: p.name,
            slug: p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            description: p.description || `Traditional Ayurvedic formulation - ${p.name}`,
            short_description: p.description ? p.description.substring(0, 100) : p.name,
            price: p.price || 299,
            discount_price: null,
            stock: 100,
            sku: `JAMMI-${idx + 1}-${Date.now()}`,
            category: 'Wellness',
            images: p.image ? [p.image] : [],
            tags: ['ayurvedic', 'wellness', 'natural'],
            ingredients: p.ingredients || 'Premium natural ingredients',
            indications: p.indications || 'For overall wellness and health support',
            dosage: p.dosage || 'As recommended by physician',
            benefits: ['Natural', 'Ayurvedic', '100% Vegetarian'],
            is_featured: Math.random() > 0.7, // 30% featured
            status: 'Active',
            meta_title: `${p.name} | Jammi Pharma`,
            meta_description: p.description ? p.description.substring(0, 160) : '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }));

        console.log('Step 2: Generating Convex mutation script...');

        // Create a mutation script for Convex
        const mutations = convexProducts.map((p, i) => `
        // Product ${i + 1}: ${p.name}
        await ctx.db.insert('products', {
            name: ${JSON.stringify(p.name)},
            slug: ${JSON.stringify(p.slug)},
            description: ${JSON.stringify(p.description)},
            short_description: ${JSON.stringify(p.short_description)},
            price: ${p.price},
            discount_price: ${p.discount_price},
            stock: ${p.stock},
            sku: ${JSON.stringify(p.sku)},
            category: ${JSON.stringify(p.category)},
            images: ${JSON.stringify(p.images)},
            tags: ${JSON.stringify(p.tags)},
            ingredients: ${JSON.stringify(p.ingredients)},
            indications: ${JSON.stringify(p.indications)},
            dosage: ${JSON.stringify(p.dosage)},
            benefits: ${JSON.stringify(p.benefits)},
            is_featured: ${p.is_featured},
            status: ${JSON.stringify(p.status)},
            meta_title: ${JSON.stringify(p.meta_title)},
            meta_description: ${JSON.stringify(p.meta_description)},
            created_at: ${JSON.stringify(p.created_at)},
            updated_at: ${JSON.stringify(p.updated_at)}
        });`).join('\n');

        // Save products JSON for reference
        await fs.writeFile(
            'scripts/convex-import-data.json',
            JSON.stringify(convexProducts, null, 2)
        );

        console.log('✓ Saved product data to scripts/convex-import-data.json');

        // Save mutation template
        const mutationTemplate = `import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const importJammiProducts = mutation({
    handler: async (ctx) => {
        try {
            ${mutations}
            
            return { success: true, message: 'Successfully imported ${convexProducts.length} products' };
        } catch (error) {
            throw new Error('Import failed: ' + error.message);
        }
    }
});`;

        await fs.writeFile(
            'convex/functions/import_jammi_products.ts',
            mutationTemplate
        );

        console.log('✓ Created convex/functions/import_jammi_products.ts');
        console.log(`\n✅ Ready to import! Products prepared:\n`);
        console.log(convexProducts.slice(0, 3).map(p => `  • ${p.name} - ₹${p.price}`).join('\n'));
        console.log(`  ... and ${convexProducts.length - 3} more products\n`);
        console.log('Next steps:');
        console.log('1. Review scripts/convex-import-data.json');
        console.log('2. Call the importJammiProducts mutation from your admin panel or console');
        console.log('3. Or run: npm run convex-import');

    } catch (error) {
        console.error('❌ Import preparation failed:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    importProducts();
}

module.exports = { importProducts };