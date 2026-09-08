const fs=require("fs");
const file="data/services.js";
const c=fs.readFileSync(file,"utf8");
const s=JSON.parse(c.match(/const services = ([\s\S]*);\s*$/)[1]);
function clean(t){return t.replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();}
function blocksOf(html){
  const out=[]; const re=/<(h3|p|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi; let m;
  while((m=re.exec(html))!==null){ out.push({type:m[1]==="blockquote"?"quote":m[1], text:m[2]}); }
  return out;
}
const PARA_NEG=/uygun de\u011fildir|\u00f6nerilmez|tercih edilmez|uygun olmad\u0131\u011f\u0131/i;
function extract(html){
  const blocks=blocksOf(html);
  let idx=blocks.findIndex(b=>b.type==="h3"&&/uygun/i.test(b.text));
  if(idx===-1)idx=blocks.findIndex(b=>b.type==="h3"&&/(tercih edilir|hangi durumlarda|kimler|kimlere|kimin i\u00e7in|uygulan\u0131r|uygulanabilir)/i.test(b.text));
  if(idx===-1)return null;
  const after=[];
  for(let i=idx+1;i<blocks.length;i++){if(blocks[i].type==="h3")break; after.push(blocks[i]);}
  const note=[],suitable=[],notSuitable=[];
  after.forEach(b=>{
    if(b.type==="quote"){note.push(clean(b.text));return;}
    if(b.type!=="p")return;
    const segs=b.text.split(/<br\s*\/?>/i).map(clean).filter(Boolean);
    const paraIsNeg=PARA_NEG.test(clean(segs[0]||""));
    segs.forEach(seg=>{
      const isB=/^[\u2022*\u00b7\-]\s*/.test(seg)||/^\u2022/.test(seg);
      const body=seg.replace(/^[\u2022*\u00b7\-]\s*/,"").trim();
      if(!body)return;
      if(isB){ if(paraIsNeg) notSuitable.push(body); else suitable.push(body); }
      else note.push(seg);
    });
  });
  return {note:note.join(" ").trim(), suitable:[...new Set(suitable)], notSuitable:[...new Set(notSuitable)]};
}
let changed=0;
s.forEach(x=>{
  const r=extract(x.contentHtml||"");
  if(r && !x.candidacy){
    x.candidacy={note:r.note, suitable:r.suitable, notSuitable:r.notSuitable};
    changed++;
  }
});
const outHeader="// Uzmanl\u0131k hizmetleri verisi \u2014 bu dosya /admin/services \u00fczerinden g\u00fcncellenir.\nconst services = "+JSON.stringify(s,null,2)+";\n";
fs.writeFileSync(file,outHeader,"utf8");
console.log("Degisim sayisi:",changed);
console.log("Toplam uzmanlik:",s.length);
