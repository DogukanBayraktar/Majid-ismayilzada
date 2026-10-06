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

var blogPostsIt = [
  {
    "id": "rinoplasti-iyilesme-sureci",
    "category": "Rinoplastica",
    "title": "Quello che devi sapere sul percorso di recupero",
    "excerpt": "La prima settimana, il gonfiore e il ritorno alla vita quotidiana.",
    "date": "14 gennaio 2026",
    "readTime": "6 min di lettura",
    "author": "Prof. Associato Dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=rinoplasti-iyilesme-surecida",
    "image": "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "contentHtml": "<p>La convalescenza dopo la rinoplastica è il processo che i pazienti seguono con maggior curiosità ma sul quale hanno meno informazioni. Così come l'intervento, anche il percorso che il corpo segue nelle settimane successive determina il risultato finale. In questo articolo rispondo, con una cronologia realistica, alle domande che mi vengono poste più spesso in consulenza.</p><h3>Le prime 48 ore: riposo e testa sollevata</h3><p>Dopo l'intervento il gonfiore aumenta rapidamente nel primo giorno e raggiunge di solito il picco tra il 2° e il 3° giorno. In questo periodo mantenere la testa al di sopra del livello del cuore, dormire sulla schiena e applicare il ghiaccio riducono visibilmente il gonfiore. Il dolore è più lieve di quanto la maggior parte dei pazienti si aspetti: la sensazione di pressione è più forte del dolore stesso.</p><h3>La prima settimana: la stecca e i lividi visibili</h3><p>La stecca nasale viene rimossa di solito tra il 6° e il 7° giorno. In questa fase è normale avere lividi da lievi a moderati, che variano da persona a persona; la guarigione procede visibilmente più rapidamente nei pazienti che non fumano e non assumono anticoagulanti. Quando la stecca viene rimossa il naso appare ancora gonfiato: non è la forma finale, ma una fase di transizione.</p><h3>1-3 mesi: recupero sociale</h3><p>I lividi visibili e il gonfiore evidente regrediscono generalmente entro 2-3 settimane; la maggior parte dei pazienti può tornare tranquillamente alla vita sociale. Tuttavia il gonfiore del tessuto fine della punta del naso può persistere in modo sottile per mesi, diventando evidente soprattutto al mattino o dopo un pasto salato.</p><h3>6-12 mesi: il risultato finale</h3><p>A seconda dello spessore della cute del naso, vedere il risultato reale dell'intervento può richiedere da 6 mesi a un anno. Nei pazienti con pelle sottile il processo è più breve, in quelli con pelle più spessa più lungo. Questa attesa richiede pazienza, ma l'ansia diminuisce notevolmente quando questa cronologia viene condivisa chiaramente con il paziente nella fase di pianificazione.</p><blockquote>Nella rinoplastica la pazienza è parte del risultato quanto la tecnica chirurgica: il tessuto completa lentamente la propria storia.</blockquote><h3>Consigli pratici per accelerare il recupero</h3><p>Limitare il consumo di sali, bere molta acqua, effettuare regolarmente l'igiene nasale consigliata dal tuo medico e proteggere il naso dal sole sono passi semplici ma efficaci che favoriscono la guarigione. Prima di riprendere l'esercizio fisico e le attività intense si consiglia di solito una pausa di 4-6 settimane, da definire individualmente.</p><p>Ogni naso è diverso e ogni recupero procede con il proprio ritmo. In consulenza elaboriamo una cronologia adatta al tuo tipo di cute e ti accompagniamo con controlli regolari durante tutto il percorso.</p>"
  },
  {
    "id": "ilk-konsultasyon-sorulari",
    "category": "Consulenza",
    "title": "Che domande fare alla prima consulenza?",
    "excerpt": "Cosa considerare quando si sceglie il chirurgo giusto.",
    "date": "3 febbraio 2026",
    "readTime": "5 min di lettura",
    "author": "Prof. Associato Dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=ilk-konsultasyon-sorulari",
    "image": "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "content": [
      {
        "type": "p",
        "text": "La prima consulenza, prima di decidere per un intervento estetico o ricostruttivo, è il passo più critico di tutto il percorso. Affrontare la consulenza con le domande giuste chiarisce le tue aspettative e ti dà la certezza di aver scelto il chirurgo giusto."
      },
      {
        "type": "h3",
        "text": "La specializzazione e l'esperienza del chirurgo"
      },
      {
        "type": "p",
        "text": "Non esitare a chiedere con quale frequenza esegue l'intervento che stai richiedendo, quali tecniche padroneggia e qual è il suo background accademico e scientifico. La certificazione di specializzazione, i legami con le università e le pubblicazioni sono indicatori concreti dell'aggiornamento del chirurgo nel suo campo."
      },
      {
        "type": "h3",
        "text": "Parlare di aspettative e di rischi"
      },
      {
        "type": "p",
        "text": "Una buona consulenza affronta non solo il miglior risultato possibile, ma anche i limiti realistici e i possibili rischi. La domanda «Cosa non posso ottenere con questo intervento?» è importante quanto «Cosa posso ottenere?». Se viene utilizzata una simulazione digitale, ricorda che è uno strumento di previsione, non una garanzia."
      },
      {
        "type": "h3",
        "text": "Anestesia e struttura di sicurezza"
      },
      {
        "type": "p",
        "text": "Deve essere chiaro dove si svolgerà l'intervento, chi compone il team di anestesia e quale protocollo seguirà in caso di possibile complicanza. Una sala operatoria completamente attrezzata e un team di anestesia esperto sono la base di un percorso sicuro."
      },
      {
        "type": "h3",
        "text": "Recupero e controlli"
      },
      {
        "type": "p",
        "text": "Dettagli pratici come il numero dei controlli post-operatori, il momento della rimozione dei punti, il tempo per tornare al lavoro e alla vita sociale e a chi rivolgersi in caso di urgenza riducono notevolmente l'ansia durante tutto il percorso."
      },
      {
        "type": "quote",
        "text": "Una consulenza che non risponde alle tue domande con pazienza e chiarezza è il segnale più evidente di aver scelto il chirurgo sbagliato."
      },
      {
        "type": "h3",
        "text": "Costo e trasparenza"
      },
      {
        "type": "p",
        "text": "Ciò che comprende il preventivo (sala operatoria, anestesia, controlli ed eventuale politica di ritocchi) deve essere condiviso chiaramente per iscritto. Un preventivo trasparente è il segno di una relazione clinica affidabile."
      },
      {
        "type": "p",
        "text": "Una prima consulenza affrontata con queste domande non solo ti informa, ma ti fa anche sentire sicuro durante il processo decisionale. Nella tua prima consulenza gratuita con noi affrontiamo tutti questi punti insieme, passo dopo passo."
      }
    ],
    "contentHtml": "<p>La prima consulenza, prima di decidere per un intervento estetico o ricostruttivo, è il passo più critico di tutto il percorso. Affrontare la consulenza con le domande giuste chiarisce le tue aspettative e ti dà la certezza di aver scelto il chirurgo giusto.</p>\n<h3>La specializzazione e l'esperienza del chirurgo</h3>\n<p>Non esitare a chiedere con quale frequenza esegue l'intervento che stai richiedendo, quali tecniche padroneggia e qual è il suo background accademico e scientifico. La certificazione di specializzazione, i legami con le università e le pubblicazioni sono indicatori concreti dell'aggiornamento del chirurgo nel suo campo.</p>\n<h3>Parlare di aspettative e di rischi</h3>\n<p>Una buona consulenza affronta non solo il miglior risultato possibile, ma anche i limiti realistici e i possibili rischi. La domanda «Cosa non posso ottenere con questo intervento?» è importante quanto «Cosa posso ottenere?». Se viene utilizzata una simulazione digitale, ricorda che è uno strumento di previsione, non una garanzia.</p>\n<h3>Anestesia e struttura di sicurezza</h3>\n<p>Deve essere chiaro dove si svolgerà l'intervento, chi compone il team di anestesia e quale protocollo seguirà in caso di possibile complicanza. Una sala operatoria completamente attrezzata e un team di anestesia esperto sono la base di un percorso sicuro.</p>\n<h3>Recupero e controlli</h3>\n<p>Dettagli pratici come il numero dei controlli post-operatori, il momento della rimozione dei punti, il tempo per tornare al lavoro e alla vita sociale e a chi rivolgersi in caso di urgenza riducono notevolmente l'ansia durante tutto il percorso.</p>\n<blockquote>Una consulenza che non risponde alle tue domande con pazienza e chiarezza è il segnale più evidente di aver scelto il chirurgo sbagliato.</blockquote>\n<h3>Costo e trasparenza</h3>\n<p>Ciò che comprende il preventivo (sala operatoria, anestesia, controlli ed eventuale politica di ritocchi) deve essere condiviso chiaramente per iscritto. Un preventivo trasparente è il segno di una relazione clinica affidabile.</p>\n<p>Una prima consulenza affrontata con queste domande non solo ti informa, ma ti fa anche sentire sicuro durante il processo decisionale. Nella tua prima consulenza gratuita con noi affrontiamo tutti questi punti insieme, passo dopo passo.</p>"
  },
  {
    "id": "meme-rekonstruksiyonu-teknik",
    "category": "Ricostruzione",
    "title": "La scelta della tecnica nella ricostruzione mammaria",
    "excerpt": "Quale metodo è più adatto a ciascun paziente.",
    "date": "21 febbraio 2026",
    "readTime": "7 min di lettura",
    "author": "Prof. Associato Dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=meme-rekonstruksiyonu-teknik",
    "image": "https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "content": [
      {
        "type": "p",
        "text": "La ricostruzione mammaria è un ambito chirurgico altamente personalizzato che aiuta il paziente a ricostruire sia la propria integridà fisica sia la fiducia in sé stesso dopo la terapia oncologica. La scelta della tecnica più adatta dipende dall'anatomia del paziente, dai trattamenti precedenti e dalle sue priorità personali."
      },
      {
        "type": "h3",
        "text": "Ricostruzione con impianto"
      },
      {
        "type": "p",
        "text": "Questo metodo inizia con un espansore di tessuto e prosegue con un impianto al silicone. Non richiedendo un sito donante aggiuntivo, riduce la durata dell'intervento e il tempo di recupero. È un'opzione particolarmente adatta per pazienti con rivestimento tessutale sottile o medio che desiderano un minor numero di interventi in un'unica fase."
      },
      {
        "type": "h3",
        "text": "Ricostruzione autologa (con tessuto proprio)"
      },
      {
        "type": "p",
        "text": "Questo metodo, realizzato con tecniche microchirurgiche come il lembo DIEP e utilizzando tessuto prelevato dall'addome, dalla schiena o dalle cosce, offre un risultato più duraturo che invecchia naturalmente con il corpo. Richiede un intervento più lungo e tecnicamente più complesso, ma generalmente dà risultati migliori nei tessuti sottoposti a radioterapia."
      },
      {
        "type": "h3",
        "text": "Come influisce l'anamnesi di radioterapia sulla decisione?"
      },
      {
        "type": "p",
        "text": "Poiché la circolazione sanguigna e l'elasticità si riducono nei tessuti irradiati, il rischio di complicanze può aumentare con i metodi a base di impianto. In questi pazienti si preferiscono di solito le tecniche autologhe o gli approcci ibridi (tessuto proprio + impianto)."
      },
      {
        "type": "h3",
        "text": "Tempi: immediata o differita?"
      },
      {
        "type": "p",
        "text": "La ricostruzione può essere eseguita nello stesso intervento della mastectomia (immediata) o al termine dei trattamenti oncologici (differita). La decisione viene pianificata congiuntamente con il team oncologico, considerando lo stadio tumorale, la necessità di radioterapia e le preferenze del paziente."
      },
      {
        "type": "quote",
        "text": "La tecnica giusta non è la più avanzata, ma quella che si adatta meglio all'anatomia e alla vita del paziente."
      },
      {
        "type": "h3",
        "text": "Ricostruzione del complesso capezzolo-areola"
      },
      {
        "type": "p",
        "text": "Una volta definita la forma del seno, l'aspetto del complesso capezzolo-areola può essere completato, se desiderato, con lembi di tessuto locale o con tecniche di tatuaggio 3D. È generalmente l'ultimo passo del percorso e il meno invasivo."
      },
      {
        "type": "p",
        "text": "La storia oncologica, la struttura tessutale e le aspettative di ogni paziente sono diverse; per questo la scelta della tecnica non viene definita in un'unica consulenza, ma attraverso una valutazione multidisciplinare coordinata con il team oncologico."
      }
    ],
    "contentHtml": "<p>La ricostruzione mammaria è un ambito chirurgico altamente personalizzato che aiuta il paziente a ricostruire sia la propria integridà fisica sia la fiducia in sé stesso dopo la terapia oncologica. La scelta della tecnica più adatta dipende dall'anatomia del paziente, dai trattamenti precedenti e dalle sue priorità personali.</p>\n<h3>Ricostruzione con impianto</h3>\n<p>Questo metodo inizia con un espansore di tessuto e prosegue con un impianto al silicone. Non richiedendo un sito donante aggiuntivo, riduce la durata dell'intervento e il tempo di recupero. È un'opzione particolarmente adatta per pazienti con rivestimento tessutale sottile o medio che desiderano un minor numero di interventi in un'unica fase.</p>\n<h3>Ricostruzione autologa (con tessuto proprio)</h3>\n<p>Questo metodo, realizzato con tecniche microchirurgiche come il lembo DIEP e utilizzando tessuto prelevato dall'addome, dalla schiena o dalle cosce, offre un risultato più duraturo che invecchia naturalmente con il corpo. Richiede un intervento più lungo e tecnicamente più complesso, ma generalmente dà risultati migliori nei tessuti sottoposti a radioterapia.</p>\n<h3>Come influisce l'anamnesi di radioterapia sulla decisione?</h3>\n<p>Poiché la circolazione sanguigna e l'elasticità si riducono nei tessuti irradiati, il rischio di complicanze può aumentare con i metodi a base di impianto. In questi pazienti si preferiscono di solito le tecniche autologhe o gli approcci ibridi (tessuto proprio + impianto).</p>\n<h3>Tempi: immediata o differita?</h3>\n<p>La ricostruzione può essere eseguita nello stesso intervento della mastectomia (immediata) o al termine dei trattamenti oncologici (differita). La decisione viene pianificata congiuntamente con il team oncologico, considerando lo stadio tumorale, la necessità di radioterapia e le preferenze del paziente.</p>\n<blockquote>La tecnica giusta non è la più avanzata, ma quella che si adatta meglio all'anatomia e alla vita del paziente.</blockquote>\n<h3>Ricostruzione del complesso capezzolo-areola</h3>\n<p>Una volta definita la forma del seno, l'aspetto del complesso capezzolo-areola può essere completato, se desiderato, con lembi di tessuto locale o con tecniche di tatuaggio 3D. È generalmente l'ultimo passo del percorso e il meno invasivo.</p>\n<p>La storia oncologica, la struttura tessutale e le aspettative di ogni paziente sono diverse; per questo la scelta della tecnica non viene definita in un'unica consulenza, ma attraverso una valutazione multidisciplinare coordinata con il team oncologico.</p>"
  }
];
