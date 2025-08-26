/**
 * Translation Loader Utility
 *
 * This utility helps load the correct translations for components based on the current language.
 * It works with the language context to provide localized content.
 */

import { SUPPORTED_LANGUAGES } from "./hreflangManager";

// Cache for loaded translations
const translationCache = {};

/**
 * Default translations object
 * Contains translations for all supported languages
 */
const translations = {
  "en-us": {
    common: {
      home: "Home",
      menu: "Menu",
      blog: "Blog",
      contact: "Contact",
      orderOnline: "Order Online",
      orderNow: "Order Now",
      menu: "View Menu",
      contact: "Contact Us",
      about: "About Us",
      blog: "Blog",
      faq: "FAQ",
      language: "Language",
      hours: "Opening Hours",
      address: "Address",
      phone: "Phone",
      email: "Email",
      copyright: "© 2025 Istanbul Mediterranean. All rights reserved.",
      delivery: "Delivery",
      pickup: "Pickup",
      reservations: "Reservations",
      catering: "Catering",
      viewFullMenu: "View Full Menu",
      viewOnGoogleMaps: "View on Google Maps",
      review: "Review",
    },
    home: {
      hero: {
        title: "Authentic Turkish Döner in Las Vegas",
        subtitle: "Family recipe, Istanbul roots—crafted fresh daily",
      },
      featuredDishes: "Featured Dishes",
      testimonials: {
        title: "What People Say",
        person1: {
          name: "Sarah L.",
          text: "Absolutely the best doner in Vegas! The meat was juicy and flavorful. Will be back!",
          source: "Yelp",
        },
        person2: {
          name: "Mike D.",
          text: "Open late, super convenient after a night out. The Turkish bread is amazing.",
          source: "Google",
        },
        person3: {
          name: "Jessica P.",
          text: "Falafel wrap was fresh and delicious. Friendly staff and fast service.",
          source: "Yelp",
        },
        person4: {
          name: "Alex K.",
          text: "Great vegetarian options and everything is halal. Highly recommend the baklava!",
          source: "Google",
        },
        person5: {
          name: "David S.",
          text: "Portions are generous and prices are reasonable for the Strip. Will visit again!",
          source: "Yelp",
        },
        person6: {
          name: "Maria G.",
          text: "Impeccably clean, friendly, and the food is always fresh. Love this place!",
          source: "Google",
        },
      },
      story: "Our Story",
      storyText:
        "From the bustling streets of Istanbul to the heart of Las Vegas, we bring authentic Turkish flavors crafted with passion and tradition.",
      halal: {
        title: "100% Halal Certified",
        description:
          "All meats are ethically sourced and prepared in accordance with halal standards.",
      },
      whyChooseUs: "Why Choose Us?",
      aboutUs: "About Us",
      aboutText: {
        paragraph1:
          "At Istanbul Mediterranean, our story begins in the heart of Turkey, where food is more than a meal—it's a celebration of family, tradition, and togetherness. Our recipes are rooted in the rich history of the Ottoman Empire and shaped by the vibrant cultures along the Silk Road and Mediterranean coasts. Each dish we serve is a reflection of our family's heritage and the centuries-old culinary traditions passed down through generations.",
        quote:
          "Cooking is our family's passion. From Istanbul's bustling streets to our kitchen in Las Vegas, we bring you the authentic flavors of Turkish and Mediterranean cuisine.",
        paragraph2:
          "We are proud to serve 100% Halal-certified meats and honor the values of ethical sourcing and traditional preparation. At Istanbul Mediterranean, we invite you to join our family table and experience the true taste of Turkey—where every meal is a journey through history, and every guest is treated like family.",
        signature: "Istanbul Family",
      },
      findUs: {
        title: "Find Us",
        address: "3615 S Las Vegas Blvd #101, Las Vegas, NV 89109",
        hours: "Open: 10:00 am - 5:00 am daily",
        viewMap: "View on Google Maps",
      },
      features: {
        doner: {
          title: "Authentic Turkish Doner",
          description:
            "Juicy, flavorful, and carved fresh daily—just like Istanbul.",
        },
        halal: {
          title: "100% Halal & Vegan Options",
          description:
            "Halal-certified meats and plenty of vegetarian/vegan choices for all.",
        },
        openLate: {
          title: "Open Late, Every Day",
          description:
            "Craving doner at 4am? We're here for you—open until 5am daily.",
        },
        family: {
          title: "Family-Owned Hospitality",
          description:
            "Warm, friendly service that makes you feel right at home.",
        },
        location: {
          title: "On the Vegas Strip",
          description:
            "Conveniently located in the heart of Las Vegas for locals & visitors.",
        },
      },
      socialShare: {
        title: "Best Turkish Food in Las Vegas - Istanbul Mediterranean",
        description:
          "Authentic Turkish doner, shawarma, and more. Family recipe, Istanbul roots—crafted fresh in Las Vegas.",
      },
      features: {
        doner: {
          title: "Authentic Turkish Doner",
          description:
            "Juicy, flavorful, and carved fresh daily—just like Istanbul.",
        },
        halal: {
          title: "100% Halal & Vegan Options",
          description:
            "Halal-certified meats and plenty of vegetarian/vegan choices for all.",
        },
        openLate: {
          title: "Open Late, Every Day",
          description:
            "Craving doner at 4am? We're here for you—open until 5am daily.",
        },
        family: {
          title: "Family-Owned Hospitality",
          description:
            "Warm, friendly service that makes you feel right at home.",
        },
        location: {
          title: "On the Vegas Strip",
          description:
            "Conveniently located in the heart of Las Vegas for locals & visitors.",
        },
      },
      aboutText: {
        paragraph1:
          "At Istanbul Mediterranean, our story begins in the heart of Turkey, where food is more than a meal—it's a celebration of family, tradition, and togetherness. Our recipes are rooted in the rich history of the Ottoman Empire and shaped by the vibrant cultures along the Silk Road and Mediterranean coasts. Each dish we serve is a reflection of our family's heritage and the centuries-old culinary traditions passed down through generations.",
        quote:
          "Cooking is our family's passion. From Istanbul's bustling streets to our kitchen in Las Vegas, we bring you the authentic flavors of Turkish and Mediterranean cuisine.",
        paragraph2:
          "We are proud to serve 100% Halal-certified meats and honor the values of ethical sourcing and traditional preparation. At Istanbul Mediterranean, we invite you to join our family table and experience the true taste of Turkey—where every meal is a journey through history, and every guest is treated like family.",
        signature: "Istanbul Family",
      },
      faq: {
        title: "Frequently Asked Questions",
        questions: [
          {
            question: "What are your opening hours?",
            answer:
              "We are open daily from 10:00 AM to 5:00 AM, serving fresh Turkish food late into the night.",
          },
          {
            question: "Is all your food halal?",
            answer:
              "Yes, all our meat is 100% halal certified. We take pride in serving authentic halal Turkish cuisine.",
          },
          {
            question: "Do you offer vegetarian options?",
            answer:
              "Absolutely! We have a variety of vegetarian and vegan options including falafel, hummus, stuffed grape leaves, and more.",
          },
          {
            question: "Where are you located on the Las Vegas Strip?",
            answer:
              "We are located at 3615 S Las Vegas Blvd #101, Las Vegas, NV 89109, conveniently situated on the Strip.",
          },
          {
            question: "Do you offer delivery?",
            answer:
              "Yes, we offer delivery through our website and major delivery platforms like Uber Eats, DoorDash, and Grubhub.",
          },
        ],
      },
    },
    menu: {
      title: "Our Menu",
      subtitle: "Traditional Turkish flavors with a modern twist",
      categories: {
        doner: "Döner Kebab",
        wraps: "Wraps",
        plates: "Plates",
        sides: "Sides",
        desserts: "Desserts",
        drinks: "Drinks",
        all: "All",
      },
      items: {
        doner_beef: "Beef Döner",
        doner_chicken: "Chicken Döner",
        doner_mixed: "Mixed Döner",
        wrap_beef: "Beef Wrap",
        wrap_chicken: "Chicken Wrap",
        wrap_falafel: "Falafel Wrap",
        plate_beef: "Beef Döner Plate",
        plate_chicken: "Chicken Döner Plate",
        plate_mixed: "Mixed Döner Plate",
        plate_falafel: "Falafel Plate",
        side_fries: "French Fries",
        side_rice: "Rice",
        side_hummus: "Hummus",
        side_salad: "Salad",
        dessert_baklava: "Baklava",
        dessert_kunefe: "Kunefe",
        dessert_sutlac: "Rice Pudding",
        drink_ayran: "Ayran",
        drink_tea: "Turkish Tea",
        drink_soda: "Soft Drinks",
        drink_water: "Water",
      },
    },
    nav: {
      home: "Home",
      menu: "Menu",
      about: "About",
      blog: "Blog",
      delivery: "Delivery",
      contact: "Contact",
      careers: "Careers",
    },
  },
  "tr-tr": {
    common: {
      home: "Ana Sayfa",
      menu: "Menü",
      blog: "Blog",
      contact: "İletişim",
      orderOnline: "Online Sipariş",
      orderNow: "Şimdi Sipariş Ver",
      menu: "Menüyü Gör",
      contact: "İletişim",
      about: "Hakkımızda",
      blog: "Blog",
      faq: "SSS",
      language: "Dil",
      hours: "Çalışma Saatleri",
      address: "Adres",
      phone: "Telefon",
      email: "E-posta",
      copyright: " 2025 Istanbul Mediterranean. Tüm hakları saklıdır.",
      delivery: "Eve Teslimat",
      pickup: "Gel Al",
      reservations: "Rezervasyon",
      catering: "Catering",
      viewFullMenu: "Tam Menüyü Gör",
      viewOnGoogleMaps: "Google Haritalar'da Gör",
      review: "Değerlendirme",
    },
    home: {
      hero: {
        title: "Las Vegas'da Otantik Türk Döneri",
        subtitle: "Aile tarifi, İstanbul kökleri—her gün taze hazırlanır",
      },
      featured: "Öne Çıkan Yemekler",
      featuredDishes: "Öne Çıkan Yemekler",
      testimonials: {
        title: "İnsanlar Ne Diyor",
        person1: {
          name: "Sarah L.",
          text: "Kesinlikle Vegas'taki en iyi döner! Et sulu ve lezzetliydi. Tekrar geleceğim!",
          source: "Yelp",
        },
        person2: {
          name: "Mike D.",
          text: "Geç saatlere kadar açık, gece dışarı çıktıktan sonra süper uygun. Türk ekmeği harika.",
          source: "Google",
        },
        person3: {
          name: "Jessica P.",
          text: "Falafel dürüm taze ve lezzetliydi. Arkadaş canlısı personel ve hızlı servis.",
          source: "Yelp",
        },
        person4: {
          name: "Alex K.",
          text: "Harika vejetaryen seçenekleri ve her şey helal. Baklava kesinlikle tavsiye edilir!",
          source: "Google",
        },
        person5: {
          name: "Omar H.",
          text: "Otantik Türk lezzetleri, büyük porsiyonlar ve makul fiyatlar. Döner kebap mükemmeldi.",
          source: "Yelp",
        },
      },
      story: "Hikayemiz",
      storyText:
        "İstanbul'un hareketli sokaklarından Las Vegas'ın kalbine, tutku ve gelenekle hazırlanmış otantik Türk lezzetlerini getiriyoruz.",
      halal: "%100 Helal Sertifikalı",
      halalText:
        "Tüm etler etik kaynaklardan temin edilir ve helal standartlara uygun olarak hazırlanır.",
      whyChooseUs: "Neden Bizi Seçmelisiniz?",
      aboutUs: "Hakkımızda",
      findUs: "Bizi Bulun",
      openingHours: "Açık: Her gün 10:00 - 05:00",
      features: {
        doner: {
          title: "Otantik Türk Döneri",
          description:
            "Sulu, lezzetli ve her gün taze doğranmış—tıpkı İstanbul'daki gibi.",
        },
        halal: {
          title: "%100 Helal ve Vegan Seçenekler",
          description:
            "Helal sertifikalı etler ve herkes için çeşitli vejetaryen/vegan seçenekler.",
        },
        openLate: {
          title: "Her Gün Geç Saate Kadar Açık",
          description:
            "Gece 4'te döner mi çekti canınız? Buradayız—her gün sabah 5'e kadar açığız.",
        },
        family: {
          title: "Aile İşletmesi Misafirperverliği",
          description: "Kendinizi evinizde hissettirecek sıcak, dostça hizmet.",
        },
        location: {
          title: "Vegas Strip Üzerinde",
          description:
            "Yerel halk ve ziyaretçiler için Las Vegas'ın kalbinde, uygun bir konumda.",
        },
      },
      aboutText: {
        paragraph1:
          "İstanbul Mediterranean'da hikayemiz, yemeğin sadece bir öğün değil, aile, gelenek ve birlikteliğin bir kutlaması olduğu Türkiye'nin kalbinde başlar. Tariflerimiz, Osmanlı İmparatorluğu'nun zengin tarihine dayanmakta ve İpek Yolu ile Akdeniz kıyıları boyunca canlı kültürler tarafından şekillendirilmektedir. Sunduğumuz her yemek, ailemizin mirasının ve nesilden nesile aktarılan yüzyıllık mutfak geleneklerinin bir yansımasıdır.",
        quote:
          "Yemek pişirmek ailemizin tutkusudur. İstanbul'un hareketli sokaklarından Las Vegas'taki mutfağımıza, size Türk ve Akdeniz mutfağının otantik lezzetlerini getiriyoruz.",
        paragraph2:
          "%100 Helal sertifikalı etler sunmaktan ve etik kaynak kullanımı ile geleneksel hazırlık değerlerini onurlandırmaktan gurur duyuyoruz. İstanbul Mediterranean'da, sizi aile soframıza katılmaya ve Türkiye'nin gerçek tadını deneyimlemeye davet ediyoruz—her yemeğin tarih boyunca bir yolculuk olduğu ve her misafirin aile gibi karşılandığı bir yer.",
        signature: "İstanbul Ailesi",
      },
      faq: {
        title: "Sıkça Sorulan Sorular",
        questions: [
          {
            question: "Çalışma saatleriniz nelerdir?",
            answer:
              "Her gün sabah 10:00'dan sabah 5:00'a kadar açığız ve gece geç saatlere kadar taze Türk yemekleri servis ediyoruz.",
          },
          {
            question: "Tüm yemekleriniz helal mi?",
            answer:
              "Evet, tüm etlerimiz %100 helal sertifikalıdır. Otantik helal Türk mutfağı sunmaktan gurur duyuyoruz.",
          },
          {
            question: "Vejetaryen seçenekler sunuyor musunuz?",
            answer:
              "Kesinlikle! Falafel, humus, yaprak sarma ve daha fazlası dahil olmak üzere çeşitli vejetaryen ve vegan seçeneklerimiz var.",
          },
          {
            question: "Las Vegas Strip üzerinde nerede bulunuyorsunuz?",
            answer:
              "3615 S Las Vegas Blvd #101, Las Vegas, NV 89109 adresinde, Strip üzerinde uygun bir konumda bulunuyoruz.",
          },
          {
            question: "Teslimat hizmeti sunuyor musunuz?",
            answer:
              "Evet, web sitemiz ve Uber Eats, DoorDash ve Grubhub gibi büyük teslimat platformları aracılığıyla teslimat hizmeti sunuyoruz.",
          },
        ],
      },
    },
    menu: {
      title: "Menümüz",
      subtitle: "Modern bir dokunuşla geleneksel Türk lezzetleri",
      categories: {
        doner: "Döner Kebap",
        wraps: "Dürümler",
        plates: "Tabaklar",
        sides: "Yan Ürünler",
        desserts: "Tatlılar",
        drinks: "İçecekler",
        all: "Tümü",
      },
      items: {
        doner_beef: "Dana Döner",
        doner_chicken: "Tavuk Döner",
        doner_mixed: "Karışık Döner",
        wrap_beef: "Dana Dürüm",
        wrap_chicken: "Tavuk Dürüm",
        wrap_falafel: "Falafel Dürüm",
        plate_beef: "Dana Döner Tabak",
        plate_chicken: "Tavuk Döner Tabak",
        plate_mixed: "Karışık Döner Tabak",
        plate_falafel: "Falafel Tabak",
        side_fries: "Patates Kızartması",
        side_rice: "Pilav",
        side_hummus: "Humus",
        side_salad: "Salata",
        dessert_baklava: "Baklava",
        dessert_kunefe: "Künefe",
        dessert_sutlac: "Sütlaç",
        drink_ayran: "Ayran",
        drink_tea: "Çay",
        drink_soda: "Gazlı İçecek",
        drink_water: "Su",
      },
    },
    nav: {
      home: "Ana Sayfa",
      menu: "Menü",
      about: "Hakkımızda",
      blog: "Blog",
      delivery: "Teslimat",
      contact: "İletişim",
      careers: "Kariyer",
    },
  },
  ar: {
    common: {
      home: "الرئيسية",
      menu: "القائمة",
      blog: "مدونة",
      contact: "اتصل بنا",
      orderOnline: "اطلب عبر الإنترنت",
      orderNow: "اطلب الآن",
      menu: "عرض القائمة",
      contact: "اتصل بنا",
      about: "من نحن",
      blog: "المدونة",
      faq: "الأسئلة الشائعة",
      language: "اللغة",
      hours: "ساعات العمل",
      address: "العنوان",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      copyright: "© 2025 إسطنبول المتوسط. جميع الحقوق محفوظة.",
      delivery: "التوصيل",
      pickup: "الاستلام",
      reservations: "الحجوزات",
      catering: "التموين",
      viewFullMenu: "عرض القائمة الكاملة",
      viewOnGoogleMaps: "عرض على خرائط جوجل",
      review: "تقييم",
    },
    home: {
      hero: {
        title: "شاورما تركية أصلية في لاس فيغاس",
        subtitle: "وصفة عائلية، جذور إسطنبول—يتم تحضيرها طازجة يوميًا",
      },
      featured: "الأطباق المميزة",
      featuredDishes: "الأطباق المميزة",
      testimonials: {
        title: "ماذا يقول الناس",
        person1: {
          name: "سارة ل.",
          text: "بالتأكيد أفضل شاورما في لاس فيغاس! كانت اللحمة عصيرية ولذيذة. سأعود مرة أخرى!",
          source: "Yelp",
        },
        person2: {
          name: "مايك د.",
          text: "مفتوح حتى وقت متأخر، مناسب جداً بعد قضاء ليلة خارجاً. الخبز التركي مذهل.",
          source: "Google",
        },
        person3: {
          name: "جيسيكا ب.",
          text: "لفائف الفلافل كانت طازجة ولذيذة. طاقم ودود وخدمة سريعة.",
          source: "Yelp",
        },
        person4: {
          name: "أليكس ك.",
          text: "خيارات نباتية رائعة وكل شيء حلال. أوصي بشدة بالبقلاوة!",
          source: "Google",
        },
        person5: {
          name: "عمر ح.",
          text: "نكهات تركية أصيلة، حصص كبيرة وأسعار معقولة. كانت الشاورما ممتازة.",
          source: "Yelp",
        },
      },
      story: "قصتنا",
      storyText:
        "من شوارع إسطنبول الصاخبة إلى قلب لاس فيغاس، نقدم نكهات تركية أصيلة مصنوعة بشغف وتقاليد.",
      halal: "حلال 100٪ معتمد",
      halalText: "جميع اللحوم مصدرها أخلاقي ويتم تحضيرها وفقًا لمعايير الحلال.",
      whyChooseUs: "لماذا تختارنا؟",
      aboutUs: "معلومات عنا",
      findUs: "اعثر علينا",
      openingHours: "مفتوح: 10:00 صباحًا - 5:00 صباحًا يوميًا",
      features: {
        doner: {
          title: "شاورما تركية أصلية",
          description: "عصيرية، لذيذة، وتقطع طازجة يوميًا—تمامًا مثل إسطنبول.",
        },
        halal: {
          title: "100٪ حلال وخيارات نباتية",
          description: "لحوم معتمدة حلال والكثير من الخيارات النباتية للجميع.",
        },
        openLate: {
          title: "مفتوح حتى وقت متأخر، كل يوم",
          description:
            "تشتهي الشاورما في الساعة 4 صباحًا؟ نحن هنا من أجلك—مفتوح حتى الساعة 5 صباحًا يوميًا.",
        },
        family: {
          title: "ضيافة عائلية",
          description: "خدمة دافئة وودية تجعلك تشعر وكأنك في منزلك.",
        },
        location: {
          title: "على شريط لاس فيغاس",
          description:
            "يقع في قلب لاس فيغاس بشكل ملائم للسكان المحليين والزوار.",
        },
      },
      aboutText: {
        paragraph1:
          "في إسطنبول ميديتيرينيان، تبدأ قصتنا في قلب تركيا، حيث الطعام أكثر من مجرد وجبة—إنه احتفال بالعائلة والتقاليد والتآلف. تتجذر وصفاتنا في التاريخ الغني للإمبراطورية العثمانية وتشكلت من خلال الثقافات النابضة بالحياة على طول طريق الحرير وسواحل البحر المتوسط. كل طبق نقدمه هو انعكاس لتراث عائلتنا والتقاليد الطهوية القديمة التي تناقلتها الأجيال.",
        quote:
          "الطبخ هو شغف عائلتنا. من شوارع إسطنبول الصاخبة إلى مطبخنا في لاس فيغاس، نقدم لكم النكهات الأصيلة للمطبخ التركي والمتوسطي.",
        paragraph2:
          "نحن فخورون بتقديم لحوم معتمدة 100٪ حلال واحترام قيم المصادر الأخلاقية والتحضير التقليدي. في إسطنبول ميديتيرينيان، ندعوك للانضمام إلى طاولة عائلتنا وتجربة الطعم الحقيقي لتركيا—حيث كل وجبة هي رحلة عبر التاريخ، وكل ضيف يعامل كأفراد العائلة.",
        signature: "عائلة إسطنبول",
      },
      faq: {
        title: "الأسئلة المتكررة",
        questions: [
          {
            question: "ما هي ساعات العمل الخاصة بكم؟",
            answer:
              "نحن مفتوحون يوميًا من الساعة 10:00 صباحًا حتى الساعة 5:00 صباحًا، نقدم الطعام التركي الطازج حتى وقت متأخر من الليل.",
          },
          {
            question: "هل جميع طعامكم حلال؟",
            answer:
              "نعم، جميع لحومنا معتمدة 100٪ حلال. نحن نفتخر بتقديم المأكولات التركية الحلال الأصيلة.",
          },
          {
            question: "هل تقدمون خيارات نباتية؟",
            answer:
              "بالتأكيد! لدينا مجموعة متنوعة من الخيارات النباتية بما في ذلك الفلافل والحمص وورق العنب المحشي والمزيد.",
          },
          {
            question: "أين تقعون على شريط لاس فيغاس؟",
            answer:
              "نحن نقع في 3615 S Las Vegas Blvd #101، لاس فيغاس، NV 89109، في موقع ملائم على الشريط.",
          },
          {
            question: "هل تقدمون خدمة التوصيل؟",
            answer:
              "نعم، نقدم خدمة التوصيل من خلال موقعنا الإلكتروني ومنصات التوصيل الرئيسية مثل Uber Eats وDoorDash وGrubhub.",
          },
        ],
      },
    },
    menu: {
      title: "قائمتنا",
      subtitle: "نكهات تركية تقليدية بلمسة عصرية",
      categories: {
        doner: "شاورما",
        wraps: "لفائف",
        plates: "أطباق",
        sides: "أطباق جانبية",
        desserts: "حلويات",
        drinks: "مشروبات",
        all: "الكل",
      },
      items: {
        doner_beef: "شاورما لحم",
        doner_chicken: "شاورما دجاج",
        doner_mixed: "شاورما مشكلة",
        wrap_beef: "لفائف لحم",
        wrap_chicken: "لفائف دجاج",
        wrap_falafel: "لفائف فلافل",
        plate_beef: "طبق شاورما لحم",
        plate_chicken: "طبق شاورما دجاج",
        plate_mixed: "طبق شاورما مشكلة",
        plate_falafel: "طبق فلافل",
        side_fries: "بطاطس مقلية",
        side_rice: "أرز",
        side_hummus: "حمص",
        side_salad: "سلطة",
        dessert_baklava: "بقلاوة",
        dessert_kunefe: "كنافة",
        dessert_sutlac: "أرز بالحليب",
        drink_ayran: "عيران",
        drink_tea: "شاي",
        drink_soda: "مشروبات غازية",
        drink_water: "ماء",
      },
    },
    nav: {
      home: "الرئيسية",
      menu: "القائمة",
      about: "حولنا",
      blog: "مدونة",
      delivery: "التوصيل",
      contact: "اتصل بنا",
      careers: "الوظائف",
    },
  },
  fr: {
    common: {
      home: "Accueil",
      menu: "Menu",
      blog: "Blog",
      contact: "Contact",
      orderOnline: "Commander en ligne",
      orderNow: "Commander maintenant",
      about: "À propos",
      faq: "FAQ",
      language: "Langue",
      hours: "Heures d'ouverture",
      address: "Adresse",
      phone: "Téléphone",
      email: "E-mail",
      copyright: "© 2025 Istanbul Mediterranean. Tous droits réservés.",
      delivery: "Livraison",
      pickup: "À emporter",
      reservations: "Réservations",
      catering: "Traiteur",
      viewFullMenu: "Voir le menu complet",
      viewOnGoogleMaps: "Voir sur Google Maps",
      review: "Avis",
      backToMenu: "Retour au menu",
      price: "Prix",
      addToCart: "Ajouter au panier",
      calories: "Calories",
      loading: "Chargement...",
      error: "Erreur",
      notFound: "Non trouvé",
    },
    home: {
      hero: {
        title: "Döner Turc Authentique à Las Vegas",
        subtitle:
          "Recette familiale, racines d'Istanbul—préparé frais quotidiennement",
      },
      featuredDishes: "Plats Vedettes",
      testimonials: {
        title: "Ce Que Disent Les Gens",
        person1: {
          name: "Sarah L.",
          text: "Absolument le meilleur döner à Vegas! La viande était juteuse et savoureuse. Je reviendrai!",
          source: "Yelp",
        },
        person2: {
          name: "Mike D.",
          text: "Ouvert tard, super pratique après une soirée. Le pain turc est incroyable.",
          source: "Google",
        },
        person3: {
          name: "Jessica P.",
          text: "Le wrap falafel était frais et délicieux. Personnel amical et service rapide.",
          source: "Yelp",
        },
        person4: {
          name: "Alex K.",
          text: "Excellentes options végétariennes et tout est halal. Je recommande vivement le baklava!",
          source: "Google",
        },
        person5: {
          name: "David S.",
          text: "Les portions sont généreuses et les prix sont raisonnables pour le Strip. Je reviendrai!",
          source: "Yelp",
        },
        person6: {
          name: "Maria G.",
          text: "Impeccablement propre, amical, et la nourriture est toujours fraîche. J'adore cet endroit!",
          source: "Google",
        },
      },
      story: "Notre Histoire",
      storyText:
        "Des rues animées d'Istanbul au cœur de Las Vegas, nous apportons des saveurs turques authentiques préparées avec passion et tradition.",
      halal: {
        title: "100% Certifié Halal",
        description:
          "Toutes les viandes sont d'origine éthique et préparées selon les normes halal.",
      },
      whyChooseUs: "Pourquoi Nous Choisir?",
      aboutUs: "À Propos de Nous",
      aboutText: {
        paragraph1:
          "Chez Istanbul Mediterranean, notre histoire commence au cœur de la Turquie, où la nourriture est plus qu'un repas—c'est une célébration de la famille, de la tradition et du vivre ensemble. Nos recettes sont ancrées dans la riche histoire de l'Empire ottoman et façonnées par les cultures vibrantes le long de la Route de la Soie et des côtes méditerranéennes. Chaque plat que nous servons est le reflet de l'héritage de notre famille et des traditions culinaires séculaires transmises de génération en génération.",
        quote:
          "La cuisine est la passion de notre famille. Des rues animées d'Istanbul à notre cuisine à Las Vegas, nous vous apportons les saveurs authentiques de la cuisine turque et méditerranéenne.",
        paragraph2:
          "Nous sommes fiers de servir des viandes certifiées 100% halal et d'honorer les valeurs de l'approvisionnement éthique et de la préparation traditionnelle. Chez Istanbul Mediterranean, nous vous invitons à rejoindre notre table familiale et à découvrir le vrai goût de la Turquie—où chaque repas est un voyage à travers l'histoire, et chaque invité est traité comme un membre de la famille.",
        signature: "Famille Istanbul",
      },
      findUs: {
        title: "Nous Trouver",
        address: "3615 S Las Vegas Blvd #101, Las Vegas, NV 89109",
        hours: "Ouvert: 10h00 - 5h00 du matin tous les jours",
        viewMap: "Voir sur Google Maps",
      },
      features: {
        doner: {
          title: "Döner Turc Authentique",
          description:
            "Juteux, savoureux et tranché frais quotidiennement—comme à Istanbul.",
        },
        halal: {
          title: "100% Halal et Options Véganes",
          description:
            "Viandes certifiées halal et nombreuses options végétariennes/véganes pour tous.",
        },
        openLate: {
          title: "Ouvert Tard, Tous Les Jours",
          description:
            "Envie de döner à 4h du matin? Nous sommes là—ouvert jusqu'à 5h du matin tous les jours.",
        },
        family: {
          title: "Hospitalité Familiale",
          description:
            "Service chaleureux et amical qui vous fait sentir comme chez vous.",
        },
        location: {
          title: "Sur le Strip de Vegas",
          description:
            "Idéalement situé au cœur de Las Vegas pour les locaux et les visiteurs.",
        },
      },
      socialShare: {
        title: "Meilleure Cuisine Turque à Las Vegas - Istanbul Mediterranean",
        description:
          "Döner turc authentique, shawarma et plus. Recette familiale, racines d'Istanbul—préparé frais à Las Vegas.",
      },
      faq: {
        title: "Questions Fréquemment Posées",
        questions: [
          {
            question: "Quelles sont vos heures d'ouverture?",
            answer:
              "Nous sommes ouverts tous les jours de 10h00 à 5h00 du matin, servant de la cuisine turque fraîche jusque tard dans la nuit.",
          },
          {
            question: "Toute votre nourriture est-elle halal?",
            answer:
              "Oui, toute notre viande est certifiée 100% halal. Nous sommes fiers de servir une cuisine turque halal authentique.",
          },
          {
            question: "Offrez-vous des options végétariennes?",
            answer:
              "Absolument! Nous avons une variété d'options végétariennes et véganes, y compris falafel, houmous, feuilles de vigne farcies et plus.",
          },
          {
            question: "Où êtes-vous situé sur le Strip de Las Vegas?",
            answer:
              "Nous sommes situés au 3615 S Las Vegas Blvd #101, Las Vegas, NV 89109, idéalement situé sur le Strip.",
          },
          {
            question: "Offrez-vous la livraison?",
            answer:
              "Oui, nous offrons la livraison via notre site web et les principales plateformes de livraison comme Uber Eats, DoorDash et Grubhub.",
          },
        ],
      },
    },
    menu: {
      title: "Notre Menu",
      subtitle: "Saveurs turques traditionnelles avec une touche moderne",
      categories: {
        doner: "Döner Kebab",
        wraps: "Wraps",
        plates: "Assiettes",
        sides: "Accompagnements",
        desserts: "Desserts",
        drinks: "Boissons",
        all: "Tout",
        lavashWraps: "Wraps Lavash",
        pitaSandwiches: "Sandwichs Pita",
        turkishPita: "Pita Turc",
        riceBowls: "Bols de Riz",
        saladBowls: "Bols de Salade",
        frenchFriesBowls: "Bols de Frites",
      },
      items: {
        doner_beef: "Döner de Bœuf",
        doner_chicken: "Döner de Poulet",
        doner_mixed: "Döner Mixte",
        wrap_beef: "Wrap de Bœuf",
        wrap_chicken: "Wrap de Poulet",
        wrap_falafel: "Wrap de Falafel",
        plate_beef: "Assiette de Döner de Bœuf",
        plate_chicken: "Assiette de Döner de Poulet",
        plate_mixed: "Assiette de Döner Mixte",
        plate_falafel: "Assiette de Falafel",
        side_fries: "Frites",
        side_rice: "Riz",
        side_hummus: "Houmous",
        side_salad: "Salade",
        dessert_baklava: "Baklava",
        dessert_kunefe: "Künefe",
        dessert_sutlac: "Riz au Lait",
        drink_ayran: "Ayran",
        drink_tea: "Thé Turc",
        drink_soda: "Boissons Gazeuses",
        drink_water: "Eau",
        beefLambDoner: "Döner Bœuf et Agneau",
        chickenDoner: "Döner Poulet",
        mixedDoner: "Döner Mixte",
        falafel: "Falafel",
        chikofte: "Chiköfte",
        veggieBowl: "Bol Végétarien",
        hummus: "Houmous",
        baklava: "Baklava",
        ricePudding: "Riz au Lait",
        ayran: "Ayran (Boisson au Yaourt)",
      },
      descriptions: {
        doner:
          "Viande marinée authentique à la turque, cuite lentement sur rôtisserie verticale pendant plus de 12 heures",
        falafel:
          "Falafel maison fraîchement frit avec pois chiches et épices méditerranéennes",
        served: "Servi avec légumes frais, sauces et pain chaud",
      },
    },
    nav: {
      home: "Accueil",
      menu: "Menu",
      about: "À propos",
      blog: "Blog",
      delivery: "Livraison",
      contact: "Contact",
      careers: "Carrières",
      aboutUs: "À propos",
      contactUs: "Contact",
      turkishFood: "Cuisine turque",
      halal: "Halal",
      mediterraneanRestaurant: "Restaurant méditerranéen",
      nearMe: "Halal près de moi",
      shawarma: "Shawarma",
      catering: "Traiteur",
      experience: "Expérience",
      faq: "FAQ",
      blogPosts: "Articles de blog",
    },
    footer: {
      quickLinks: "Liens rapides",
      contactInfo: "Informations de contact",
      hours: "Heures d'ouverture",
      location: "Emplacement",
      phone: "Téléphone",
      followUs: "Suivez-nous",
      allRightsReserved: "Tous droits réservés",
      privacyPolicy: "Politique de confidentialité",
      termsOfService: "Conditions d'utilisation",
      hoursText: "Tous les jours: 10h - 5h du matin",
    },
  },
  ja: {
    common: {
      home: "ホーム",
      menu: "メニュー",
      blog: "ブログ",
      contact: "お問い合わせ",
      orderOnline: "オンライン注文",
      orderNow: "今すぐ注文",
      about: "私たちについて",
      faq: "よくある質問",
      language: "言語",
      hours: "営業時間",
      address: "住所",
      phone: "電話",
      email: "メール",
      copyright: "© 2025 イスタンブール・メディテラニアン。全著作権所有。",
      delivery: "デリバリー",
      pickup: "お持ち帰り",
      reservations: "予約",
      catering: "ケータリング",
      viewFullMenu: "フルメニューを見る",
      viewOnGoogleMaps: "Googleマップで見る",
      review: "レビュー",
      backToMenu: "メニューに戻る",
      price: "価格",
      addToCart: "カートに追加",
      calories: "カロリー",
      loading: "読み込み中...",
      error: "エラー",
      notFound: "見つかりません",
    },
    home: {
      hero: {
        title: "ラスベガスで本格的なトルコのドネル",
        subtitle:
          "家族のレシピ、イスタンブールのルーツ—毎日新鮮に作られています",
      },
      featuredDishes: "おすすめ料理",
      testimonials: {
        title: "お客様の声",
        person1: {
          name: "サラ L.",
          text: "間違いなくベガスで最高のドネル！肉はジューシーで風味豊かでした。また来ます！",
          source: "Yelp",
        },
        person2: {
          name: "マイク D.",
          text: "遅くまで営業していて、夜遊びの後に超便利。トルコのパンは素晴らしい。",
          source: "Google",
        },
        person3: {
          name: "ジェシカ P.",
          text: "ファラフェルラップは新鮮で美味しかった。フレンドリーなスタッフと迅速なサービス。",
          source: "Yelp",
        },
        person4: {
          name: "アレックス K.",
          text: "素晴らしいベジタリアンオプションがあり、すべてハラールです。バクラヴァを強くお勧めします！",
          source: "Google",
        },
        person5: {
          name: "デビッド S.",
          text: "ポーションは寛大で、ストリップにしては価格が妥当です。また訪れます！",
          source: "Yelp",
        },
        person6: {
          name: "マリア G.",
          text: "非常に清潔で、フレンドリーで、食べ物はいつも新鮮です。この場所が大好き！",
          source: "Google",
        },
      },
      story: "私たちのストーリー",
      storyText:
        "イスタンブールの賑やかな通りからラスベガスの中心部まで、情熱と伝統で作られた本格的なトルコの味をお届けします。",
      halal: {
        title: "100%ハラール認証",
        description:
          "すべての肉は倫理的に調達され、ハラール基準に従って準備されています。",
      },
      whyChooseUs: "なぜ私たちを選ぶのか？",
      aboutUs: "私たちについて",
      aboutText: {
        paragraph1:
          "イスタンブール・メディテラニアンでは、私たちの物語はトルコの中心から始まります。そこでは食事は単なる食事以上のものです—それは家族、伝統、そして一体感の祝祭です。私たちのレシピは、オスマン帝国の豊かな歴史に根ざし、シルクロードと地中海沿岸の活気ある文化によって形作られています。私たちが提供する各料理は、私たちの家族の遺産と世代から世代へと受け継がれてきた何世紀もの料理の伝統の反映です。",
        quote:
          "料理は私たちの家族の情熱です。イスタンブールの賑やかな通りから、ラスベガスの私たちのキッチンまで、トルコと地中海料理の本格的な味をお届けします。",
        paragraph2:
          "私たちは100%ハラール認証の肉を提供することを誇りに思い、倫理的な調達と伝統的な準備の価値を尊重しています。イスタンブール・メディテラニアンでは、私たちの家族のテーブルに参加し、トルコの本当の味を体験することをお勧めします—すべての食事が歴史を通じた旅であり、すべてのゲストが家族のように扱われる場所です。",
        signature: "イスタンブール・ファミリー",
      },
      findUs: {
        title: "場所を見つける",
        address: "3615 S Las Vegas Blvd #101, Las Vegas, NV 89109",
        hours: "営業時間：毎日午前10時〜午前5時",
        viewMap: "Googleマップで見る",
      },
      features: {
        doner: {
          title: "本格的なトルコのドネル",
          description:
            "ジューシーで風味豊かで、毎日新鮮にカット—まるでイスタンブールのよう。",
        },
        halal: {
          title: "100%ハラール＆ビーガンオプション",
          description:
            "ハラール認証の肉と、すべての人のための豊富なベジタリアン/ビーガンの選択肢。",
        },
        openLate: {
          title: "毎日遅くまで営業",
          description:
            "午前4時にドネルが食べたい？私たちはここにいます—毎日午前5時まで営業。",
        },
        family: {
          title: "家族経営のおもてなし",
          description:
            "あなたを家にいるように感じさせる温かくフレンドリーなサービス。",
        },
        location: {
          title: "ベガスストリップに位置",
          description:
            "地元の人と訪問者のためにラスベガスの中心部に便利に位置しています。",
        },
      },
      socialShare: {
        title:
          "ラスベガスで最高のトルコ料理 - イスタンブール・メディテラニアン",
        description:
          "本格的なトルコのドネル、シャワルマなど。家族のレシピ、イスタンブールのルーツ—ラスベガスで新鮮に作られています。",
      },
      faq: {
        title: "よくある質問",
        questions: [
          {
            question: "営業時間は何時ですか？",
            answer:
              "毎日午前10時から午前5時まで営業し、深夜まで新鮮なトルコ料理を提供しています。",
          },
          {
            question: "すべての食べ物はハラールですか？",
            answer:
              "はい、すべての肉は100%ハラール認証されています。本格的なハラールトルコ料理を提供することを誇りに思っています。",
          },
          {
            question: "ベジタリアンオプションはありますか？",
            answer:
              "もちろん！ファラフェル、フムス、ぶどうの葉の詰め物など、さまざまなベジタリアンとビーガンのオプションがあります。",
          },
          {
            question: "ラスベガスストリップのどこにありますか？",
            answer:
              "私たちは3615 S Las Vegas Blvd #101, Las Vegas, NV 89109に位置し、ストリップに便利に位置しています。",
          },
          {
            question: "デリバリーサービスを提供していますか？",
            answer:
              "はい、私たちのウェブサイトとUber Eats、DoorDash、Grubhubなどの主要なデリバリープラットフォームを通じてデリバリーを提供しています。",
          },
        ],
      },
    },
    menu: {
      title: "私たちのメニュー",
      subtitle: "モダンなタッチを加えた伝統的なトルコの味",
      categories: {
        doner: "ドネルケバブ",
        wraps: "ラップ",
        plates: "プレート",
        sides: "サイド",
        desserts: "デザート",
        drinks: "飲み物",
        all: "すべて",
        lavashWraps: "ラバッシュラップ",
        pitaSandwiches: "ピタサンドイッチ",
        turkishPita: "トルコピタ",
        riceBowls: "ライスボウル",
        saladBowls: "サラダボウル",
        frenchFriesBowls: "フライドポテトボウル",
      },
      items: {
        doner_beef: "ビーフドネル",
        doner_chicken: "チキンドネル",
        doner_mixed: "ミックスドネル",
        wrap_beef: "ビーフラップ",
        wrap_chicken: "チキンラップ",
        wrap_falafel: "ファラフェルラップ",
        plate_beef: "ビーフドネルプレート",
        plate_chicken: "チキンドネルプレート",
        plate_mixed: "ミックスドネルプレート",
        plate_falafel: "ファラフェルプレート",
        side_fries: "フライドポテト",
        side_rice: "ライス",
        side_hummus: "フムス",
        side_salad: "サラダ",
        dessert_baklava: "バクラヴァ",
        dessert_kunefe: "キュネフェ",
        dessert_sutlac: "ライスプディング",
        drink_ayran: "アイラン",
        drink_tea: "トルコ茶",
        drink_soda: "ソフトドリンク",
        drink_water: "水",
        beefLambDoner: "ビーフ＆ラムドネル",
        chickenDoner: "チキンドネル",
        mixedDoner: "ミックスドネル",
        falafel: "ファラフェル",
        chikofte: "チーキョフテ",
        veggieBowl: "ベジボウル",
        hummus: "フムス",
        baklava: "バクラヴァ",
        ricePudding: "ライスプディング",
        ayran: "アイラン（ヨーグルトドリンク）",
      },
      descriptions: {
        doner:
          "垂直ロティサリーで12時間以上スローコークした本格的なトルコ風味の肉",
        falafel:
          "ひよこ豆と地中海のスパイスで作った揚げたての自家製ファラフェル",
        served: "新鮮な野菜、ソース、温かいパンと一緒に提供",
      },
    },
    nav: {
      home: "ホーム",
      menu: "メニュー",
      about: "私たちについて",
      blog: "ブログ",
      delivery: "デリバリー",
      contact: "お問い合わせ",
      careers: "採用情報",
      aboutUs: "私たちについて",
      contactUs: "お問い合わせ",
      turkishFood: "トルコ料理",
      halal: "ハラール",
      mediterraneanRestaurant: "地中海レストラン",
      nearMe: "近くのハラール料理",
      shawarma: "シャワルマ",
      catering: "ケータリング",
      experience: "体験",
      faq: "よくある質問",
      blogPosts: "ブログ記事",
    },
    footer: {
      quickLinks: "クイックリンク",
      contactInfo: "連絡先情報",
      hours: "営業時間",
      location: "場所",
      phone: "電話",
      followUs: "フォローする",
      allRightsReserved: "全著作権所有",
      privacyPolicy: "プライバシーポリシー",
      termsOfService: "利用規約",
      hoursText: "毎日：午前10時〜午前5時",
    },
  },
  es: {
    common: {
      home: "Inicio",
      menu: "Menú",
      blog: "Blog",
      contact: "Contacto",
      orderOnline: "Ordenar en línea",
      orderNow: "Ordenar Ahora",
      menu: "Ver Menú",
      contact: "Contáctenos",
      about: "Sobre Nosotros",
      blog: "Blog",
      faq: "Preguntas Frecuentes",
      language: "Idioma",
      hours: "Horario",
      address: "Dirección",
      phone: "Teléfono",
      email: "Correo Electrónico",
      copyright:
        "© 2025 Istanbul Mediterranean. Todos los derechos reservados.",
      delivery: "Entrega a Domicilio",
      pickup: "Para Llevar",
      reservations: "Reservaciones",
      catering: "Catering",
      viewFullMenu: "Ver Menú Completo",
      viewOnGoogleMaps: "Ver en Google Maps",
      review: "Reseña",
    },
    home: {
      hero: {
        title: "Auténtico Döner Turco en Las Vegas",
        subtitle:
          "Receta familiar, raíces de Estambul—preparado fresco diariamente",
      },
      featured: "Platos Destacados",
      featuredDishes: "Platos Destacados",
      testimonials: {
        title: "Lo Que Dice La Gente",
        person1: {
          name: "Sarah L.",
          text: "¡Definitivamente el mejor döner en Las Vegas! La carne estaba jugosa y sabrosa. ¡Volveré!",
          source: "Yelp",
        },
        person2: {
          name: "Mike D.",
          text: "Abierto hasta tarde, súper conveniente después de una noche de fiesta. El pan turco es increíble.",
          source: "Google",
        },
        person3: {
          name: "Jessica P.",
          text: "El wrap de falafel estaba fresco y delicioso. Personal amable y servicio rápido.",
          source: "Yelp",
        },
        person4: {
          name: "Alex K.",
          text: "Excelentes opciones vegetarianas y todo es halal. ¡Recomiendo mucho el baklava!",
          source: "Google",
        },
        person5: {
          name: "Omar H.",
          text: "Sabores turcos auténticos, porciones grandes y precios razonables. El döner kebab estaba excelente.",
          source: "Yelp",
        },
      },
      story: "Nuestra Historia",
      storyText:
        "Desde las bulliciosas calles de Estambul hasta el corazón de Las Vegas, traemos auténticos sabores turcos elaborados con pasión y tradición.",
      halal: "100% Certificado Halal",
      halalText:
        "Todas las carnes son de origen ético y preparadas de acuerdo con los estándares halal.",
      whyChooseUs: "¿Por Qué Elegirnos?",
      aboutUs: "Sobre Nosotros",
      findUs: "Encuéntranos",
      openingHours: "Abierto: 10:00 am - 5:00 am todos los días",
      features: {
        doner: {
          title: "Auténtico Döner Turco",
          description:
            "Jugoso, sabroso y cortado fresco diariamente—justo como en Estambul.",
        },
        halal: {
          title: "100% Halal y Opciones Veganas",
          description:
            "Carnes certificadas halal y muchas opciones vegetarianas/veganas para todos.",
        },
        openLate: {
          title: "Abierto Hasta Tarde, Todos Los Días",
          description:
            "¿Antojo de döner a las 4 am? Estamos aquí para ti—abierto hasta las 5 am diariamente.",
        },
        family: {
          title: "Hospitalidad Familiar",
          description:
            "Servicio cálido y amigable que te hace sentir como en casa.",
        },
        location: {
          title: "En El Strip de Las Vegas",
          description:
            "Convenientemente ubicado en el corazón de Las Vegas para locales y visitantes.",
        },
      },
      aboutText: {
        paragraph1:
          "En Istanbul Mediterranean, nuestra historia comienza en el corazón de Turquía, donde la comida es más que una simple comida—es una celebración de familia, tradición y unión. Nuestras recetas están arraigadas en la rica historia del Imperio Otomano y moldeadas por las vibrantes culturas a lo largo de la Ruta de la Seda y las costas mediterráneas. Cada plato que servimos es un reflejo del patrimonio de nuestra familia y las tradiciones culinarias centenarias transmitidas de generación en generación.",
        quote:
          "Cocinar es la pasión de nuestra familia. Desde las bulliciosas calles de Estambul hasta nuestra cocina en Las Vegas, te traemos los auténticos sabores de la cocina turca y mediterránea.",
        paragraph2:
          "Nos enorgullecemos de servir carnes 100% certificadas Halal y honrar los valores de abastecimiento ético y preparación tradicional. En Istanbul Mediterranean, te invitamos a unirte a nuestra mesa familiar y experimentar el verdadero sabor de Turquía—donde cada comida es un viaje a través de la historia, y cada invitado es tratado como familia.",
        signature: "Familia Istanbul",
      },
      faq: {
        title: "Preguntas Frecuentes",
        questions: [
          {
            question: "¿Cuáles son sus horarios de apertura?",
            answer:
              "Estamos abiertos diariamente de 10:00 AM a 5:00 AM, sirviendo comida turca fresca hasta altas horas de la noche.",
          },
          {
            question: "¿Toda su comida es halal?",
            answer:
              "Sí, toda nuestra carne es 100% certificada halal. Nos enorgullecemos de servir auténtica cocina turca halal.",
          },
          {
            question: "¿Ofrecen opciones vegetarianas?",
            answer:
              "¡Absolutamente! Tenemos una variedad de opciones vegetarianas y veganas que incluyen falafel, hummus, hojas de parra rellenas y más.",
          },
          {
            question: "¿Dónde están ubicados en el Strip de Las Vegas?",
            answer:
              "Estamos ubicados en 3615 S Las Vegas Blvd #101, Las Vegas, NV 89109, convenientemente situados en el Strip.",
          },
          {
            question: "¿Ofrecen servicio a domicilio?",
            answer:
              "Sí, ofrecemos entrega a través de nuestro sitio web y principales plataformas de entrega como Uber Eats, DoorDash y Grubhub.",
          },
        ],
      },
    },
    menu: {
      title: "Nuestro Menú",
      subtitle: "Sabores tradicionales turcos con un toque moderno",
      categories: {
        doner: "Döner Kebab",
        wraps: "Wraps",
        plates: "Platos",
        sides: "Acompañamientos",
        desserts: "Postres",
        drinks: "Bebidas",
        all: "Todo",
      },
      items: {
        doner_beef: "Döner de Ternera",
        doner_chicken: "Döner de Pollo",
        doner_mixed: "Döner Mixto",
        wrap_beef: "Wrap de Ternera",
        wrap_chicken: "Wrap de Pollo",
        wrap_falafel: "Wrap de Falafel",
        plate_beef: "Plato de Döner de Ternera",
        plate_chicken: "Plato de Döner de Pollo",
        plate_mixed: "Plato de Döner Mixto",
        plate_falafel: "Plato de Falafel",
        side_fries: "Patatas Fritas",
        side_rice: "Arroz",
        side_hummus: "Hummus",
        side_salad: "Ensalada",
        dessert_baklava: "Baklava",
        dessert_kunefe: "Kunefe",
        dessert_sutlac: "Arroz con Leche",
        drink_ayran: "Ayran",
        drink_tea: "Té",
        drink_soda: "Refrescos",
        drink_water: "Agua",
      },
    },
    nav: {
      home: "Inicio",
      menu: "Menú",
      about: "Acerca de",
      blog: "Blog",
      delivery: "Entrega",
      contact: "Contacto",
      careers: "Carreras",
    },
  },
};

/**
 * Get translation for a specific key and language
 *
 * @param {string} key - Translation key in dot notation (e.g., 'common.orderNow')
 * @param {string} language - Language code (e.g., 'en-us', 'tr')
 * @returns {string} - Translated text or fallback to English if not found
 */
export const getTranslation = (key, language = "en-us") => {
  // Normalize language codes (e.g., treat 'tr' and 'tr-tr' as equivalent)
  const languageMap = {
    tr: "tr-tr",
    "tr-tr": "tr-tr",
    en: "en-us",
    "en-us": "en-us",
    ar: "ar",
    es: "es",
    fr: "fr",
    ja: "ja",
  };
  let lang = languageMap[language] || language;

  // Default to English if language is not supported
  if (!translations[lang]) {
    console.warn(`Language ${lang} not supported, falling back to English`);
    lang = "en-us";
  }

  // Split the key by dots to navigate the translations object
  const keys = key.split(".");

  try {
    // Navigate through the translations object for the specified language
    let result = translations[lang];
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        // Try fallback to English
        throw new Error(`Key ${k} not found in ${language} translations`);
      }
    }

    return result;
  } catch (error) {
    // Try English as fallback
    try {
      let fallbackResult = translations["en-us"];
      for (const k of keys) {
        if (fallbackResult && fallbackResult[k] !== undefined) {
          fallbackResult = fallbackResult[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key; // Return the key itself as ultimate fallback
        }
      }

      return fallbackResult;
    } catch (fallbackError) {
      console.warn(`Translation key not found in any language: ${key}`);
      return key; // Return the key itself as ultimate fallback
    }
  }
};

/**
 * Debug function to log all available translations for a key
 *
 * @param {string} key - Translation key in dot notation
 */
export const debugTranslation = (key) => {
  console.group(`Debug translations for key: ${key}`);
  Object.keys(translations).forEach((lang) => {
    try {
      const value = getTranslation(key, lang);
      console.log(`${lang}: ${value}`);
    } catch (e) {
      console.log(`${lang}: NOT FOUND`);
    }
  });
  console.groupEnd();
};

export default {
  getTranslation,
  debugTranslation,
};
