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

var blogPostsEs = [
  {
    "id": "rinoplasti-iyilesme-sureci",
    "category": "Rinoplastia",
    "title": "Lo que debe saber sobre el proceso de recuperación",
    "excerpt": "La primera semana, el control de la hinchazón y la preparación para el regreso.",
    "date": "14 de enero de 2026",
    "readTime": "6 min de lectura",
    "author": "Prof. Asoc. Dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=rinoplasti-iyilesme-surecida",
    "image": "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "contentHtml": "<p>La recuperación tras la rinoplastia es el proceso que más despierta la curiosidad de los pacientes, aunque suele ser el del que menos información disponen. Al igual que la operación, el camino que sigue su cuerpo en las semanas posteriores también determina el resultado final. En este artículo respondo, con una cronología realista, las preguntas que con más frecuencia me plantean en las consultas.</p><h3>Las primeras 48 horas: descanso y cabeza elevada</h3><p>Tras la operación, la hinchazón aumenta rápidamente durante el primer día y suele alcanzar su pico entre el 2.º y el 3.º día. En este periodo, mantener la cabeza por encima del nivel del corazón, dormir boca arriba y aplicar frío reducen de forma notable la hinchazón. El dolor es más leve de lo que la mayoría de los pacientes imagina; la sensación de presión se impone sobre el dolor.</p><h3>La primera semana: la férula y los moretones visibles</h3><p>La férula nasal se retira normalmente entre el 6.º y el 7.º día. En esta fase es normal presentar moretones de leve a moderado, que varían de una persona a otra; la cicatrización es claramente más rápida en los pacientes que no fuman ni toman anticoagulantes. Cuando se retira la férula, la nariz aún se ve hinchada: no es la forma final, sino una etapa de transición.</p><h3>1-3 meses: recuperación social</h3><p>Los moretones visibles y la hinchazón evidente suelen remitir en 2-3 semanas; la mayoría de los pacientes puede volver con normalidad a su entorno social. No obstante, la hinchazón del tejido fino de la punta nasal puede persistir de forma discreta durante meses, y se hace especialmente notoria por las mañanas o después de una comida salada.</p><h3>6-12 meses: el resultado final</h3><p>Según el grosor de la piel de la nariz, ver el resultado real de la cirugía puede llevar entre 6 meses y un año. En los pacientes de piel fina este proceso es más corto y, en los de piel gruesa, más largo. Esta espera exige paciencia, pero la ansiedad disminuye considerablemente cuando esta cronología se comparte de forma transparente con el paciente durante la fase de planificación.</p><blockquote>En la rinoplastia, la paciencia forma parte del resultado tanto como la técnica quirúrgica: el tejido va completando poco a poco su propia historia.</blockquote><h3>Consejos prácticos para acelerar la recuperación</h3><p>Limitar la ingesta de sal, beber abundante agua, realizar con regularidad la higiene nasal recomendada por su médico y protegerse del sol son pasos sencillos pero eficaces que favorecen la cicatrización. Antes de retomar el ejercicio y la actividad física intensa se recomienda normalmente una pausa de 4-6 semanas, que se ajusta de forma individual.</p><p>Cada nariz es distinta y cada recuperación avanza a su propio ritmo. Durante la consulta elaboramos una cronología adaptada a su tipo de piel y le acompañamos con controles periódicos a lo largo de todo el proceso.</p>"
  },
  {
    "id": "ilk-konsultasyon-sorulari",
    "category": "Consulta",
    "title": "¿Qué preguntas debe hacer en la primera consulta?",
    "excerpt": "Qué tener en cuenta al elegir al cirujano adecuado.",
    "date": "3 de febrero de 2026",
    "readTime": "5 min de lectura",
    "author": "Prof. Asoc. Dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=ilk-konsultasyon-sorulari",
    "image": "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "content": [
      {
        "type": "p",
        "text": "La primera consulta, previa a decidirse por una cirugía estética o reconstructiva, es el paso más crítico de todo el proceso. Abordar una consulta con las preguntas adecuadas aclara sus expectativas y le asegura de haber elegido al cirujano adecuado."
      },
      {
        "type": "h3",
        "text": "La especialización y la experiencia del cirujano"
      },
      {
        "type": "p",
        "text": "No vacile en preguntar con qué frecuencia realiza la operación que usted solicita, qué técnicas domina y cuál es su formación académica y científica. La certificación de especialidad, los vínculos universitarios y las publicaciones son indicadores concretos de que el cirujano mantiene su actualización en el campo."
      },
      {
        "type": "h3",
        "text": "Hablar de expectativas y de riesgos"
      },
      {
        "type": "p",
        "text": "Una buena consulta no solo habla del mejor resultado posible, sino también de los límites realistas y de los posibles riesgos. La pregunta «¿Qué no puedo conseguir con esta operación?» es tan importante como «¿Qué sí puedo conseguir?». Si se utiliza simulación digital, recuerde que es una herramienta de previsión, no una garantía."
      },
      {
        "type": "h3",
        "text": "Anestesia y estructura de seguridad"
      },
      {
        "type": "p",
        "text": "Debe quedar claro dónde se realizará la operación, quién integra el equipo de anestesia y qué protocolo se seguirá ante una posible complicación. Un quirófano totalmente equipado y un equipo de anestesia experimentado son la base de un proceso seguro."
      },
      {
        "type": "h3",
        "text": "Recuperación y seguimiento"
      },
      {
        "type": "p",
        "text": "Detalles prácticos como el número de controles tras la cirugía, el momento de retirada de los puntos, el plazo de retorno al trabajo y a la vida social o a quién acudir en una urgencia reducen notablemente su ansiedad a lo largo de todo el proceso."
      },
      {
        "type": "quote",
        "text": "Una consulta que no responde sus preguntas con paciencia y claridad es la señal más evidente de que ha elegido al cirujano equivocado."
      },
      {
        "type": "h3",
        "text": "Coste y transparencia"
      },
      {
        "type": "p",
        "text": "Debe compartirse por escrito y de forma clara qué incluye la tarifa (quirófano, anestesia, revisiones y posible política de retoques). Una tarifa transparente es el indicio de una relación clínica fiable."
      },
      {
        "type": "p",
        "text": "Una primera consulta abordada con estas preguntas no solo le informa, sino que también le hace sentirse seguro durante el proceso de decisión. En su primera consulta gratuita con nosotros tratamos todos estos puntos juntos, paso a paso."
      }
    ],
    "contentHtml": "<p>La primera consulta, previa a decidirse por una cirugía estética o reconstructiva, es el paso más crítico de todo el proceso. Abordar una consulta con las preguntas adecuadas aclara sus expectativas y le asegura de haber elegido al cirujano adecuado.</p>\n<h3>La especialización y la experiencia del cirujano</h3>\n<p>No vacile en preguntar con qué frecuencia realiza la operación que usted solicita, qué técnicas domina y cuál es su formación académica y científica. La certificación de especialidad, los vínculos universitarios y las publicaciones son indicadores concretos de que el cirujano mantiene su actualización en el campo.</p>\n<h3>Hablar de expectativas y de riesgos</h3>\n<p>Una buena consulta no solo habla del mejor resultado posible, sino también de los límites realistas y de los posibles riesgos. La pregunta «¿Qué no puedo conseguir con esta operación?» es tan importante como «¿Qué sí puedo conseguir?». Si se utiliza simulación digital, recuerde que es una herramienta de previsión, no una garantía.</p>\n<h3>Anestesia y estructura de seguridad</h3>\n<p>Debe quedar claro dónde se realizará la operación, quién integra el equipo de anestesia y qué protocolo se seguirá ante una posible complicación. Un quirófano totalmente equipado y un equipo de anestesia experimentado son la base de un proceso seguro.</p>\n<h3>Recuperación y seguimiento</h3>\n<p>Detalles prácticos como el número de controles tras la cirugía, el momento de retirada de los puntos, el plazo de retorno al trabajo y a la vida social o a quién acudir en una urgencia reducen notablemente su ansiedad a lo largo de todo el proceso.</p>\n<blockquote>Una consulta que no responde sus preguntas con paciencia y claridad es la señal más evidente de que ha elegido al cirujano equivocado.</blockquote>\n<h3>Coste y transparencia</h3>\n<p>Debe compartirse por escrito y de forma clara qué incluye la tarifa (quirófano, anestesia, revisiones y posible política de retoques). Una tarifa transparente es el indicio de una relación clínica fiable.</p>\n<p>Una primera consulta abordada con estas preguntas no solo le informa, sino que también le hace sentirse seguro durante el proceso de decisión. En su primera consulta gratuita con nosotros tratamos todos estos puntos juntos, paso a paso.</p>"
  },
  {
    "id": "meme-rekonstruksiyonu-teknik",
    "category": "Reconstrucción",
    "title": "Elección de la técnica en la reconstrucción mamaria",
    "excerpt": "Qué método es más adecuado según cada paciente.",
    "date": "21 de febrero de 2026",
    "readTime": "7 min de lectura",
    "author": "Prof. Asoc. Dr. Majid Ismayilzada",
    "link": "blog-detay.html?id=meme-rekonstruksiyonu-teknik",
    "image": "https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "content": [
      {
        "type": "p",
        "text": "La reconstrucción mamaria es un ámbito quirúrgico altamente personalizado que ayuda al paciente a reconstruir tanto su integridad física como su confianza en sí mismo después del tratamiento del cáncer. La elección de la técnica adecuada se define según la anatomía del paciente, los tratamientos previos y sus prioridades personales."
      },
      {
        "type": "h3",
        "text": "Reconstrucción con implante"
      },
      {
        "type": "p",
        "text": "Este método comienza con un expansor de tejido y continúa con un implante de silicón. Al no requerir una zona donante adicional, acorta el tiempo quirúrgico y el proceso de recuperación. Es una opción especialmente adecuada para pacientes con un recubrimiento tisular de fino a medio que desean menos cirugías en un solo tiempo."
      },
      {
        "type": "h3",
        "text": "Reconstrucción autóloga (con tejido propio)"
      },
      {
        "type": "p",
        "text": "Este método, realizado con técnicas microquirúrgicas como el colgajo DIEP y con tejido tomado del abdomen, la espalda o los muslos, ofrece un resultado más duradero que envejece de forma natural con el cuerpo. Requiere una intervención más larga y técnicamente más compleja, pero suele dar mejores resultados en los tejidos irradiados."
      },
      {
        "type": "h3",
        "text": "¿Cómo influye el antecedente de radioterapia en la decisión?"
      },
      {
        "type": "p",
        "text": "Como la vascularización y la elasticidad disminuyen en el tejido irradiado, el riesgo de complicaciones puede aumentar con los métodos basados en implantes. En estos pacientes suelen preferirse las técnicas autólogas o los enfoques híbridos (tejido propio + implante)."
      },
      {
        "type": "h3",
        "text": "Cronología: ¿inmediata o diferida?"
      },
      {
        "type": "p",
        "text": "La reconstrucción puede realizarse en la misma sesión que la mastectomía (inmediata) o cuando han finalizado los tratamientos oncológicos (diferida). Esta decisión se planifica de forma conjunta con el equipo de oncología, teniendo en cuenta el estadio tumoral, la necesidad de radioterapia y las preferencias del paciente."
      },
      {
        "type": "quote",
        "text": "La técnica adecuada no es la más avanzada, sino la que mejor se adapta a la anatomía y a la vida del paciente."
      },
      {
        "type": "h3",
        "text": "Reconstrucción del complejo pezón-areola"
      },
      {
        "type": "p",
        "text": "Una vez definida la forma de la mama, el aspecto del complejo pezón-areola puede completarse, si se desea, con colgajos de tejido local o con técnicas de tatuaje 3D. Es, por lo general, el último paso del proceso y el menos invasivo."
      },
      {
        "type": "p",
        "text": "El historial oncológico, la estructura tisular y las expectativas de cada paciente son distintos; por ello, la elección de la técnica no se define en una sola consulta, sino mediante una evaluación integral coordinada con el equipo de oncología."
      }
    ],
    "contentHtml": "<p>La reconstrucción mamaria es un ámbito quirúrgico altamente personalizado que ayuda al paciente a reconstruir tanto su integridad física como su confianza en sí mismo después del tratamiento del cáncer. La elección de la técnica adecuada se define según la anatomía del paciente, los tratamientos previos y sus prioridades personales.</p>\n<h3>Reconstrucción con implante</h3>\n<p>Este método comienza con un expansor de tejido y continúa con un implante de silicón. Al no requerir una zona donante adicional, acorta el tiempo quirúrgico y el proceso de recuperación. Es una opción especialmente adecuada para pacientes con un recubrimiento tisular de fino a medio que desean menos cirugías en un solo tiempo.</p>\n<h3>Reconstrucción autóloga (con tejido propio)</h3>\n<p>Este método, realizado con técnicas microquirúrgicas como el colgajo DIEP y con tejido tomado del abdomen, la espalda o los muslos, ofrece un resultado más duradero que envejece de forma natural con el cuerpo. Requiere una intervención más larga y técnicamente más compleja, pero suele dar mejores resultados en los tejidos irradiados.</p>\n<h3>¿Cómo influye el antecedente de radioterapia en la decisión?</h3>\n<p>Como la vascularización y la elasticidad disminuyen en el tejido irradiado, el riesgo de complicaciones puede aumentar con los métodos basados en implantes. En estos pacientes suelen preferirse las técnicas autólogas o los enfoques híbridos (tejido propio + implante).</p>\n<h3>Cronología: ¿inmediata o diferida?</h3>\n<p>La reconstrucción puede realizarse en la misma sesión que la mastectomía (inmediata) o cuando han finalizado los tratamientos oncológicos (diferida). Esta decisión se planifica de forma conjunta con el equipo de oncología, teniendo en cuenta el estadio tumoral, la necesidad de radioterapia y las preferencias del paciente.</p>\n<blockquote>La técnica adecuada no es la más avanzada, sino la que mejor se adapta a la anatomía y a la vida del paciente.</blockquote>\n<h3>Reconstrucción del complejo pezón-areola</h3>\n<p>Una vez definida la forma de la mama, el aspecto del complejo pezón-areola puede completarse, si se desea, con colgajos de tejido local o con técnicas de tatuaje 3D. Es, por lo general, el último paso del proceso y el menos invasivo.</p>\n<p>El historial oncológico, la estructura tisular y las expectativas de cada paciente son distintos; por ello, la elección de la técnica no se define en una sola consulta, sino mediante una evaluación integral coordinada con el equipo de oncología.</p>"
  }
];
