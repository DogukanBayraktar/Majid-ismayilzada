const fs=require("fs");
const file="data/services.js";
const c=fs.readFileSync(file,"utf8");
const s=JSON.parse(c.match(/const services = ([\s\S]*);\s*$/)[1]);

const MAP={
"meme-diklestirme-ve-buyutme":[
 "Meme kanseri veya biyopsi ile do\u011frulanm\u0131\u015f \u015f\u00fcpheli meme lezyonu varl\u0131\u011f\u0131",
 "Hamilelik ya da emzirme d\u00f6neminde olmak (ameliyat bu d\u00f6nem sonras\u0131na ertelenir)",
 "Kontrols\u00fcz kronik hastal\u0131klar (diyabet, hipertansiyon)",
 "Aktif sigara kullan\u0131m\u0131 (yara iyile\u015fmesi riskini belirgin art\u0131r\u0131r)",
 "Meme dokusu ve cilt deste\u011fi implant\u0131 ta\u015f\u0131yamayacak kadar yetersiz olan \u00e7ok zay\u0131f b\u00fcnyeler",
 "Ger\u00e7ek\u00e7i olmayan beklentiler (fiziksel olarak ula\u015f\u0131lmayacak boyut/form talepleri)"
],
"popo-estetigi-bbl":[
 "Enjeksiyon i\u00e7in yeterli don\u00f6r ya\u011f dokusu bulunmayan \u00e7ok zay\u0131f bireyler (BBL m\u00fcmk\u00fcn olmayabilir)",
 "Aktif sigara kullan\u0131m\u0131; sigara ya\u011f h\u00fccrelerinin ya\u015fayabilirli\u011fini do\u011frudan olumsuz etkiler",
 "Cilt elastikiyetinin belirgin d\u00fc\u015f\u00fck oldu\u011fu durumlar",
 "Kontrols\u00fcz kronik hastal\u0131klar (diyabet, hipertansiyon)",
 "Hamilelik d\u00f6nemi (do\u011fum sonras\u0131na ertelenir)",
 "Ger\u00e7ek\u00e7i olmayan beklentiler"
],
"liposuction-yag-aldirma":null,
"annelik-estetigi-mommy-makeover":[
 "Halen emziren veya do\u011fum sonras\u0131 6 aydan k\u0131sa s\u00fcre ge\u00e7mi\u015f anneler",
 "Yeni hamilelik plan\u0131 olan kad\u0131nlar",
 "Kilo dengesi oturmam\u0131\u015f, h\u00e2l\u00e2 belirgin kilo verme s\u00fcreccinde olan ki\u015filer",
 "Kontrols\u00fcz kronik hastal\u0131klar (diyabet, hipertansiyon)",
 "Ger\u00e7ek\u00e7i olmayan beklentiler"
],
"burun-estetigi":[
 "K\u0131zlarda 16, erkeklerde 17 ya\u015f alt\u0131 olup burun ve y\u00fcz geli\u015fimi tamamlanmam\u0131\u015f ki\u015filer",
 "Aktif ve kontrols\u00fcz hipertansiyon, diyabet veya kanama bozukluklar\u0131",
 "Kontrol edilememi\u015f kronik sin\u00fczit ya da aktif enfeksiyon",
 "Hamilelik ve emzirme d\u00f6nemi",
 "Aktif sigara kullan\u0131m\u0131 (iyile\u015fme ve doku beslenmesi i\u00e7in riskli)",
 "Ger\u00e7ek\u00e7i olmayan beklentiler"
],
"karin-germe":[
 "Hamilelik plan\u0131 olan ki\u015filer (ameliyat\u0131n do\u011fum sonras\u0131na ertelenmesi \u00f6nerilir)",
 "V\u00dC\u0130 30 \u00fczerinde obezite s\u0131n\u0131r\u0131nda bireyler; \u00f6nce kilo verme \u00f6nerilir",
 "Kontrols\u00fcz diyabet veya hipertansiyon (yara iyile\u015fmesi riski)",
 "Aktif sigara kullan\u0131m\u0131",
 "Deri sarkmas\u0131ndan \u00e7ok ya\u011f fazlal\u0131\u011f\u0131n\u0131n \u00f6n planda oldu\u011fu vakalar (liposuction daha uygun olabilir)"
],
"kol-germe-ameliyati":[
 "Kilo verme s\u00fcrecini tamamlamam\u0131\u015f, h\u00e2l\u00e2 belirgin kilo kayb\u0131 bekleyen ki\u015filer",
 "Sarkmadan \u00e7ok s\u0131k\u0131 ve elastik cilt alt\u0131nda ya\u011f fazlal\u0131\u011f\u0131 olanlar (liposuction yeterli olabilir)",
 "Kontrols\u00fcz diyabet veya dola\u015f\u0131m bozuklu\u011fu (yara iyile\u015fmesi riski)",
 "Aktif sigara kullan\u0131m\u0131",
 "Ger\u00e7ek\u00e7i olmayan beklentiler (iz kalaca\u011f\u0131n\u0131 kabul etmeyenler)"
],
"yuz-ve-boyun-germe-smas-facelift":[
 "Aktif ve belirgin sigara kullan\u0131m\u0131 (cilt kanlanmas\u0131 ve iyile\u015fme riski)",
 "Kontrols\u00fcz hipertansiyon, diyabet veya kanama bozukluklar\u0131",
 "Kan suland\u0131r\u0131c\u0131 kullananlar (cerrahi \u00f6ncesi mutlaka de\u011ferlendirme gerekir)",
 "Sarkma minimal, cilt elastikiyeti hen\u00fcz iyi olanlar (botoks/dolgu gibi giri\u015fimsel olmayan y\u00f6ntemler yeterli olabilir)",
 "Ger\u00e7ek\u00e7i olmayan beklentiler"
]
};

let changed=0;
s.forEach(x=>{
  if(!(x.candidacy&&x.candidacy.suitable)) return;
  const add=MAP[x.id];
  if(add) { x.candidacy.notSuitable=add; changed++; }
});
console.log(changed>0 ? ("Guncellendi: "+changed) : "Eslestirme bulunamadi");
console.log(s.filter(x=>x.candidacy&&x.candidacy.notSuitable).length+" hizmette notSuitable var");
fs.writeFileSync(file, c.replace(/const services = [\s\S]*;\s*$/, "const services = "+JSON.stringify(s,null,2)+";\n"),"utf8");
