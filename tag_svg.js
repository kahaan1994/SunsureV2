import fs from 'fs';

const svgContent = fs.readFileSync('./public/23375247_6059ed9659fc200dc3cd2e40.svg', 'utf-8');

const stateNames = [
  "Rajasthan", "Gujarat", "Maharashtra", "Madhya_Pradesh", "Uttar_Pradesh", 
  "Punjab", "Haryana", "Bihar", "Jharkhand", "West_Bengal", "Chhattisgarh", 
  "Odisha", "Telangana", "Andhra_Pradesh", "Karnataka", "Tamil_Nadu"
];

const pathRegex = /<path[^>]*d="([^"]+)"[^>]*>/g;
let match;
const paths = [];

while ((match = pathRegex.exec(svgContent)) !== null) {
  paths.push({
    fullTag: match[0],
    d: match[1],
    length: match[1].length,
    index: match.index
  });
}

paths.sort((a, b) => b.length - a.length);
const top16 = paths.slice(0, 16);

let modifiedSvg = svgContent;
for (let i = 0; i < 16; i++) {
  const originalTag = top16[i].fullTag;
  const newTag = originalTag.replace('<path ', `<path id="${stateNames[i]}" `);
  modifiedSvg = modifiedSvg.replace(originalTag, newTag);
}

fs.writeFileSync('./public/india_states_tagged.svg', modifiedSvg);
console.log('Successfully tagged 16 largest paths with state IDs!');
