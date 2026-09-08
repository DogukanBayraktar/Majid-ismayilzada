const fs=require("fs");
const c=fs.readFileSync("data/services.js","utf8");
const s=JSON.parse(c.match(/const services = ([\s\S]*);\s*$/)[1]);
const x=s.find(o=>o.id==="popo-estetigi-bbl");
const html=x.contentHtml||"";
// H3 "uygun" bul ve sonraki 1500 char göster
const i=html.toLowerCase().search(/<h3[^>]*>[^<]*(uygun|kimler|kimlere)[^<]*<\/h3>/i);
console.log(html.slice(i-60, i+1600));
