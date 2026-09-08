const fs=require("fs");
const c=fs.readFileSync("data/services.js","utf8");
const s=JSON.parse(c.match(/const services = ([\s\S]*);\s*$/)[1]);
function clean(t){return t.replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();}
function blocksOf(html){
  const out=[]; const re=/<(h3|p|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi; let m;
  while((m=re.exec(html))!==null){ out.push({type:m[1]==="blockquote"?"quote":m[1], text:m[2]}); }
  return out;
}
const PARA_NEG=/uygun değildir|uygun değildir:|önerilmez|önerilmezdd|tercih edilmez|uygun olmadığı/i;
const ITEM_NEG=/uygun değildir|uygun olmayan|tercih edilmez|önerilmez|mümkün olmayabilir|olumsuz|yetersiz|önerilir/i;
function extract(html){
  const blocks=blocksOf(html);
  let idx=blocks.findIndex(b=>b.type==="h3"&&/uygun/i.test(b.text));
  if(idx===-1)idx=blocks.findIndex(b=>b.type==="h3"&&/(tercih edilir|hangi durumlarda|kimler|kimlere|kimin için|uygulanır|uygulanabilir)/i.test(b.text));
  if(idx===-1)return null;
  const after=[];
  for(let i=idx+1;i<blocks.length;i++){if(blocks[i].type==="h3")break; after.push(blocks[i]);}
  const note=[],suitable=[],notSuitable=[];
  after.forEach(b=>{
    if(b.type==="quote"){note.push(clean(b.text));return;}
    if(b.type!=="p")return;
    const segs=b.text.split(/<br\s*\/?>/i).map(clean).filter(Boolean);
    const paraIntro=clean(segs[0]||"");
    const paraIsNeg=PARA_NEG.test(paraIntro);
    let anyBullet=false;
    segs.forEach(seg=>{
      const isB=/^[•*·\-]\s*/.test(seg)||/^•/.test(seg);
      if(isB) anyBullet=true;
    });
    segs.forEach(seg=>{
      const isB=/^[•*·\-]\s*/.test(seg)||/^•/.test(seg);
      const body=seg.replace(/^[•*·\-]\s*/,"").trim();
      if(!body)return;
      if(isB){
        if(paraIsNeg) notSuitable.push(body);
        else if(ITEM_NEG.test(body)&&/uygun değildir|önerilmez|tercih edilmez/.test(body)) notSuitable.push(body);
        else suitable.push(body);
      } else {
        note.push(seg);
      }
    });
  });
  return {note:note.join(" ").trim(), suitable:[...new Set(suitable)], notSuitable:[...new Set(notSuitable)]};
}
s.forEach(x=>{
  const r=extract(x.contentHtml||"");
  if(r) console.log("==="+x.title+"  s("+r.suitable.length+") n("+r.notSuitable.length+")\n  s:"+JSON.stringify(r.suitable.slice(0,12))+"\n  n:"+JSON.stringify(r.notSuitable));
  else console.log("==="+x.title+" [YOK]");
});
