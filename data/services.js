const services = [
  {
    id: "meme-cene-rekonstruksiyonu",
    title: "Meme & Çene Rekonstrüksiyonu",
    excerpt: "Kanser veya travma sonrası kaybedilen doku ve uzuvların kişiye özel yeniden yapılandırılması.",
    category: "Rekonstrüktif Cerrahi",
    image: "https://images.pexels.com/photos/5206923/pexels-photo-5206923.jpeg?auto=compress&cs=tinysrgb&w=1200",
    duration: "3-5 saat",
    recovery: "4-6 hafta",
    content: [
      { type: "p", text: "Meme ve çene rekonstrüksiyonu, kanser cerrahisi veya travmatik yaralanmalardan sonra kaybedilen dokuyu geri kazandırmak için en ileri plastik cerrahi tekniklerini kullanır. Her hasta için kişiye özel bir plan geliştirmek, doğal estetik ve işlevsel sonuç elde etmenin temelini oluşturur." },
      { type: "h3", text: "Meme Rekonstrüksiyonu Yöntemleri" },
      { type: "p", text: "Otoloğ doku naklı (TRAM, DIEP, LAT) veya implant-tabanlı yaklaşımlar arasından seçim yapılır. Mikrocerrahik teknikler ile kan damarı bağlantıları sağlanarak ödünü kayıp doku canlı şekilde yerleştirilir." },
      { type: "quote", text: "Rekonstrüksiyonun amacı sadece görünüş değil, hastanın kendine olan güvenini ve yaşam kalitesini geri kazandırmaktır." },
      { type: "h3", text: "Çene Rekonstrüksiyonu" },
      { type: "p", text: "Çene kemik kaybı veya deformitesi durumunda, kostal graft veya fibula flap kullanılarak yeniden yapılandırma işlemi gerçekleştirilir. Estetiğin yanında çiğneme ve konuşma fonksiyonu da dikkate alınır." },
      { type: "p", text: "İyileşme süresi ilk 2-3 haftada çoğu aktiviteye dönüş mümkünken, tam iyileşme 6-8 hafta sürebilir." }
    ],
    steps: [
      { number: "01", title: "Preoperatif Değerlendirme", description: "Doku kalitesi, kan damarı sağlığı ve donör alan seçimi 3B görüntüleme yardımıyla planlanır." },
      { number: "02", title: "Donör Doku Alınması", description: "Uygun bölgeden (abdomen, arka sırt, iç uyluk) canlı doku alınır ve hazırlanır." },
      { number: "03", title: "Yatağın Hazırlanması", description: "Alıcı bölgedeki vasküler (damar) yatağı ve kemik yapısı özel olarak hazırlanır." },
      { number: "04", title: "Mikrovaskülär Anastomoz", description: "Alınan doku, kan dolaşımını sağlamak için alıcı bölgedeki damarlara bağlanır (15x büyütme altında)." },
      { number: "05", title: "Şekillendirme & Dikişler", description: "Doku estetik şekilde kalıplandırılır ve dikişlerle kapatılır." }
    ],
    results: [
      { before: "https://images.pexels.com/photos/5206923/pexels-photo-5206923.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5206923/pexels-photo-5206923.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5206923/pexels-photo-5206923.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5206923/pexels-photo-5206923.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5240617/pexels-photo-5240617.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5240617/pexels-photo-5240617.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ],
    videos: [
      { name: "Ayşe K.", image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "3 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Ameliyattan 3 ay sonra sonuçtan çok memnunum. Hayatıma yeniden başladığımı hissediyorum." },
      { name: "Fatih D.", image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "6 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Profesyonel yaklaşımı ve güven ortamı beni çok rahatlatmıştı. Sonuçlar beklentimin üstünde." },
      { name: "Zeynep S.", image: "https://images.pexels.com/photos/5240617/pexels-photo-5240617.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "1 sene sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Doktor Bey ve ekibi sanki ikinci bir aile olmuşlar. Her aşamada yanımda hissettim kendimi." }
    ]
  },
  {
    id: "rinoplasti",
    title: "Rinoplasti",
    excerpt: "Yüz hatlarınızla uyumlu, doğal ve nefes fonksiyonunu önceleyen burun estetiği.",
    category: "Estetik Cerrahi",
    image: "https://images.pexels.com/photos/17136717/pexels-photo-17136717.jpeg?auto=compress&cs=tinysrgb&w=1200",
    duration: "2-3 saat",
    recovery: "10-14 gün",
    content: [
      { type: "p", text: "Rinoplasti, burnun şeklini ve fonksiyonunu iyileştiren en yaygın estetik cerrahi işlemlerinden biridir. Kozmetik kaygıların yanı sıra, nazal engel nedeniyle nefes problemleri de düzeltilir." },
      { type: "h3", text: "Estetik Hedefler" },
      { type: "p", text: "Burun ucunun yükseltilmesi, kemik çıkıntıların azaltılması, asimetrinin düzeltilmesi veya burnun genel şeklinin yüz hatlarıyla uyumlu hale getirilmesi rinoplastinin temel amaçlarıdır." },
      { type: "quote", text: "Başarılı bir rinoplasti, hastanın yüzünde doğal görünüm sağlarken, kişilik ifadesini de korumalıdır." },
      { type: "h3", text: "Cerrahi Teknik" },
      { type: "p", text: "Açık veya kapalı teknik kullanılabilir. Açık rinoplasti daha fazla görüş sağlar; kapalı teknik ise daha hızlı iyileşme sunar. Her hastaya uygun yöntem önceden tartışılır." },
      { type: "p", text: "İlk 2 hafta şişlik ve morarmaların azalması beklenir. Tam sonuç 3-6 ay sonra görülür." }
    ],
    steps: [
      { number: "01", title: "Anestezi", description: "Genel anestezi uygulanır. Hasta uykuda iken cerrahi yapılır." },
      { number: "02", title: "İnsizyonlar", description: "Açık teknik kullanılıyorsa columella (burun ayırıcısı) ile küçük bir insizyon yapılır." },
      { number: "03", title: "Kemik & Kartilaj Şekillendirmesi", description: "Dorsal hump (çıkıntı) azaltılır, ucun şekli düzeltilir, yan çıkıntılar düzeltilir." },
      { number: "04", title: "Osteotomi (Opsiyonel)", description: "Genişlik sorunu varsa kemiğin düzenli kırılması yapılabilir." },
      { number: "05", title: "Dikişler & Splint", description: "Tüm katmanlar dikişlerle kapatılır ve koruyucu splint yerleştirilir." }
    ],
    results: [
      { before: "https://images.pexels.com/photos/17136717/pexels-photo-17136717.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/17136717/pexels-photo-17136717.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/17136717/pexels-photo-17136717.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/17136717/pexels-photo-17136717.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5240610/pexels-photo-5240610.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5240610/pexels-photo-5240610.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/7108330/pexels-photo-7108330.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/7108330/pexels-photo-7108330.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ],
    videos: [
      { name: "Emre T.", image: "https://images.pexels.com/photos/5240610/pexels-photo-5240610.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "2 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Yüzüme bu kadar yatışırken çok rahatsız olmuştum. Şimdi kendime güvenim çok arttı." },
      { name: "Merve K.", image: "https://images.pexels.com/photos/7108330/pexels-photo-7108330.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "4 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Burnumu hep değiştirmek istemiştim ama korkuyordum. Doktor beni rahatlatıp, doğal bir sonuç verdi." },
      { name: "Can Y.", image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "6 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Nefes problemlerim de çözüldü. Hem estetik hem de işlevsel olarak mükemmel." }
    ]
  },
  {
    id: "yuz-germe",
    title: "Yüz Germe (Ritidektomi)",
    excerpt: "Yaşla oluşan sarkma ve kırışıklıkları gideren, doğal görünüme odaklı ritidektomi.",
    category: "Estetik Cerrahi",
    image: "https://images.pexels.com/photos/594421/pexels-photo-594421.jpeg?auto=compress&cs=tinysrgb&w=1200",
    duration: "3-4 saat",
    recovery: "3-4 hafta",
    content: [
      { type: "p", text: "Yüz germe (facelift), yüzün alt yarısında ve boyunda yaşla ilişkili sarkmaları düzelten cerrahi işlemdir. Cilt elastikiyeti kaybolan hastaların görünüşünü gençleştirir." },
      { type: "h3", text: "Yaşlanma İşaretleri" },
      { type: "p", text: "Nasolabial kırışıklıklar, mandibular sarkmalar, marionette çizgileri ve çift çene yüz germe ile giderilir. Cilt kalitesi de iyileştirilir." },
      { type: "quote", text: "Modern facelift tekniği yüzün doğal mimiklerini korurken, zarif ve genç bir görünüm sağlar." },
      { type: "h3", text: "Uygulanma Tekniği" },
      { type: "p", text: "SMAS katmanı (yüz kası altı fasya) düzeltilir. Bu daha uzun kalıcı sonuçlar verir. Mini facelift veya full facelift hastanın ihtiyacına göre seçilir." },
      { type: "p", text: "İyileşme 3-4 hafta, tam sonuç 6-8 haftada görülür. Sonuçlar 7-10 yıl kadar kalıcıdır." }
    ],
    steps: [
      { number: "01", title: "Anestezi ve Markalar", description: "Genel anestezi altında insizyon hatları işaretlenir (saçların içinde başlayarak)." },
      { number: "02", title: "Insizyon", description: "Temporal bölgeden başlayarak, kulak önünde ve kulak arkasında kontrollü insizyon yapılır." },
      { number: "03", title: "Cilt Kaldırılması", description: "Cilt yapısı SMAS katmanından dikkatli şekilde ayrılır." },
      { number: "04", title: "SMAS Düzeltmesi", description: "Kas-fasya kompleksi gerilerek yükseltilir ve sabitlenir." },
      { number: "05", title: "Cilt Yeniden Şekillendirmesi", description: "Gereksiz cilt trimme edilir ve dikişler ince çizgi bırakacak şekilde yapılır." }
    ],
    results: [
      { before: "https://images.pexels.com/photos/594421/pexels-photo-594421.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/594421/pexels-photo-594421.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/594421/pexels-photo-594421.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/594421/pexels-photo-594421.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5240617/pexels-photo-5240617.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5240617/pexels-photo-5240617.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ],
    videos: [
      { name: "Deniz A.", image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "2 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "50 yaşındayım ama 40 gibi hissediyorum. Çok doğal görünüyorum, arkadaşlarım farkına bile varamamış." },
      { name: "Canan H.", image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "4 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Bir kaç tane facelift danışmanlığı almıştım ama Doktor İsmayilzada'nın yaklaşımı en hoşuma gitmişti." },
      { name: "Sinem M.", image: "https://images.pexels.com/photos/5240617/pexels-photo-5240617.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "6 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Sarkıntıdan kurtuldum ve yüzüm çok daha canlı görünüyor. Hiç operasyondan geçmiş gibi görünmüyorum." }
    ]
  },
  {
    id: "kraniyofasiyal-yanik",
    title: "Kraniyofasiyal & Yanık Rekonstrüksiyonu",
    excerpt: "Travma sonrası yüz ve kafatası bölgesinde ileri düzey rekonstrüktif cerrahi.",
    category: "Rekonstrüktif Cerrahi",
    image: "https://images.pexels.com/photos/30964696/pexels-photo-30964696.jpeg?auto=compress&cs=tinysrgb&w=1200",
    duration: "4-8 saat",
    recovery: "6-12 hafta",
    content: [
      { type: "p", text: "Kafa-yüz (kraniyofasiyal) travması ve yanık yaralanmaları yaşamı tehdit eden ciddi yaralanmalardır. Bu hastaların çok aşamalı rekonstrüksiyonu, hem işlevsellik hem de estetik açıdan önem taşır." },
      { type: "h3", text: "Travma Sonrası Yaralanmalar" },
      { type: "p", text: "Kırık kemikler, yumuşak doku kaybı, sinir hasarları ve vasküler (damar) yaralanmaları eşzamanlı olarak görülür. Her vakanın kendi zorlukları vardır." },
      { type: "quote", text: "Rekonstrüktif cerrahi sadece hastaları iyileştirmez; onları yaşamlarına geri döndürür." },
      { type: "h3", text: "Yanık Rekonstrüksiyonu" },
      { type: "p", text: "Yanıktan sonra kontraksiyonlar (büzülmeler) ve fark çizgileri oluşur. Skin grafting, lokal flap ve uzak doku naklı teknikler kullanılır. Yüz ve boyun yanıkları özellikle dikkate alınır çünkü görünürlük yüksektir." },
      { type: "p", text: "İyileşme süresi yaralanmanın derinliğine ve yaygınlığına bağlı olarak değişir. Çok aşamalı ameliyatlar 12-18 ay sürebilir." }
    ],
    steps: [
      { number: "01", title: "Acil Değerlendirme", description: "Yaşamı tehdit eden durumlar (kanama, nefes sorunu) stabilize edilir." },
      { number: "02", title: "Debridman", description: "Ölü veya enfekte doku ve kemiğin temizlenmesi yapılır." },
      { number: "03", title: "Kemik Fiksasyonu", description: "Kırık kemikler plaka veya vida ile sabitlenir." },
      { number: "04", title: "Yumuşak Doku Naklı", description: "Local flap veya mikrovaskülär transfer ile doku kaybı kapatılır." },
      { number: "05", title: "Revisyon Ameliyatları", description: "Skar iyileştirmesi ve kontur düzeltmeleri aylarca sürebilir." }
    ],
    results: [
      { before: "https://images.pexels.com/photos/30964696/pexels-photo-30964696.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/30964696/pexels-photo-30964696.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/30964696/pexels-photo-30964696.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/30964696/pexels-photo-30964696.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5240610/pexels-photo-5240610.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5240610/pexels-photo-5240610.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/7108330/pexels-photo-7108330.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/7108330/pexels-photo-7108330.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ],
    videos: [
      { name: "Mustafa K.", image: "https://images.pexels.com/photos/5240610/pexels-photo-5240610.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "6 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Kazayla yüzümün yarısı yanmıştı. Doktor İsmayilzada'nın titiz çalışması sayesinde yeniden hayata dönüştüm." },
      { name: "Elif T.", image: "https://images.pexels.com/photos/7108330/pexels-photo-7108330.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "1 sene sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Birçok operasyondan geçtim ama her safhasında desteklenmiş hissettim. Sonuç hayal bile edemediğim kadar iyi." },
      { name: "Ahmet D.", image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "18 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Asker arkadaşlarım beni tanımadılar. Sanki yeniden doğdum." }
    ]
  },
  {
    id: "mikrocerrahi",
    title: "Mikrocerrahi",
    excerpt: "Parmak ucu replantasyonu ve doku aktarımı gerektiren hassas cerrahi işlemler.",
    category: "Rekonstrüktif Cerrahi",
    image: "https://images.pexels.com/photos/8853182/pexels-photo-8853182.jpeg?auto=compress&cs=tinysrgb&w=1200",
    duration: "2-6 saat",
    recovery: "4-8 hafta",
    content: [
      { type: "p", text: "Mikrocerrahi, cerrahın 15-40x büyütme altında milimetre ve milimetreden daha küçük damarlar ve sinirleri dikişlemesini gerektirir. Parmak ucu replantasyonu, el cerrahisinde en önemli uygulamalardan biridir." },
      { type: "h3", text: "Parmak Replantasyonu" },
      { type: "p", text: "Kesilen parmak veya elişlemesinde acilen taşınırsa, çoğu durumda yeniden bağlanabilir. 6-8 saat içerisinde opera sa giriş yapıldığında başarı oranı yüksektir." },
      { type: "quote", text: "Replantasyon başarısı esas olarak hastanın zamanında tıbbi yardım almasına bağlıdır. Kesik parmağı salin veya süt içinde soğuk tutun." },
      { type: "h3", text: "Doku Aktarımı" },
      { type: "p", text: "Liberated tissue transfer (serbest flap) adı verilen teknikte, uzak bölgeden canlı doku kesilerek, damarlı bağlantıları kesilip, hasar gören bölgeye aktarılarak yeni damarlara bağlanır." },
      { type: "p", text: "İşlev kurtarma 3-6 ay sürer. Fizik terapi mikrocerrahi sonrası çok önemlidir." }
    ],
    steps: [
      { number: "01", title: "Acil Hazırlık", description: "Kesik uzuvun temizlenmesi, her iki tarafın da hazırlanması yapılır." },
      { number: "02", title: "Kemik Fiksasyonu", description: "Kesik parçalar K-teli veya vida ile sabitlenir." },
      { number: "03", title: "Tendon Onarımı", description: "Kas lifleri (tendonlar) uçları yakın dikişlerle uyumlu şekilde birleştirilir." },
      { number: "04", title: "Vaskuler (Damar) Anastomozlar", description: "Arter ve venler 15-40x büyütme altında birleştirilir. Mikro-dikişler kullanılır." },
      { number: "05", title: "Sinir Onarımı", description: "Sinir uçları uyumlu şekilde birleştirilir. Fonksiyonel iyileşme aylar sürer." }
    ],
    results: [
      { before: "https://images.pexels.com/photos/8853182/pexels-photo-8853182.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/8853182/pexels-photo-8853182.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/8853182/pexels-photo-8853182.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/8853182/pexels-photo-8853182.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5240617/pexels-photo-5240617.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5240617/pexels-photo-5240617.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ],
    videos: [
      { name: "İbrahim Y.", image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "3 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Fabrikada parmağımı makinaya kaptırmıştım. Doktor İsmayilzada olmasaydı parmağımı kaybedecektim. Şimdi yeniden normal yazabiliyorum." },
      { name: "Gül E.", image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "6 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Oğlunun parmağı kesilmişti. İlk 2 saat çok korktuk ama Doktor Bey tüm süreci kontrol etti ve harika sonuç aldık." },
      { name: "Yusuf D.", image: "https://images.pexels.com/photos/5240617/pexels-photo-5240617.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "1 sene sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Hassas bir cerrahi işlemdi ama şimdi parmağımı hiç hissetmiyorum. Doktora sonsuz güven duydum." }
    ]
  },
  {
    id: "meme-estetigi",
    title: "Meme Estetiği",
    excerpt: "Büyütme, küçültme ve dikleştirme (mastopeksi) operasyonlarında kişiye özel teknik seçimi.",
    category: "Estetik Cerrahi",
    image: "https://images.pexels.com/photos/13007292/pexels-photo-13007292.jpeg?auto=compress&cs=tinysrgb&w=1200",
    duration: "2-3 saat",
    recovery: "2-3 hafta",
    content: [
      { type: "p", text: "Meme estetiği, kadınların kendine güvenini arttıran en etkili estetik operasyonlarından biridir. Büyütme (augmentation), küçültme (reduction) ve dikleştirme (mastopexy) gibi çeşitli teknikler bulunur." },
      { type: "h3", text: "Meme Büyütmesi" },
      { type: "p", text: "Silikon implant veya yağ injeksiyonu ile meme hacmi arttırılır. Kişiye uygun boyut seçimi ve yerleşim (anatı mik veya yuvarlak) estetik başarısının anahtarıdır." },
      { type: "quote", text: "Başarılı meme estetiği, memenin vücut hatlarıyla ve hastanın kişiliğiyle uyum içinde doğal görünmesidir." },
      { type: "h3", text: "Meme Küçültmesi" },
      { type: "p", text: "Ağır memeler omuz, boyun ve sırt ağrısına neden olabilir. Küçültme, başı, omuzları hafifletirken estetik şekil korunur." },
      { type: "h3", text: "Mastopeksi (Dikleştirme)" },
      { type: "p", text: "Yaşlanma veya çoklu doğum sonrası memelerde sarkma meydana gelir. Mastopeksi ile meme hattı yükseltilir ve sıkılaştırılır." },
      { type: "p", text: "İyileşme 2-3 hafta, tam sonuç 3-6 ay sonra görülür." }
    ],
    steps: [
      { number: "01", title: "Anestezi", description: "Genel anestezi veya lokal anestezi uygulanabilir." },
      { number: "02", title: "İnsizyon", description: "Tekniğe göre areola etrafında, fold altında veya dikey hatta insizyon yapılabilir." },
      { number: "03", title: "Implant Yerleştirmesi (Büyütme durumunda)", description: "Implant, pektoral kas üzerine veya altına yerleştirilir." },
      { number: "04", title: "Doku Düzenlemesi", description: "Fazla doku kesilir, meme dokusu şekillenir ve dikleştirilir." },
      { number: "05", title: "Dikişler & Bant", description: "Göz alıcı olmayan dikişlerle kapatılır ve koruyucu bant uygulanır." }
    ],
    results: [
      { before: "https://images.pexels.com/photos/13007292/pexels-photo-13007292.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/13007292/pexels-photo-13007292.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/13007292/pexels-photo-13007292.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/13007292/pexels-photo-13007292.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/5240610/pexels-photo-5240610.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/5240610/pexels-photo-5240610.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/7108330/pexels-photo-7108330.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/7108330/pexels-photo-7108330.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { before: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=600", after: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ],
    videos: [
      { name: "Burcu Ş.", image: "https://images.pexels.com/photos/5240610/pexels-photo-5240610.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "1 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "İlk başta tereddütüm vardı ama Doktor İsmayilzada'nın samimi yaklaşımı beni rahatlatmıştı. Sonuç tamamen doğal ve memnunum." },
      { name: "Meltem A.", image: "https://images.pexels.com/photos/7108330/pexels-photo-7108330.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "4 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Doğumdan sonra sarkıntıdan kurtuldum. Vücut görüntümü birden iyileşti." },
      { name: "Işıl G.", image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=800", duration: "6 ay sonra", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", excerpt: "Doktor benden çok dinleyerek yapılacak ameliyatı anlatmıştı. Memnuniyetim %100 oldu." }
    ]
  }
];
