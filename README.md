# Doç. Dr. Majid İsmayilzada — Web Sitesi

## Dosya Yapısı

```
majid-ismayilzada/
├── index.html              → Ana sayfa (markup)
├── blog.html                → Tüm blog yazılarının listelendiği sayfa
├── blog-detay.html          → Blog yazısı detay sayfası (şablon, ?id= ile açılır)
├── css/
│   └── style.css           → Tüm site tasarımı (ana sayfa + blog sayfaları)
├── js/
│   ├── main.js               → Ana sayfa etkileşimleri (nav, slider, animasyonlar, blog kartları)
│   ├── blog-list.js          → blog.html: kategori filtresi + tüm yazıların listelenmesi
│   └── blog-detail.js        → blog-detay.html: URL'deki ?id= değerine göre yazının render edilmesi
├── data/
│   └── blog-posts.js        → Blog yazıları (BURADAN EKLE/ÇIKAR/DÜZENLE)
├── assets/
│   └── images/
│       └── logo.png
└── README.md
```

Bu, profesyonel statik sitelerde standart olan ayrımdır: **yapı (HTML)**, **görünüm (CSS)**
ve **davranış (JS)** birbirinden ayrı dosyalarda tutulur. Tarayıcı bunları
`index.html` içindeki `<link>` ve `<script>` etiketleriyle otomatik olarak bir araya getirir.

## Blog Yazısı Ekleme / Silme / Düzenleme (Admin panel / CMS OLMADAN)

Blog, `data/blog-posts.js` dosyasındaki bir listeden otomatik oluşturulur.
Admin paneli veya CMS yoktur — çünkü hiçbir sunucu/veritabanı gerekmez, sadece
bu tek dosyayı düzenlersiniz. Bu tek dosya üç yeri aynı anda besler:

1. Ana sayfadaki "Blog" bölümünde görünen son 3 yazı
2. `blog.html` — tüm yazıların listelendiği sayfa
3. `blog-detay.html` — her yazının kendi detay sayfası (`blog-detay.html?id=...`)

**Yeni yazı eklemek için** dosyayı açın ve listeye şu şekilde yeni bir blok ekleyin:

```js
{
  id: "yeni-yazi-basligi",       // benzersiz kısa kod, Türkçe karakter/boşluk kullanmayın
  category: "Rinoplasti",
  title: "Yazının başlığı",
  excerpt: "Kısa özet cümlesi.",
  date: "12 Mart 2026",
  readTime: "5 dk okuma",
  author: "Doç. Dr. Majid İsmayilzada",
  link: "#",                      // "#" bırakılırsa detay sayfası otomatik oluşur
  image: "",                      // "assets/images/blog/foto.jpg" gibi bir yol da verebilirsiniz
  content: [
    { type: "p", text: "İlk paragraf..." },
    { type: "h3", text: "Ara başlık" },
    { type: "p", text: "Devam eden paragraf..." },
    { type: "quote", text: "Vurgulanmak istenen bir alıntı." }
  ]
}
```

`content` alanı yazının tam metnidir; detay sayfasında sırasıyla render edilir.
Bu alanı boş bırakırsanız (`content: []`), detay sayfası sadece başlık/görsel ile açılır.

**Yazı silmek için** ilgili `{ ... }` bloğunu silin — hem listeden hem de detay sayfasından
otomatik olarak kalkar (o `id`'ye giden linkler "yazı bulunamadı" sayfasına düşer).
**Sırayı değiştirmek için** blokların dizideki yerini değiştirin — üstteki ilk kart olarak görünür
ve ana sayfada gösterilen "son 3 yazı" da buna göre güncellenir.

Kaydedip sayfayı yenilediğinizde blog otomatik güncellenir. Kod bilgisi gerekmez,
sadece bu dosyadaki metinleri değiştirmek yeterli.

## Siteyi Yerelde Görüntüleme

Tarayıcıda `index.html` dosyasına doğrudan çift tıklayarak açabilirsiniz — bu proje
`fetch`/JSON kullanmadığı için (veri düz bir JS dosyası olduğu için) ekstra bir sunucuya
ihtiyaç duymaz.

Yine de geliştirme sırasında canlı yenileme gibi kolaylıklar için basit bir yerel
sunucu önerilir, örneğin:

```bash
python3 -m http.server 8000
```

sonra tarayıcıda `http://localhost:8000` adresini açın.

## Sonraki Adımlar (Doldurulması Gereken Yerler)

`index.html` içinde şu yer tutucular var, bunları gerçek bilgilerle değiştirin:
- Hero videosu: `data-video-id="VIDEO_ID_BURAYA"` → gerçek YouTube video ID'si
- Footer: telefon, e-posta, klinik adresi
- Öncesi/sonrası görselleri ve sertifika görselleri (şu an placeholder)

## Yayına Alma (Hosting)

Bu statik bir sitedir — herhangi bir statik hosting servisiyle yayınlanabilir
(örn. Netlify, Vercel, GitHub Pages, veya herhangi bir paylaşımlı hosting/cPanel).
Sadece bu klasörün tamamını sunucuya yüklemeniz yeterlidir.
