const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const DIR = '../update/sharepoint/Ayurveda Research Articles';
const OUT_FILE = './public/data/kb-ayurveda.json';

async function main() {
    if (!fs.existsSync('./public/data')) fs.mkdirSync('./public/data', { recursive: true });

    const files = fs.readdirSync(DIR).filter(f => f.toLowerCase().endsWith('.pdf'));
    console.log(`Found ${files.length} Ayurveda PDFs.`);
    
    const kb = [];

    for (const file of files) {
       const fullPath = path.join(DIR, file);
       console.log("Parsing", file);
       
       try {
           const dataBuffer = fs.readFileSync(fullPath);
           const data = await pdfParse(dataBuffer);
           let text = data.text.replace(/\s+/g, ' ').trim();
           
           // Chunking
           const maxLen = 1500;
           for(let i=0; i<text.length; i+=maxLen) {
               kb.push({
                   source: file,
                   content: text.substring(i, i+maxLen)
               });
           }
       } catch(err) {
           console.error("Failed to parse", file, err.message);
       }
    }

    fs.writeFileSync(OUT_FILE, JSON.stringify(kb, null, 2));
    console.log(`✅ KB DB created with ${kb.length} chunks.`);
}

main();
