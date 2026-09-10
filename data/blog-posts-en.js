/**
 * BLOG POSTS (ENGLISH)
 * ---------------------------------------------------
 * There is NO admin panel / CMS. To add, edit or delete a
 * blog post, edit this file directly.
 *
 * TO ADD A NEW POST:
 *   Add a new { ... } block to the array below.
 *
 * TO DELETE A POST:
 *   Delete the relevant { ... } block.
 *
 * ORDERING:
 *   The order in the array is the order shown on the site
 *   (the first one becomes the first card).
 *
 * FIELDS:
 *   id       -> Unique short code (do not use special characters or spaces).
 *               The detail page opens automatically at blog-detay.html?id=THIS_ID.
 *   category -> Small label shown on the card (e.g. "Rhinoplasty")
 *   title    -> Title
 *   excerpt  -> Short summary (1 sentence recommended, shown on card and top menu)
 *   date     -> Publication date (e.g. "January 14, 2026")
 *   readTime -> Reading time (e.g. "6 min read")
 *   author   -> Author name
 *   link     -> If left as "#", the detail page is generated automatically (recommended).
 *               To link externally (to another site), you can write the full URL.
 *   image    -> Image file path (e.g. "assets/images/blog/post1.jpg"),
 *               if left empty (""), a colored image area is shown instead
 *   content  -> The full content of the post. Each element is a paragraph
 *               or a subheading:
 *               { type: "p", text: "..." }   -> normal paragraph
 *               { type: "h3", text: "..." }  -> subheading
 *               { type: "quote", text: "..." } -> emphasized quote box
 */

var blogPostsEn = [
  {
    "id": "rinoplasti-iyilesme-sureci",
    "category": "Rhinoplasty",
    "title": "What You Should Know About the Recovery Process",
    "excerpt": "The first week, managing swelling, and getting ready to return to daily life.",
    "date": "January 14, 2026",
    "readTime": "6 min read",
    "author": "Assoc. Prof. Dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=rinoplasti-iyilesme-surecida",
    "image": "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "contentHtml": "<p>Recovery after rhinoplasty is the process that most patients are the most curious about, yet the least informed about. Just as much as the operation itself, the way your body heals in the weeks afterward shapes the final result. In this article, I answer the questions I hear most often in my consultations, along with a realistic timeline.</p><h3>The first 48 hours: rest and keeping your head elevated</h3><p>During the first day after the operation, swelling increases rapidly and usually peaks on day 2–3. During this period, keeping your head elevated above heart level, sleeping on your back, and applying ice noticeably reduce swelling. Pain is milder than most patients expect; a feeling of pressure is more dominant than pain.</p><h3>The first week: the splint and visible bruising</h3><p>The nasal splint is usually removed on day 6–7. At this stage, mild to moderate bruising is normal and varies from person to person; healing progresses noticeably faster in patients who do not smoke or take blood thinners. When the splint is removed, the nose still looks swollen — this is not the final shape, but a transitional stage.</p><h3>Months 1–3: social recovery</h3><p>Visible bruising and obvious swelling generally subside within 2–3 weeks; at this point, most patients can comfortably return to their social environment. However, fine tissue swelling at the tip of the nose can continue subtly for months, becoming noticeable especially in the mornings or after a salty meal.</p><h3>Months 6–12: the final result</h3><p>Depending on the thickness of the nasal skin, seeing the true result of the surgery can take anywhere from 6 months to 1 year. This process is shorter in patients with thin skin and longer in patients with thick skin. This wait requires patience, but when this timeline is clearly shared with the patient during the planning stage, anxiety is greatly reduced.</p><blockquote>In rhinoplasty, patience is as much a part of the result as surgical technique — the tissue slowly completes its own story.</blockquote><h3>Practical tips to speed up your recovery</h3><p>Limiting salt intake, drinking plenty of water, regularly performing the nasal care your doctor recommends, and protecting your nose from the sun are simple yet effective steps that support healing. A break of usually 4–6 weeks is recommended before exercise and strenuous physical activity; this period is refined according to the individual.</p><p>Every nose is different, and every recovery progresses at its own pace. During the consultation, I create a timeline tailored to your tissue type and stay by your side with regular check-ups throughout the process.</p>"
  },
  {
    "id": "ilk-konsultasyon-sorulari",
    "category": "Consultation",
    "title": "Which Questions Should You Ask at Your First Consultation?",
    "excerpt": "What to pay attention to when choosing the right surgeon.",
    "date": "February 3, 2026",
    "readTime": "5 min read",
    "author": "Assoc. Prof. Dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=ilk-konsultasyon-sorulari",
    "image": "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "content": [
      {
        "type": "p",
        "text": "The first consultation before deciding on an aesthetic or reconstructive surgery is the most critical step of the entire process. A consultation you enter with the right questions both clarifies your expectations and gives you confidence that you have chosen the right surgeon."
      },
      {
        "type": "h3",
        "text": "The surgeon's expertise and experience"
      },
      {
        "type": "p",
        "text": "Do not hesitate to ask how frequently the surgeon performs the operation you are requesting, which techniques they master, and about their academic and scientific background. Board certification, university affiliations, and publications are concrete indicators of how current a surgeon is in their field."
      },
      {
        "type": "h3",
        "text": "Discussing expectations and risks"
      },
      {
        "type": "p",
        "text": "A good consultation openly discusses not only the best possible outcome but also realistic limits and potential risks. The question \"What can I not achieve with this operation?\" is just as important as \"What can I achieve?\". If digital simulation is used, remember that it is a planning tool, not a guarantee."
      },
      {
        "type": "h3",
        "text": "Anesthesia and the safety infrastructure"
      },
      {
        "type": "p",
        "text": "Where the operation will take place, who makes up the anesthesia team, and the protocol to be followed in the event of a possible complication should all be made clear. A fully equipped operating room and an experienced anesthesia team form the foundation of a safe process."
      },
      {
        "type": "h3",
        "text": "Recovery process and follow-up"
      },
      {
        "type": "p",
        "text": "Practical details such as how many check-ups will take place after surgery, when the stitches will be removed, how long it takes to return to work and social life, and who you can reach in an emergency greatly reduce your anxiety throughout the process."
      },
      {
        "type": "quote",
        "text": "A consultation that does not answer your questions patiently and clearly is the clearest sign pointing to the wrong surgeon."
      },
      {
        "type": "h3",
        "text": "Cost and transparency"
      },
      {
        "type": "p",
        "text": "What the pricing covers (operating room, anesthesia, check-ups, and the potential revision policy) should be clearly shared in writing. Transparent pricing is an indicator of a trustworthy clinical relationship."
      },
      {
        "type": "p",
        "text": "A preliminary consultation approached with these questions not only informs you, but also ensures you feel safe and secure during the decision process. In your free preliminary consultation with us, we address all of these topics together, step by step."
      }
    ],
    "contentHtml": "<p>The first consultation before deciding on an aesthetic or reconstructive surgery is the most critical step of the entire process. A consultation you enter with the right questions both clarifies your expectations and gives you confidence that you have chosen the right surgeon.</p>\n<h3>The surgeon's expertise and experience</h3>\n<p>Do not hesitate to ask how frequently the surgeon performs the operation you are requesting, which techniques they master, and about their academic and scientific background. Board certification, university affiliations, and publications are concrete indicators of how current a surgeon is in their field.</p>\n<h3>Discussing expectations and risks</h3>\n<p>A good consultation openly discusses not only the best possible outcome but also realistic limits and potential risks. The question \"What can I not achieve with this operation?\" is just as important as \"What can I achieve?\". If digital simulation is used, remember that it is a planning tool, not a guarantee.</p>\n<h3>Anesthesia and the safety infrastructure</h3>\n<p>Where the operation will take place, who makes up the anesthesia team, and the protocol to be followed in the event of a possible complication should all be made clear. A fully equipped operating room and an experienced anesthesia team form the foundation of a safe process.</p>\n<h3>Recovery process and follow-up</h3>\n<p>Practical details such as how many check-ups will take place after surgery, when the stitches will be removed, how long it takes to return to work and social life, and who you can reach in an emergency greatly reduce your anxiety throughout the process.</p>\n<blockquote>A consultation that does not answer your questions patiently and clearly is the clearest sign pointing to the wrong surgeon.</blockquote>\n<h3>Cost and transparency</h3>\n<p>What the pricing covers (operating room, anesthesia, check-ups, and the potential revision policy) should be clearly shared in writing. Transparent pricing is an indicator of a trustworthy clinical relationship.</p>\n<p>A preliminary consultation approached with these questions not only informs you, but also ensures you feel safe and secure during the decision process. In your free preliminary consultation with us, we address all of these topics together, step by step.</p>"
  },
  {
    "id": "meme-rekonstruksiyonu-teknik",
    "category": "Reconstruction",
    "title": "Choosing a Technique in Breast Reconstruction",
    "excerpt": "Which method is more suitable for which patients.",
    "date": "February 21, 2026",
    "readTime": "7 min read",
    "author": "Assoc. Prof. Dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=meme-rekonstruksiyonu-teknik",
    "image": "https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "content": [
      {
        "type": "p",
        "text": "Breast reconstruction is a highly personalized field of surgery that helps a patient rebuild both their physical integrity and their self-confidence after cancer treatment. The choice of the right technique is shaped by the patient's anatomy, previous treatments, and personal priorities."
      },
      {
        "type": "h3",
        "text": "Implant-based reconstruction"
      },
      {
        "type": "p",
        "text": "This method begins with a tissue expander and then progresses to a silicone implant. Because it requires no additional donor site, it shortens the operation time and the recovery process. It is a suitable option especially for patients who have a thin-to-medium tissue envelope and who want fewer surgical procedures in a single stage."
      },
      {
        "type": "h3",
        "text": "Autologous (using your own tissue) reconstruction"
      },
      {
        "type": "p",
        "text": "This method, performed with microsurgical techniques such as the DIEP flap and using tissue taken from the abdomen, back, or thighs, offers a more permanent result that ages naturally with the body over time. It requires a longer and technically more complex operation, but it generally produces better outcomes in tissues that have undergone radiotherapy."
      },
      {
        "type": "h3",
        "text": "How does a history of radiotherapy affect the decision?"
      },
      {
        "type": "p",
        "text": "Because blood circulation and elasticity are reduced in tissue that has received radiotherapy, the risk of complications may increase with implant-based methods. In these patients, autologous techniques or hybrid approaches (a combination of your own tissue plus an implant) are most often preferred."
      },
      {
        "type": "h3",
        "text": "Timing: immediate or delayed?"
      },
      {
        "type": "p",
        "text": "Reconstruction can be performed in the same session as the mastectomy (immediate) or after the oncological treatments have been completed (delayed). This decision is planned jointly with the oncology team, taking into account the tumor stage, the need for radiotherapy, and the patient's preferences."
      },
      {
        "type": "quote",
        "text": "The right technique is not the 'most advanced' one, but the one that best suits the patient's anatomy and life."
      },
      {
        "type": "h3",
        "text": "Nipple and areola reconstruction"
      },
      {
        "type": "p",
        "text": "Once the breast form has settled, the appearance of the nipple–areola complex can, if desired, be completed using local tissue flaps or 3D tattooing techniques. This is usually the final and least invasive step of the process."
      },
      {
        "type": "p",
        "text": "Every patient's oncological history, tissue structure, and expectations are different; therefore, the choice of technique is clarified not through a single consultation but through a multidisciplinary evaluation coordinated with the oncology team."
      }
    ],
    "contentHtml": "<p>Breast reconstruction is a highly personalized field of surgery that helps a patient rebuild both their physical integrity and their self-confidence after cancer treatment. The choice of the right technique is shaped by the patient's anatomy, previous treatments, and personal priorities.</p>\n<h3>Implant-based reconstruction</h3>\n<p>This method begins with a tissue expander and then progresses to a silicone implant. Because it requires no additional donor site, it shortens the operation time and the recovery process. It is a suitable option especially for patients who have a thin-to-medium tissue envelope and who want fewer surgical procedures in a single stage.</p>\n<h3>Autologous (using your own tissue) reconstruction</h3>\n<p>This method, performed with microsurgical techniques such as the DIEP flap and using tissue taken from the abdomen, back, or thighs, offers a more permanent result that ages naturally with the body over time. It requires a longer and technically more complex operation, but it generally produces better outcomes in tissues that have undergone radiotherapy.</p>\n<h3>How does a history of radiotherapy affect the decision?</h3>\n<p>Because blood circulation and elasticity are reduced in tissue that has received radiotherapy, the risk of complications may increase with implant-based methods. In these patients, autologous techniques or hybrid approaches (a combination of your own tissue plus an implant) are most often preferred.</p>\n<h3>Timing: immediate or delayed?</h3>\n<p>Reconstruction can be performed in the same session as the mastectomy (immediate) or after the oncological treatments have been completed (delayed). This decision is planned jointly with the oncology team, taking into account the tumor stage, the need for radiotherapy, and the patient's preferences.</p>\n<blockquote>The right technique is not the 'most advanced' one, but the one that best suits the patient's anatomy and life.</blockquote>\n<h3>Nipple and areola reconstruction</h3>\n<p>Once the breast form has settled, the appearance of the nipple–areola complex can, if desired, be completed using local tissue flaps or 3D tattooing techniques. This is usually the final and least invasive step of the process.</p>\n<p>Every patient's oncological history, tissue structure, and expectations are different; therefore, the choice of technique is clarified not through a single consultation but through a multidisciplinary evaluation coordinated with the oncology team.</p>"
  }
];
