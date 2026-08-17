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

const blogPosts = [
  {
    id: "rinoplasti-iyilesme-sureci",
    category: "Rinoplasti",
    title: "İyileşme sürecinde bilmeniz gerekenler",
    excerpt: "İlk hafta, şişlik yönetimi ve dönüşe hazırlık.",
    date: "14 Ocak 2026",
    readTime: "6 dk okuma",
    author: "Doç. Dr. Majid İsmayilzada",
    link: "#",
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1200",
    content: [
      { type: "p", text: "Rinoplasti sonrası iyileşme, çoğu hastanın en çok merak ettiği ama en az bilgi sahibi olduğu süreçtir. Operasyonun kendisi kadar, sonraki haftalarda vücudunuzun izlediği yol da nihai sonucu şekillendirir. Bu yazıda, konsültasyonlarımda en sık gelen soruları gerçekçi bir zaman çizelgesiyle yanıtlıyorum." },
      { type: "h3", text: "İlk 48 saat: dinlenme ve baş yüksekliği" },
      { type: "p", text: "Operasyonun ardından ilk gün şişlik hızla artar ve genellikle 2-3. günde zirveye ulaşır. Bu dönemde başınızı kalpten yüksekte tutmak, sırt üstü yatmak ve buz uygulaması şişliği belirgin şekilde azaltır. Ağrı, çoğu hastanın tahmin ettiğinden daha hafiftir; basınç hissi ağrıdan daha baskındır." },
      { type: "h3", text: "İlk hafta: atel ve görünür morluk" },
      { type: "p", text: "Burun ateli genellikle 6-7. günde alınır. Bu aşamada hafif-orta düzeyde morluk normaldir ve kişiden kişiye değişir; sigara kullanmayan, kan sulandırıcı almayan hastalarda iyileşme belirgin şekilde daha hızlı seyreder. Atel alındığında burun hâlâ şişkin görünür — bu, nihai şekil değil, geçiş sürecidir." },
      { type: "h3", text: "1-3 ay: sosyal iyileşme" },
      { type: "p", text: "Görünür morluk ve belirgin şişlik genellikle 2-3 hafta içinde geriler; hastaların büyük kısmı bu noktada sosyal ortama rahatlıkla dönebilir. Ancak burun ucundaki ince doku şişliği aylarca sinsi bir şekilde devam edebilir; özellikle sabahları veya tuzlu beslenme sonrasında fark edilir hale gelir." },
      { type: "h3", text: "6-12 ay: nihai sonuç" },
      { type: "p", text: "Burun derisinin kalınlığına bağlı olarak, ameliyatın gerçek sonucunu görmek 6 ay ile 1 yıl arasında sürebilir. İnce ciltli hastalarda bu süreç daha kısa, kalın ciltli hastalarda daha uzun olur. Bu bekleyiş sabır gerektirir, ancak planlama aşamasında bu zaman çizelgesi hastayla açıkça paylaşıldığında kaygı büyük ölçüde azalır." },
      { type: "quote", text: "Rinoplastide sabır, cerrahi teknik kadar sonucun bir parçasıdır — doku yavaş yavaş kendi hikâyesini tamamlar." },
      { type: "h3", text: "Dönüşü hızlandırmak için pratik öneriler" },
      { type: "p", text: "Tuz alımını sınırlamak, bol su tüketmek, doktorunuzun önerdiği burun içi bakımı düzenli yapmak ve güneşten korunmak iyileşmeyi destekleyen basit ama etkili adımlardır. Egzersiz ve ağır fiziksel aktivite için genellikle 4-6 haftalık bir ara önerilir; bu süre kişiye göre netleştirilir." },
      { type: "p", text: "Her burun farklıdır ve her iyileşme süreci kendine özgü bir hızda ilerler. Konsültasyonda sizin doku yapınıza özel bir zaman çizelgesi oluşturuyor ve süreç boyunca düzenli kontrollerle yanınızda oluyoruz." }
    ]
  },
  {
    id: "ilk-konsultasyon-sorulari",
    category: "Konsültasyon",
    title: "İlk görüşmede hangi soruları sormalısınız?",
    excerpt: "Doğru cerrahı seçerken dikkat edilmesi gerekenler.",
    date: "3 Şubat 2026",
    readTime: "5 dk okuma",
    author: "Doç. Dr. Majid İsmayilzada",
    link: "#",
    image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200",
    content: [
      { type: "p", text: "Estetik ya da rekonstrüktif bir cerrahiye karar vermeden önceki ilk görüşme, tüm sürecin en kritik adımıdır. Doğru sorularla girdiğiniz bir konsültasyon, hem beklentilerinizi netleştirir hem de doğru cerrahı seçtiğinizden emin olmanızı sağlar." },
      { type: "h3", text: "Cerrahın uzmanlığı ve deneyimi" },
      { type: "p", text: "Talep ettiğiniz operasyonu ne sıklıkla yaptığını, hangi tekniklere hâkim olduğunu ve akademik/bilimsel arka planını sormaktan çekinmeyin. Board sertifikası, üniversite bağlantıları ve yayınlar, cerrahın alanındaki güncelliğinin somut göstergeleridir." },
      { type: "h3", text: "Beklenti ve risk konuşması" },
      { type: "p", text: "İyi bir konsültasyon, yalnızca olası en iyi sonucu değil, gerçekçi sınırları ve olası riskleri de açıkça konuşur. \"Bu operasyonla neyi elde edemem?\" sorusu, \"Neyi elde edebilirim?\" kadar önemlidir. Dijital simülasyon kullanılıyorsa, bunun bir tahmin aracı olduğunu, garanti olmadığını unutmayın." },
      { type: "h3", text: "Anestezi ve güvenlik altyapısı" },
      { type: "p", text: "Operasyonun nerede yapılacağı, anestezi ekibinin kim olduğu ve olası bir komplikasyon durumunda izlenecek protokol netleşmelidir. Tam donanımlı bir ameliyathane ve deneyimli bir anestezi ekibi, güvenli bir sürecin temelini oluşturur." },
      { type: "h3", text: "İyileşme süreci ve takip" },
      { type: "p", text: "Ameliyat sonrası kaç kontrol yapılacağı, dikişlerin ne zaman alınacağı, işe/sosyal hayata dönüş süresi ve acil bir durumda kime ulaşabileceğiniz gibi pratik detaylar, süreç boyunca kaygınızı büyük ölçüde azaltır." },
      { type: "quote", text: "Sorularınıza sabırla ve açıkça yanıt vermeyen bir konsültasyon, yanlış cerrahı işaret eden en net sinyaldir." },
      { type: "h3", text: "Maliyet ve şeffaflık" },
      { type: "p", text: "Fiyatlandırmanın nelerden oluştuğu (ameliyathane, anestezi, kontroller, olası revizyon politikası) net bir şekilde yazılı olarak paylaşılmalıdır. Şeffaf bir fiyatlandırma, güvenilir bir klinik ilişkisinin göstergesidir." },
      { type: "p", text: "Bu sorularla girdiğiniz bir ön görüşme, sizi yalnızca bilgilendirmekle kalmaz; karar sürecinde kendinizi güvende hissetmenizi de sağlar. Bizimle yapacağınız ücretsiz ön görüşmede tüm bu başlıkları birlikte, adım adım ele alıyoruz." }
    ]
  },
  {
    id: "meme-rekonstruksiyonu-teknik",
    category: "Rekonstrüksiyon",
    title: "Meme rekonstrüksiyonunda teknik seçimi",
    excerpt: "Hangi yöntem kimler için daha uygun.",
    date: "21 Şubat 2026",
    readTime: "7 dk okuma",
    author: "Doç. Dr. Majid İsmayilzada",
    link: "#",
    image: "https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=1200",
    content: [
      { type: "p", text: "Meme rekonstrüksiyonu, kanser tedavisi sonrası hastanın hem bedensel bütünlüğünü hem de özgüvenini yeniden inşa etmesine yardımcı olan, son derece kişiye özel bir cerrahi alandır. Doğru tekniğin seçimi; hastanın anatomisine, önceki tedavilerine ve kişisel önceliklerine bağlı olarak şekillenir." },
      { type: "h3", text: "İmplant bazlı rekonstrüksiyon" },
      { type: "p", text: "Doku genişletici ile başlayıp silikon implanta geçilen bu yöntem, ek bir donör bölge gerektirmediği için ameliyat süresini ve iyileşme sürecini kısaltır. Özellikle ince-orta kalınlıkta doku örtüsü olan ve tek seferde daha az cerrahi işlem isteyen hastalar için uygun bir seçenektir." },
      { type: "h3", text: "Otolog (kendi dokusu ile) rekonstrüksiyon" },
      { type: "p", text: "DIEP flep gibi mikrocerrahi teknikleriyle karın, sırt ya da uyluk bölgesinden alınan doku kullanılarak yapılan bu yöntem, zaman içinde vücutla birlikte doğal şekilde yaşlanan, daha kalıcı bir sonuç sunar. Daha uzun ve teknik olarak daha karmaşık bir operasyon gerektirir, ancak radyoterapi görmüş dokularda genellikle daha iyi sonuç verir." },
      { type: "h3", text: "Radyoterapi geçmişi kararı nasıl etkiler?" },
      { type: "p", text: "Radyoterapi almış dokuda kan dolaşımı ve elastikiyet azaldığından, implant bazlı yöntemlerde komplikasyon riski artabilir. Bu hastalarda çoğunlukla otolog teknikler ya da hibrit yaklaşımlar (kendi doku + implant kombinasyonu) tercih edilir." },
      { type: "h3", text: "Zamanlama: eş zamanlı mı, gecikmiş mi?" },
      { type: "p", text: "Rekonstrüksiyon, mastektomi ile aynı seansta (eş zamanlı) ya da onkolojik tedaviler tamamlandıktan sonra (gecikmiş) yapılabilir. Bu karar; tümörün evresi, radyoterapi ihtiyacı ve hastanın tercihleriyle birlikte onkoloji ekibiyle ortak şekilde planlanır." },
      { type: "quote", text: "Doğru teknik, 'en gelişmiş' olan değil, hastanın anatomisine ve hayatına en uygun olandır." },
      { type: "h3", text: "Meme ucu ve areola rekonstrüksiyonu" },
      { type: "p", text: "Meme formu oturduktan sonra, isteğe bağlı olarak yerel doku flepleri veya 3B dövme teknikleriyle meme ucu-areola kompleksinin görünümü tamamlanabilir. Bu, sürecin genellikle son ve en az invaziv adımıdır." },
      { type: "p", text: "Her hastanın onkolojik öyküsü, doku yapısı ve beklentileri farklıdır; bu nedenle teknik seçimi tek bir konsültasyonla değil, onkoloji ekibiyle koordineli, çok yönlü bir değerlendirmeyle netleştirilir." }
    ]
  }
];
