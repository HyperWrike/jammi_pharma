const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Groq = require('groq-sdk');
require('dotenv').config({ path: '.env.local' });

const CONVEX_URL = "https://cheerful-rhinoceros-28.convex.cloud";

async function convexMutation(fnPath, args) {
  const response = await fetch(`${CONVEX_URL}/api/mutation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: fnPath, args: args || {}, format: "json" }),
  });
  const result = await response.json();
  if (result.status === "error") throw new Error(result.errorMessage);
  return result.value;
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const DIR = '../update/sharepoint/Product details for website';

async function processPdf(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    const text = data.text;
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a data extraction bot. Extract the product details from the unstructured text and return ONLY a valid JSON object matching this schema. Schema: { \"name\": \"string\", \"category\": \"string\", \"short_description\": \"string\", \"ingredients\": \"string\", \"benefits\": [\"string\"], \"usage_instructions\": \"string\", \"price\": \"number\" }. Do not wrap with markdown backticks."
        },
        {
          role: "user",
          content: text.substring(0, 1200) 
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0,
      response_format: { type: "json_object" }
    });

    try {
       const jsonString = completion.choices[0]?.message?.content || "{}";
       const parsed = JSON.parse(jsonString);
       return parsed;
    } catch(err) {
       console.error("JSON parse failed for", filePath, err);
       return null;
    }
}

async function main() {
    const files = fs.readdirSync(DIR).filter(f => f.endsWith('.pdf'));
    console.log(`Found ${files.length} PDFs to process.`);
    for(const file of files) {
       const fullPath = path.join(DIR, file);
       console.log("Processing", file);
       let productData = null;
       try {
           productData = await processPdf(fullPath);
       } catch (err) {
           if (err.status === 429) {
               console.log("Rate limited. Waiting 15s...");
               await new Promise(r => setTimeout(r, 15000));
               productData = await processPdf(fullPath); // try once more
           } else {
               console.error("Error processing", file, err);
           }
       }
       
       if(productData && productData.name) {
          try {
             productData.slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
             productData.status = "published";
             productData.stock = 100;
             productData.images = ["/images/placeholder.png"]; 
             productData.price = Number(productData.price) || 0;
             if (!Array.isArray(productData.benefits)) productData.benefits = [];
             
             await convexMutation("functions/products_mutations:createProduct", productData);
             console.log(`✅ Success inserting: ${productData.name}`);
          } catch(err) {
             console.error(`❌ DB Insert failed for ${file}:`, err.message);
          }
       }
       await new Promise(r => setTimeout(r, 2000));
    }
    console.log("Finished ingestion sweep.");
}

main();
