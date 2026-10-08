/**
 * BLOG YAZILARI
 * ---------------------------------------------------
 * Admin panel / CMS YOKTUR. Blog yazısı eklemek, düzenlemek
 * veya silmek için bu dosyayı doğrudan düzenleyin.
 *
 * YENİ YAZI EKLEMEK İÇİN:
 *   Aşağıdaki diziye (array) yeni bir { ... } bloğu ekleyin.
 *
 * YAZI SİLMEK İÇİN:
 *   İlgili { ... } bloğunu silin.
 *
 * SIRALAMA:
 *   Dizideki sıra, sitede görünme sırasıdır (en üstteki ilk kart olur).
 *
 * ALANLAR:
 *   id       -> Benzersiz kısa kod (Türkçe karakter, boşluk kullanmayın).
 *               Detay sayfası otomatik olarak blog-detay.html?id=BU_ID adresinde açılır.
 *   category -> Kart üstünde görünen küçük etiket (ör. "Rinoplasti")
 *   title    -> Başlık
 *   excerpt  -> Kısa özet (1 cümle önerilir, kart ve üst menüde görünür)
 *   date     -> Yayın tarihi (ör. "12 Ocak 2026")
 *   readTime -> Okuma süresi (ör. "5 dk okuma")
 *   author   -> Yazar adı
 *   link     -> "#" bırakılırsa detay sayfası otomatik oluşur (önerilen).
 *               Dışarıya (başka bir siteye) link vermek isterseniz tam URL yazabilirsiniz.
 *   image    -> Görsel dosya yolu (ör. "assets/images/blog/yazi1.jpg"),
 *               boş bırakılırsa (""), yerine renkli bir görsel alanı gösterilir
 *   content  -> Yazının tam içeriği. Her eleman bir paragraf ya da ara başlıktır:
 *               { type: "p", text: "..." }   -> normal paragraf
 *               { type: "h3", text: "..." }  -> ara başlık
 *               { type: "quote", text: "..." } -> vurgulu alıntı kutusu
 */

var blogPostsRo = [
  {
    "id": "rinoplasti-iyilesme-sureci",
    "category": "Rinoplastie",
    "title": "Ce trebuie să știți despre procesul de recuperare",
    "excerpt": "Prima săptămână, gestionarea umflăturii și pregătirea pentru revenirea la viața de zi cu zi.",
    "date": "14 ianuarie 2026",
    "readTime": "6 min de citit",
    "author": "Conf. dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=rinoplasti-iyilesme-surecida",
    "image": "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "contentHtml": "<p>Recuperarea după rinoplastie este procesul despre care cei mai mulți pacienți vor să știe cel mai mult, dar despre care știu cel mai puțin. Drumul pe care îl parcurge corpul în săptămânile următoare modelează rezultatul final la fel de mult ca operația în sine. În acest articol răspund, cu un calendar realist, la întrebările care revin cel mai des la consultațiile mele.</p><h3>Primele 48 de ore: repaus și capul ridicat</h3><p>În prima zi după operație, umflătura crește rapid și atinge de obicei vârful în zilele 2–3. În această perioadă, țineți capul deasupra nivelului inimii, dormiți pe spate și aplicați gheață — acestea reduc vizibil umflătura. Durerea este mai ușoară decât se așteaptă majoritatea pacienților; senzația de presiune este mai apăsătoare decât durerea însăși.</p><h3>Prima săptămână: atela și vânătaia vizibilă</h3><p>Atela nazală se îndepărtează de obicei în ziua 6–7. La acest nivel, o vânătaie ușoară până la moderată este normală și variază de la persoană la persoană; la pacienții care nu fumează și nu iau anticoagulante, vindecarea decurge vizibil mai rapid. După scoaterea atelei, nasul încă arată umflat — nu este forma finală, ci perioada de tranziție.</p><h3>1–3 luni: recuperarea socială</h3><p>Vânătăile vizibile și umflătura evidentă dispar de obicei în 2–3 săptămâni; majoritatea pacienților se pot întoarce fără probleme în mediul social. Totuși, țesutul fin de la vârful nasului poate continua să se umfle subtil luni de zile, mai ales dimineața sau după alimente sărate.</p><h3>6–12 luni: rezultatul final</h3><p>În funcție de grosimea pielii, rezultatul real al operației poate dura de la șase luni până la un an. La pacienții cu piele subțire procesul este mai scurt, la cei cu piele groasă mai lung. Această așteptare cere răbdare, dar atunci când graficul este comunicat deschis încă din faza de planificare, anxietatea scade considerabil.</p><blockquote>La rinoplastie, răbdarea face parte din rezultat la fel ca tehnica chirurgicală — țesutul își completează lent propria poveste.</blockquote><h3>Sfaturi practice pentru a grăbi revenirea</h3><p>Limitarea sării, consumul de multă apă, îngrijirea nazală interioară recomandată de medic și protecția solară sunt pași simpli, dar eficienți, care susțin vindecarea. Pentru sport și efort fizic greu se recomandă de obicei o pauză de 4–6 săptămâni; perioada se stabilește individual.</p><p>Fiecare nas este diferit, iar fiecare proces de vindecare are ritmul său. La consultație întocmim un grafic adaptat structurii dumneavoastră de țesuturi și vă însoțim pe tot parcursul cu controale regulate.</p>"
  },
  {
    "id": "ilk-konsultasyon-sorulari",
    "category": "Consultație",
    "title": "Ce întrebări să puneți la prima întâlnire",
    "excerpt": "La ce să fiți atent când alegeți chirurgul potrivit.",
    "date": "3 februarie 2026",
    "readTime": "5 min de citit",
    "author": "Conf. dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=ilk-konsultasyon-sorulari",
    "image": "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "content": [
      {
        "type": "p",
        "text": "Prima întâlnire înainte de a decide o intervenție estetică sau reconstructivă este cel mai critic pas al întregului proces. O consultație cu întrebările potrivite vă clarifică așteptările și vă asigură că ați ales chirurgul corect."
      },
      {
        "type": "h3",
        "text": "Experiența și specializarea chirurgului"
      },
      {
        "type": "p",
        "text": "Nu ezitați să întrebați cât de des efectuează operația care vă interesează, ce tehnici stăpânește și care este fundalul său academic. Certificarea board, conexiunile universitare și publicațiile sunt indicatori concreți ai actualității chirurgului în domeniu."
      },
      {
        "type": "h3",
        "text": "Despre așteptări și riscuri"
      },
      {
        "type": "p",
        "text": "O consultație bună vorbește deschis nu doar despre cel mai bun rezultat posibil, ci și despre limitele realiste și riscurile potențiale. Întrebarea „Ce nu voi putea obține cu această operație?” este la fel de importantă ca „Ce voi putea obține?”. Dacă se folosește simulare digitală, rețineți: este un instrument de estimare, nu o garanție."
      },
      {
        "type": "h3",
        "text": "Anestezia și infrastructura de siguranță"
      },
      {
        "type": "p",
        "text": "Trebuie să fie clare locul în care se desfășoară intervenția, componența echipei de anesteziști și protocolul de urmat în cazul unei complicații. Un bloc operator complet echipat și o echipă experimentată de anesteziști stau la baza unui proces sigur."
      },
      {
        "type": "h3",
        "text": "Recuperarea și urmărirea"
      },
      {
        "type": "p",
        "text": "Detaliile practice — câte controale se fac după operație, când se scot firele, când reveniți la muncă și la viața socială, la cine apelați într-o urgență — vă reduc semnificativ anxietatea pe tot parcursul procesului."
      },
      {
        "type": "quote",
        "text": "O consultație care nu răspunde răbdător și deschis la întrebările dumneavoastră este cel mai clar semn că ați ales chirurgul greșit."
      },
      {
        "type": "h3",
        "text": "Costul și transparența"
      },
      {
        "type": "p",
        "text": "Componentele prețului (bloc operator, anestezie, controale, politica unei eventuale revizii) trebuie comunicate clar, în scris. Un preț transparent este semnul unei relații clinice de încredere."
      },
      {
        "type": "p",
        "text": "O întâlnire preliminară cu aceste întrebări nu doar vă informează, ci vă și face să vă simțiți în siguranță în procesul deciziei. La consultația noastră gratuită trecem împreună, pas cu pas, prin toate aceste puncte."
      }
    ],
    "contentHtml": "<p>Prima întâlnire înainte de a decide o intervenție estetică sau reconstructivă este cel mai critic pas al întregului proces. O consultație cu întrebările potrivite vă clarifică așteptările și vă asigură că ați ales chirurgul corect.</p>\n<h3>Experiența și specializarea chirurgului</h3>\n<p>Nu ezitați să întrebați cât de des efectuează operația care vă interesează, ce tehnici stăpânește și care este fundalul său academic. Certificarea board, conexiunile universitare și publicațiile sunt indicatori concreți ai actualității chirurgului în domeniu.</p>\n<h3>Despre așteptări și riscuri</h3>\n<p>O consultație bună vorbește deschis nu doar despre cel mai bun rezultat posibil, ci și despre limitele realiste și riscurile potențiale. Întrebarea „Ce nu voi putea obține cu această operație?” este la fel de importantă ca „Ce voi putea obține?”. Dacă se folosește simulare digitală, rețineți: este un instrument de estimare, nu o garanție.</p>\n<h3>Anestezia și infrastructura de siguranță</h3>\n<p>Trebuie să fie clare locul în care se desfășoară intervenția, componența echipei de anesteziști și protocolul de urmat în cazul unei complicații. Un bloc operator complet echipat și o echipă experimentată de anesteziști stau la baza unui proces sigur.</p>\n<h3>Recuperarea și urmărirea</h3>\n<p>Detaliile practice — câte controale se fac după operație, când se scot firele, când reveniți la muncă și la viața socială, la cine apelați într-o urgență — vă reduc semnificativ anxietatea pe tot parcursul procesului.</p>\n<blockquote>O consultație care nu răspunde răbdător și deschis la întrebările dumneavoastră este cel mai clar semn că ați ales chirurgul greșit.</blockquote>\n<h3>Costul și transparența</h3>\n<p>Componentele prețului (bloc operator, anestezie, controale, politica unei eventuale revizii) trebuie comunicate clar, în scris. Un preț transparent este semnul unei relații clinice de încredere.</p>\n<p>O întâlnire preliminară cu aceste întrebări nu doar vă informează, ci vă și face să vă simțiți în siguranță în procesul deciziei. La consultația noastră gratuită trecem împreună, pas cu pas, prin toate aceste puncte.</p>"
  },
  {
    "id": "meme-rekonstruksiyonu-teknik",
    "category": "Reconstrucție",
    "title": "Alegerea tehnicii în reconstrucția mamară",
    "excerpt": "Ce metodă este mai potrivită pentru fiecare pacientă.",
    "date": "21 februarie 2026",
    "readTime": "7 min de citit",
    "author": "Conf. dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=meme-rekonstruksiyonu-teknik",
    "image": "https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "content": [
      {
        "type": "p",
        "text": "Reconstrucția mamară este un domeniu chirurgical extrem de personalizat, care ajută pacienta, după tratamentul cancerului, să își reconstruiască atât integritatea fizică, cât și încrederea în sine. Alegerea tehnicii corecte depinde de anatomia pacientei, de etapele anterioare de tratament și de prioritățile ei personale."
      },
      {
        "type": "h3",
        "text": "Reconstrucția pe bază de implant"
      },
      {
        "type": "p",
        "text": "Metoda care începe cu un expandor de țesuturi și continuă cu un implant de silicon nu necesită o zonă donatoare suplimentară, astfel încât scurtează durata operației și perioada de recuperare. Este o opțiune potrivită mai ales pentru paciente cu un strat de țesut subțire până la mediu și care doresc mai puține intervenții chirurgicale într-o singură ședință."
      },
      {
        "type": "h3",
        "text": "Reconstrucția autologă (cu propriile țesuturi)"
      },
      {
        "type": "p",
        "text": "Această metodă, care folosește țesut din abdomen, spate sau coapse prin tehnici microchirurgicale precum lamboul DIEP, oferă un rezultat mai durabil și, în timp, îmbătrânește natural odată cu corpul. Necesită o operație mai lungă și tehnic mai complexă, dar dă de obicei rezultate mai bune în țesuturile expuse radioterapiei."
      },
      {
        "type": "h3",
        "text": "Cum influențează istoricul de radioterapie decizia?"
      },
      {
        "type": "p",
        "text": "În țesuturile care au trecut prin radioterapie, irigația sanguină și elasticitatea scad, astfel că riscul de complicații crește la metodele cu implant. La aceste paciente se preferă de obicei tehnicile autologe sau abordările hibride (țesut propriu + implant)."
      },
      {
        "type": "h3",
        "text": "Sincronizare: simultan sau cu întârziere?"
      },
      {
        "type": "p",
        "text": "Reconstrucția se poate realiza odată cu mastectomia (simultan) sau după finalizarea tratamentelor oncologice (cu întârziere). Decizia se planifică împreună cu echipa oncologică, ținând cont de stadiul tumorii, nevoia de radioterapie și preferințele pacientei."
      },
      {
        "type": "quote",
        "text": "Tehnica corectă nu este cea mai „avansată”, ci cea care se potrivește cel mai bine anatomiei și vieții pacientei."
      },
      {
        "type": "h3",
        "text": "Reconstrucția mamelonului și a areolei"
      },
      {
        "type": "p",
        "text": "După ce forma s-a conturat, la dorință se poate completa aspectul complexului mamelon–areolă prin lambouri locale sau tehnică de tatuaj 3D. Este, de obicei, ultima etapă a procesului și cea mai puțin invazivă."
      },
      {
        "type": "p",
        "text": "Istoricul oncologic, structura țesuturilor și așteptările fiecărei paciente sunt diferite; de aceea alegerea tehnicii se clarifică printr-o evaluare cuprinzătoare, în coordonare cu echipa oncologică, nu printr-o singură consultație."
      }
    ],
    "contentHtml": "<p>Reconstrucția mamară este un domeniu chirurgical extrem de personalizat, care ajută pacienta, după tratamentul cancerului, să își reconstruiască atât integritatea fizică, cât și încrederea în sine. Alegerea tehnicii corecte depinde de anatomia pacientei, de etapele anterioare de tratament și de prioritățile ei personale.</p>\n<h3>Reconstrucția pe bază de implant</h3>\n<p>Metoda care începe cu un expandor de țesuturi și continuă cu un implant de silicon nu necesită o zonă donatoare suplimentară, astfel încât scurtează durata operației și perioada de recuperare. Este o opțiune potrivită mai ales pentru paciente cu un strat de țesut subțire până la mediu și care doresc mai puține intervenții chirurgicale într-o singură ședință.</p>\n<h3>Reconstrucția autologă (cu propriile țesuturi)</h3>\n<p>Această metodă, care folosește țesut din abdomen, spate sau coapse prin tehnici microchirurgicale precum lamboul DIEP, oferă un rezultat mai durabil și, în timp, îmbătrânește natural odată cu corpul. Necesită o operație mai lungă și tehnic mai complexă, dar dă de obicei rezultate mai bune în țesuturile expuse radioterapiei.</p>\n<h3>Cum influențează istoricul de radioterapie decizia?</h3>\n<p>În țesuturile care au trecut prin radioterapie, irigația sanguină și elasticitatea scad, astfel că riscul de complicații crește la metodele cu implant. La aceste paciente se preferă de obicei tehnicile autologe sau abordările hibride (țesut propriu + implant).</p>\n<h3>Sincronizare: simultan sau cu întârziere?</h3>\n<p>Reconstrucția se poate realiza odată cu mastectomia (simultan) sau după finalizarea tratamentelor oncologice (cu întârziere). Decizia se planifică împreună cu echipa oncologică, ținând cont de stadiul tumorii, nevoia de radioterapie și preferințele pacientei.</p>\n<blockquote>Tehnica corectă nu este cea mai „avansată”, ci cea care se potrivește cel mai bine anatomiei și vieții pacientei.</blockquote>\n<h3>Reconstrucția mamelonului și a areolei</h3>\n<p>După ce forma s-a conturat, la dorință se poate completa aspectul complexului mamelon–areolă prin lambouri locale sau tehnică de tatuaj 3D. Este, de obicei, ultima etapă a procesului și cea mai puțin invazivă.</p>\n<p>Istoricul oncologic, structura țesuturilor și așteptările fiecărei paciente sunt diferite; de aceea alegerea tehnicii se clarifică printr-o evaluare cuprinzătoare, în coordonare cu echipa oncologică, nu printr-o singură consultație.</p>"
  }
];
