// Sitenin düzenlenebilir genel ayarları (menü, iletişim, CTA, footer).
// Bu dosya /admin/settings üzerinden güncellenir; kaydedince site otomatik yenilenir.

const siteSettings = {
  "phone": "+905015804482",
  "phoneDisplay": "(+90) 501 580 44 82",
  "whatsapp": "905015804482",
  "whatsappLink": "https://wa.me/905015804482",
  "email": "info@majidismayilzada.com",
  "address": "Cumhuriyet, Halaskargazi Cd. No:121, Şişli/İstanbul",
  "mapsLink": "https://www.google.com/maps?q=Halaskargazi+Cd.+No%3A121,+%C5%9Ei%C5%9Fli/%C4%B0stanbul",
  "instagram": "https://www.instagram.com/dr.mecid.ismayilzade/",
  "ctaAppointmentText": "Randevu Al",
  "ctaWhatsAppText": "WhatsApp'tan Randevu Al",
  "ctaCallText": "Telefonla Ara",
  "footerBrandText": "İstanbul — Plastik, rekonstrüktif ve estetik cerrahide kişiye özel yaklaşım.",
  "footerCopyright": "© {year} Doç. Dr. Majid İsmayilzada. Tüm hakları saklıdır.",
  "footerMenu": [
    {
      "title": "Menü",
      "links": [
        {
          "label": "Hakkımda",
          "href": "#about"
        },
        {
          "label": "Uzmanlık",
          "href": "#services"
        },
        {
          "label": "Süreç",
          "href": "#process"
        },
        {
          "label": "Sonuçlar",
          "href": "#results"
        },
        {
          "label": "Blog",
          "href": "blog.html"
        },
        {
          "label": "Güvenlik",
          "href": "#safety"
        },
        {
          "label": "Hikayeler",
          "href": "#stories"
        },
        {
          "label": "Videolar",
          "href": "#video-stories"
        },
        {
          "label": "S.S.S.",
          "href": "#faq"
        },
        {
          "label": "İletişim",
          "href": "iletisim.html"
        }
      ]
    },
    {
      "title": "Kurumsal",
      "links": [
        {
          "label": "KVKK Aydınlatma Metni",
          "href": "kvkk.html"
        },
        {
          "label": "Hasta Hakları",
          "href": "hasta-haklari.html"
        },
        {
          "label": "Gizlilik Politikası",
          "href": "gizlilik-politikasi.html"
        }
      ]
    },
    {
      "title": "İletişim",
      "links": [
        {
          "label": "Telefon",
          "href": "tel:+905015804482",
          "dynamic": "phoneDisplay"
        },
        {
          "label": "E-posta",
          "href": "mailto:info@majidismayilzada.com",
          "dynamic": "email"
        },
        {
          "label": "Adres",
          "href": "mapsLink",
          "dynamic": "address"
        }
      ]
    }
  ]
};
