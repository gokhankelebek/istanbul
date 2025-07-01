/**
 * Translation Loader Utility
 * 
 * This utility helps load the correct translations for components based on the current language.
 * It works with the language context to provide localized content.
 */

import { SUPPORTED_LANGUAGES } from './hreflangManager';

/**
 * Default translations object
 * Contains translations for all supported languages
 */
const translations = {
  'en-us': {
    common: {
      orderNow: 'Order Now',
      menu: 'View Menu',
      contact: 'Contact Us',
      about: 'About Us',
      blog: 'Blog',
      faq: 'FAQ',
      language: 'Language',
      hours: 'Opening Hours',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      copyright: '© 2025 Istanbul Mediterranean. All rights reserved.',
      delivery: 'Delivery',
      pickup: 'Pickup',
      reservations: 'Reservations',
      catering: 'Catering',
      viewFullMenu: 'View Full Menu',
      viewOnGoogleMaps: 'View on Google Maps',
      review: 'Review',
    },
    home: {
      hero: {
        title: 'Authentic Turkish Döner in Las Vegas',
        subtitle: 'Family recipe, Istanbul roots—crafted fresh daily',
      },
      featuredDishes: 'Featured Dishes',
      testimonials: {
        title: 'What People Say',
        person1: {
          name: 'Sarah L.',
          text: 'Absolutely the best doner in Vegas! The meat was juicy and flavorful. Will be back!',
          source: 'Yelp'
        },
        person2: {
          name: 'Mike D.',
          text: 'Open late, super convenient after a night out. The Turkish bread is amazing.',
          source: 'Google'
        },
        person3: {
          name: 'Jessica P.',
          text: 'Falafel wrap was fresh and delicious. Friendly staff and fast service.',
          source: 'Yelp'
        },
        person4: {
          name: 'Alex K.',
          text: 'Great vegetarian options and everything is halal. Highly recommend the baklava!',
          source: 'Google'
        },
        person5: {
          name: 'David S.',
          text: 'Portions are generous and prices are reasonable for the Strip. Will visit again!',
          source: 'Yelp'
        },
        person6: {
          name: 'Maria G.',
          text: 'Impeccably clean, friendly, and the food is always fresh. Love this place!',
          source: 'Google'
        }
      },
      story: 'Our Story',
      storyText: 'From the bustling streets of Istanbul to the heart of Las Vegas, we bring authentic Turkish flavors crafted with passion and tradition.',
      halal: {
        title: '100% Halal Certified',
        description: 'All meats are ethically sourced and prepared in accordance with halal standards.'
      },
      whyChooseUs: 'Why Choose Us?',
      aboutUs: 'About Us',
      aboutText: {
        paragraph1: 'At Istanbul Mediterranean, our story begins in the heart of Turkey, where food is more than a meal—it\'s a celebration of family, tradition, and togetherness. Our recipes are rooted in the rich history of the Ottoman Empire and shaped by the vibrant cultures along the Silk Road and Mediterranean coasts. Each dish we serve is a reflection of our family\'s heritage and the centuries-old culinary traditions passed down through generations.',
        quote: 'Cooking is our family\'s passion. From Istanbul\'s bustling streets to our kitchen in Las Vegas, we bring you the authentic flavors of Turkish and Mediterranean cuisine.',
        paragraph2: 'We are proud to serve 100% Halal-certified meats and honor the values of ethical sourcing and traditional preparation. At Istanbul Mediterranean, we invite you to join our family table and experience the true taste of Turkey—where every meal is a journey through history, and every guest is treated like family.',
        signature: 'Istanbul Family'
      },
      findUs: {
        title: 'Find Us',
        address: '3615 S Las Vegas Blvd #101, Las Vegas, NV 89109',
        hours: 'Open: 10:00 am - 5:00 am daily',
        viewMap: 'View on Google Maps'
      },
      features: {
        doner: {
          title: 'Authentic Turkish Doner',
          description: 'Juicy, flavorful, and carved fresh daily—just like Istanbul.'
        },
        halal: {
          title: '100% Halal & Vegan Options',
          description: 'Halal-certified meats and plenty of vegetarian/vegan choices for all.'
        },
        openLate: {
          title: 'Open Late, Every Day',
          description: 'Craving doner at 4am? We\'re here for you—open until 5am daily.'
        },
        family: {
          title: 'Family-Owned Hospitality',
          description: 'Warm, friendly service that makes you feel right at home.'
        },
        location: {
          title: 'On the Vegas Strip',
          description: 'Conveniently located in the heart of Las Vegas for locals & visitors.'
        }
      },
      socialShare: {
        title: 'Best Turkish Food in Las Vegas - Istanbul Mediterranean',
        description: 'Authentic Turkish doner, shawarma, and more. Family recipe, Istanbul roots—crafted fresh in Las Vegas.'
      },
      features: {
        doner: {
          title: 'Authentic Turkish Doner',
          description: 'Juicy, flavorful, and carved fresh daily—just like Istanbul.'
        },
        halal: {
          title: '100% Halal & Vegan Options',
          description: 'Halal-certified meats and plenty of vegetarian/vegan choices for all.'
        },
        openLate: {
          title: 'Open Late, Every Day',
          description: 'Craving doner at 4am? We\'re here for you—open until 5am daily.'
        },
        family: {
          title: 'Family-Owned Hospitality',
          description: 'Warm, friendly service that makes you feel right at home.'
        },
        location: {
          title: 'On the Vegas Strip',
          description: 'Conveniently located in the heart of Las Vegas for locals & visitors.'
        }
      },
      aboutText: {
        paragraph1: 'At Istanbul Mediterranean, our story begins in the heart of Turkey, where food is more than a meal—it\'s a celebration of family, tradition, and togetherness. Our recipes are rooted in the rich history of the Ottoman Empire and shaped by the vibrant cultures along the Silk Road and Mediterranean coasts. Each dish we serve is a reflection of our family\'s heritage and the centuries-old culinary traditions passed down through generations.',
        quote: 'Cooking is our family\'s passion. From Istanbul\'s bustling streets to our kitchen in Las Vegas, we bring you the authentic flavors of Turkish and Mediterranean cuisine.',
        paragraph2: 'We are proud to serve 100% Halal-certified meats and honor the values of ethical sourcing and traditional preparation. At Istanbul Mediterranean, we invite you to join our family table and experience the true taste of Turkey—where every meal is a journey through history, and every guest is treated like family.',
        signature: 'Istanbul Family'
      },
      faq: {
        title: 'Frequently Asked Questions',
        questions: [
          {
            question: 'What are your opening hours?',
            answer: 'We are open daily from 10:00 AM to 5:00 AM, serving fresh Turkish food late into the night.'
          },
          {
            question: 'Is all your food halal?',
            answer: 'Yes, all our meat is 100% halal certified. We take pride in serving authentic halal Turkish cuisine.'
          },
          {
            question: 'Do you offer vegetarian options?',
            answer: 'Absolutely! We have a variety of vegetarian and vegan options including falafel, hummus, stuffed grape leaves, and more.'
          },
          {
            question: 'Where are you located on the Las Vegas Strip?',
            answer: 'We are located at 3615 S Las Vegas Blvd #101, Las Vegas, NV 89109, conveniently situated on the Strip.'
          },
          {
            question: 'Do you offer delivery?',
            answer: 'Yes, we offer delivery through our website and major delivery platforms like Uber Eats, DoorDash, and Grubhub.'
          }
        ]
      }
    },
    menu: {
      title: 'Our Menu',
      subtitle: 'Traditional Turkish flavors with a modern twist',
      categories: {
        doner: 'Döner Kebab',
        wraps: 'Wraps',
        plates: 'Plates',
        sides: 'Sides',
        desserts: 'Desserts',
        drinks: 'Drinks',
      },
      items: {
        doner_beef: 'Beef Döner',
        doner_chicken: 'Chicken Döner',
        doner_mixed: 'Mixed Döner',
        wrap_beef: 'Beef Wrap',
        wrap_chicken: 'Chicken Wrap',
        wrap_falafel: 'Falafel Wrap',
        plate_beef: 'Beef Döner Plate',
        plate_chicken: 'Chicken Döner Plate',
        plate_mixed: 'Mixed Döner Plate',
        plate_falafel: 'Falafel Plate',
        side_fries: 'French Fries',
        side_rice: 'Rice',
        side_hummus: 'Hummus',
        side_salad: 'Salad',
        dessert_baklava: 'Baklava',
        dessert_kunefe: 'Kunefe',
        dessert_sutlac: 'Rice Pudding',
        drink_ayran: 'Ayran',
        drink_tea: 'Turkish Tea',
        drink_soda: 'Soft Drinks',
        drink_water: 'Water'
      },
    },
  },
  'tr-tr': {
    common: {
      orderNow: 'Şimdi Sipariş Ver',
      menu: 'Menüyü Gör',
      contact: 'İletişim',
      about: 'Hakkımızda',
      blog: 'Blog',
      faq: 'SSS',
      language: 'Dil',
      hours: 'Çalışma Saatleri',
      address: 'Adres',
      phone: 'Telefon',
      email: 'E-posta',
      copyright: ' 2025 Istanbul Mediterranean. Tüm hakları saklıdır.',
      delivery: 'Eve Teslimat',
      pickup: 'Gel Al',
      reservations: 'Rezervasyon',
      catering: 'Catering',
      viewFullMenu: 'Tam Menüyü Gör',
      viewOnGoogleMaps: 'Google Haritalar\'da Gör',
      review: 'Değerlendirme',
    },
    home: {
      hero: {
        title: 'Las Vegas\'da Otantik Türk Döneri',
        subtitle: 'Aile tarifi, İstanbul kökleri—her gün taze hazırlanır',
      },
      featured: 'Öne Çıkan Yemekler',
      testimonials: {
        title: 'İnsanlar Ne Diyor',
        person1: {
          name: 'Sarah L.',
          text: 'Kesinlikle Vegas\'taki en iyi döner! Et sulu ve lezzetliydi. Tekrar geleceğim!',
          source: 'Yelp'
        },
        person2: {
          name: 'Mike D.',
          text: 'Geç saatlere kadar açık, gece dışarı çıktıktan sonra süper uygun. Türk ekmeği harika.',
          source: 'Google'
        },
        person3: {
          name: 'Jessica P.',
          text: 'Falafel dürüm taze ve lezzetliydi. Arkadaş canlısı personel ve hızlı servis.',
          source: 'Yelp'
        },
        person4: {
          name: 'Alex K.',
          text: 'Harika vejetaryen seçenekleri ve her şey helal. Baklava kesinlikle tavsiye edilir!',
          source: 'Google'
        },
        person5: {
          name: 'Omar H.',
          text: 'Otantik Türk lezzetleri, büyük porsiyonlar ve makul fiyatlar. Döner kebap mükemmeldi.',
          source: 'Yelp'
        }
      },
      story: 'Hikayemiz',
      storyText: 'İstanbul\'un hareketli sokaklarından Las Vegas\'ın kalbine, tutku ve gelenekle hazırlanmış otantik Türk lezzetlerini getiriyoruz.',
      halal: '%100 Helal Sertifikalı',
      halalText: 'Tüm etler etik kaynaklardan temin edilir ve helal standartlara uygun olarak hazırlanır.',
      whyChooseUs: 'Neden Bizi Seçmelisiniz?',
      aboutUs: 'Hakkımızda',
      findUs: 'Bizi Bulun',
      openingHours: 'Açık: Her gün 10:00 - 05:00',
      features: {
        doner: {
          title: 'Otantik Türk Döneri',
          description: 'Sulu, lezzetli ve her gün taze doğranmış—tıpkı İstanbul\'daki gibi.'
        },
        halal: {
          title: '%100 Helal ve Vegan Seçenekler',
          description: 'Helal sertifikalı etler ve herkes için çeşitli vejetaryen/vegan seçenekler.'
        },
        openLate: {
          title: 'Her Gün Geç Saate Kadar Açık',
          description: 'Gece 4\'te döner mi çekti canınız? Buradayız—her gün sabah 5\'e kadar açığız.'
        },
        family: {
          title: 'Aile İşletmesi Misafirperverliği',
          description: 'Kendinizi evinizde hissettirecek sıcak, dostça hizmet.'
        },
        location: {
          title: 'Vegas Strip Üzerinde',
          description: 'Yerel halk ve ziyaretçiler için Las Vegas\'ın kalbinde, uygun bir konumda.'
        }
      },
      aboutText: {
        paragraph1: 'İstanbul Mediterranean\'da hikayemiz, yemeğin sadece bir öğün değil, aile, gelenek ve birlikteliğin bir kutlaması olduğu Türkiye\'nin kalbinde başlar. Tariflerimiz, Osmanlı İmparatorluğu\'nun zengin tarihine dayanmakta ve İpek Yolu ile Akdeniz kıyıları boyunca canlı kültürler tarafından şekillendirilmektedir. Sunduğumuz her yemek, ailemizin mirasının ve nesilden nesile aktarılan yüzyıllık mutfak geleneklerinin bir yansımasıdır.',
        quote: 'Yemek pişirmek ailemizin tutkusudur. İstanbul\'un hareketli sokaklarından Las Vegas\'taki mutfağımıza, size Türk ve Akdeniz mutfağının otantik lezzetlerini getiriyoruz.',
        paragraph2: '%100 Helal sertifikalı etler sunmaktan ve etik kaynak kullanımı ile geleneksel hazırlık değerlerini onurlandırmaktan gurur duyuyoruz. İstanbul Mediterranean\'da, sizi aile soframıza katılmaya ve Türkiye\'nin gerçek tadını deneyimlemeye davet ediyoruz—her yemeğin tarih boyunca bir yolculuk olduğu ve her misafirin aile gibi karşılandığı bir yer.',
        signature: 'İstanbul Ailesi'
      },
      faq: {
        title: 'Sıkça Sorulan Sorular',
        questions: [
          {
            question: 'Çalışma saatleriniz nelerdir?',
            answer: 'Her gün sabah 10:00\'dan sabah 5:00\'a kadar açığız ve gece geç saatlere kadar taze Türk yemekleri servis ediyoruz.'
          },
          {
            question: 'Tüm yemekleriniz helal mi?',
            answer: 'Evet, tüm etlerimiz %100 helal sertifikalıdır. Otantik helal Türk mutfağı sunmaktan gurur duyuyoruz.'
          },
          {
            question: 'Vejetaryen seçenekler sunuyor musunuz?',
            answer: 'Kesinlikle! Falafel, humus, yaprak sarma ve daha fazlası dahil olmak üzere çeşitli vejetaryen ve vegan seçeneklerimiz var.'
          },
          {
            question: 'Las Vegas Strip üzerinde nerede bulunuyorsunuz?',
            answer: '3615 S Las Vegas Blvd #101, Las Vegas, NV 89109 adresinde, Strip üzerinde uygun bir konumda bulunuyoruz.'
          },
          {
            question: 'Teslimat hizmeti sunuyor musunuz?',
            answer: 'Evet, web sitemiz ve Uber Eats, DoorDash ve Grubhub gibi büyük teslimat platformları aracılığıyla teslimat hizmeti sunuyoruz.'
          }
        ]
      }
    },
    menu: {
      title: 'Menümüz',
      subtitle: 'Modern bir dokunuşla geleneksel Türk lezzetleri',
      categories: {
        doner: 'Döner Kebap',
        wraps: 'Dürümler',
        plates: 'Tabaklar',
        sides: 'Yan Ürünler',
        desserts: 'Tatlılar',
        drinks: 'İçecekler',
      },
      items: {
        doner_beef: 'Dana Döner',
        doner_chicken: 'Tavuk Döner',
        doner_mixed: 'Karışık Döner',
        wrap_beef: 'Dana Dürüm',
        wrap_chicken: 'Tavuk Dürüm',
        wrap_falafel: 'Falafel Dürüm',
        plate_beef: 'Dana Döner Tabak',
        plate_chicken: 'Tavuk Döner Tabak',
        plate_mixed: 'Karışık Döner Tabak',
        plate_falafel: 'Falafel Tabak',
        side_fries: 'Patates Kızartması',
        side_rice: 'Pilav',
        side_hummus: 'Humus',
        side_salad: 'Salata',
        dessert_baklava: 'Baklava',
        dessert_kunefe: 'Künefe',
        dessert_sutlac: 'Sütlaç',
        drink_ayran: 'Ayran',
        drink_tea: 'Çay',
        drink_soda: 'Gazlı İçecek',
        drink_water: 'Su'
      }
    },
  },
  'ar': {
    common: {
      orderNow: 'اطلب الآن',
      menu: 'عرض القائمة',
      contact: 'اتصل بنا',
      about: 'من نحن',
      blog: 'المدونة',
      faq: 'الأسئلة الشائعة',
      language: 'اللغة',
      hours: 'ساعات العمل',
      address: 'العنوان',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      copyright: '© 2025 إسطنبول المتوسط. جميع الحقوق محفوظة.',
      delivery: 'التوصيل',
      pickup: 'الاستلام',
      reservations: 'الحجوزات',
      catering: 'التموين',
      viewFullMenu: 'عرض القائمة الكاملة',
      viewOnGoogleMaps: 'عرض على خرائط جوجل',
      review: 'تقييم',
    },
    home: {
      hero: {
        title: 'شاورما تركية أصلية في لاس فيغاس',
        subtitle: 'وصفة عائلية، جذور إسطنبول—يتم تحضيرها طازجة يوميًا',
      },
      featured: 'الأطباق المميزة',
      testimonials: {
        title: 'ماذا يقول الناس',
        person1: {
          name: 'سارة ل.',
          text: 'بالتأكيد أفضل شاورما في لاس فيغاس! كانت اللحمة عصيرية ولذيذة. سأعود مرة أخرى!',
          source: 'Yelp'
        },
        person2: {
          name: 'مايك د.',
          text: 'مفتوح حتى وقت متأخر، مناسب جداً بعد قضاء ليلة خارجاً. الخبز التركي مذهل.',
          source: 'Google'
        },
        person3: {
          name: 'جيسيكا ب.',
          text: 'لفائف الفلافل كانت طازجة ولذيذة. طاقم ودود وخدمة سريعة.',
          source: 'Yelp'
        },
        person4: {
          name: 'أليكس ك.',
          text: 'خيارات نباتية رائعة وكل شيء حلال. أوصي بشدة بالبقلاوة!',
          source: 'Google'
        },
        person5: {
          name: 'عمر ح.',
          text: 'نكهات تركية أصيلة، حصص كبيرة وأسعار معقولة. كانت الشاورما ممتازة.',
          source: 'Yelp'
        }
      },
      story: 'قصتنا',
      storyText: 'من شوارع إسطنبول الصاخبة إلى قلب لاس فيغاس، نقدم نكهات تركية أصيلة مصنوعة بشغف وتقاليد.',
      halal: 'حلال 100٪ معتمد',
      halalText: 'جميع اللحوم مصدرها أخلاقي ويتم تحضيرها وفقًا لمعايير الحلال.',
      whyChooseUs: 'لماذا تختارنا؟',
      aboutUs: 'معلومات عنا',
      findUs: 'اعثر علينا',
      openingHours: 'مفتوح: 10:00 صباحًا - 5:00 صباحًا يوميًا',
      features: {
        doner: {
          title: 'شاورما تركية أصلية',
          description: 'عصيرية، لذيذة، وتقطع طازجة يوميًا—تمامًا مثل إسطنبول.'
        },
        halal: {
          title: '100٪ حلال وخيارات نباتية',
          description: 'لحوم معتمدة حلال والكثير من الخيارات النباتية للجميع.'
        },
        openLate: {
          title: 'مفتوح حتى وقت متأخر، كل يوم',
          description: 'تشتهي الشاورما في الساعة 4 صباحًا؟ نحن هنا من أجلك—مفتوح حتى الساعة 5 صباحًا يوميًا.'
        },
        family: {
          title: 'ضيافة عائلية',
          description: 'خدمة دافئة وودية تجعلك تشعر وكأنك في منزلك.'
        },
        location: {
          title: 'على شريط لاس فيغاس',
          description: 'يقع في قلب لاس فيغاس بشكل ملائم للسكان المحليين والزوار.'
        }
      },
      aboutText: {
        paragraph1: 'في إسطنبول ميديتيرينيان، تبدأ قصتنا في قلب تركيا، حيث الطعام أكثر من مجرد وجبة—إنه احتفال بالعائلة والتقاليد والتآلف. تتجذر وصفاتنا في التاريخ الغني للإمبراطورية العثمانية وتشكلت من خلال الثقافات النابضة بالحياة على طول طريق الحرير وسواحل البحر المتوسط. كل طبق نقدمه هو انعكاس لتراث عائلتنا والتقاليد الطهوية القديمة التي تناقلتها الأجيال.',
        quote: 'الطبخ هو شغف عائلتنا. من شوارع إسطنبول الصاخبة إلى مطبخنا في لاس فيغاس، نقدم لكم النكهات الأصيلة للمطبخ التركي والمتوسطي.',
        paragraph2: 'نحن فخورون بتقديم لحوم معتمدة 100٪ حلال واحترام قيم المصادر الأخلاقية والتحضير التقليدي. في إسطنبول ميديتيرينيان، ندعوك للانضمام إلى طاولة عائلتنا وتجربة الطعم الحقيقي لتركيا—حيث كل وجبة هي رحلة عبر التاريخ، وكل ضيف يعامل كأفراد العائلة.',
        signature: 'عائلة إسطنبول'
      },
      faq: {
        title: 'الأسئلة المتكررة',
        questions: [
          {
            question: 'ما هي ساعات العمل الخاصة بكم؟',
            answer: 'نحن مفتوحون يوميًا من الساعة 10:00 صباحًا حتى الساعة 5:00 صباحًا، نقدم الطعام التركي الطازج حتى وقت متأخر من الليل.'
          },
          {
            question: 'هل جميع طعامكم حلال؟',
            answer: 'نعم، جميع لحومنا معتمدة 100٪ حلال. نحن نفتخر بتقديم المأكولات التركية الحلال الأصيلة.'
          },
          {
            question: 'هل تقدمون خيارات نباتية؟',
            answer: 'بالتأكيد! لدينا مجموعة متنوعة من الخيارات النباتية بما في ذلك الفلافل والحمص وورق العنب المحشي والمزيد.'
          },
          {
            question: 'أين تقعون على شريط لاس فيغاس؟',
            answer: 'نحن نقع في 3615 S Las Vegas Blvd #101، لاس فيغاس، NV 89109، في موقع ملائم على الشريط.'
          },
          {
            question: 'هل تقدمون خدمة التوصيل؟',
            answer: 'نعم، نقدم خدمة التوصيل من خلال موقعنا الإلكتروني ومنصات التوصيل الرئيسية مثل Uber Eats وDoorDash وGrubhub.'
          }
        ]
      }
    },
    menu: {
      title: 'قائمتنا',
      subtitle: 'نكهات تركية تقليدية بلمسة عصرية',
      categories: {
        doner: 'شاورما',
        wraps: 'لفائف',
        plates: 'أطباق',
        sides: 'أطباق جانبية',
        desserts: 'حلويات',
        drinks: 'مشروبات',
      },
      items: {
        doner_beef: 'شاورما لحم',
        doner_chicken: 'شاورما دجاج',
        doner_mixed: 'شاورما مشكلة',
        wrap_beef: 'لفائف لحم',
        wrap_chicken: 'لفائف دجاج',
        wrap_falafel: 'لفائف فلافل',
        plate_beef: 'طبق شاورما لحم',
        plate_chicken: 'طبق شاورما دجاج',
        plate_mixed: 'طبق شاورما مشكلة',
        plate_falafel: 'طبق فلافل',
        side_fries: 'بطاطس مقلية',
        side_rice: 'أرز',
        side_hummus: 'حمص',
        side_salad: 'سلطة',
        dessert_baklava: 'بقلاوة',
        dessert_kunefe: 'كنافة',
        dessert_sutlac: 'أرز بالحليب',
        drink_ayran: 'عيران',
        drink_tea: 'شاي',
        drink_soda: 'مشروبات غازية',
        drink_water: 'ماء'
      }
    },
  },
  'es': {
    common: {
      orderNow: 'Ordenar Ahora',
      menu: 'Ver Menú',
      contact: 'Contáctenos',
      about: 'Sobre Nosotros',
      blog: 'Blog',
      faq: 'Preguntas Frecuentes',
      language: 'Idioma',
      hours: 'Horario',
      address: 'Dirección',
      phone: 'Teléfono',
      email: 'Correo Electrónico',
      copyright: '© 2025 Istanbul Mediterranean. Todos los derechos reservados.',
      delivery: 'Entrega a Domicilio',
      pickup: 'Para Llevar',
      reservations: 'Reservaciones',
      catering: 'Catering',
      viewFullMenu: 'Ver Menú Completo',
      viewOnGoogleMaps: 'Ver en Google Maps',
      review: 'Reseña',
    },
    home: {
      hero: {
        title: 'Auténtico Döner Turco en Las Vegas',
        subtitle: 'Receta familiar, raíces de Estambul—preparado fresco diariamente',
      },
      featured: 'Platos Destacados',
      testimonials: {
        title: 'Lo Que Dice La Gente',
        person1: {
          name: 'Sarah L.',
          text: '¡Definitivamente el mejor döner en Las Vegas! La carne estaba jugosa y sabrosa. ¡Volveré!',
          source: 'Yelp'
        },
        person2: {
          name: 'Mike D.',
          text: 'Abierto hasta tarde, súper conveniente después de una noche de fiesta. El pan turco es increíble.',
          source: 'Google'
        },
        person3: {
          name: 'Jessica P.',
          text: 'El wrap de falafel estaba fresco y delicioso. Personal amable y servicio rápido.',
          source: 'Yelp'
        },
        person4: {
          name: 'Alex K.',
          text: 'Excelentes opciones vegetarianas y todo es halal. ¡Recomiendo mucho el baklava!',
          source: 'Google'
        },
        person5: {
          name: 'Omar H.',
          text: 'Sabores turcos auténticos, porciones grandes y precios razonables. El döner kebab estaba excelente.',
          source: 'Yelp'
        }
      },
      story: 'Nuestra Historia',
      storyText: 'Desde las bulliciosas calles de Estambul hasta el corazón de Las Vegas, traemos auténticos sabores turcos elaborados con pasión y tradición.',
      halal: '100% Certificado Halal',
      halalText: 'Todas las carnes son de origen ético y preparadas de acuerdo con los estándares halal.',
      whyChooseUs: '¿Por Qué Elegirnos?',
      aboutUs: 'Sobre Nosotros',
      findUs: 'Encuéntranos',
      openingHours: 'Abierto: 10:00 am - 5:00 am todos los días',
      features: {
        doner: {
          title: 'Auténtico Döner Turco',
          description: 'Jugoso, sabroso y cortado fresco diariamente—justo como en Estambul.'
        },
        halal: {
          title: '100% Halal y Opciones Veganas',
          description: 'Carnes certificadas halal y muchas opciones vegetarianas/veganas para todos.'
        },
        openLate: {
          title: 'Abierto Hasta Tarde, Todos Los Días',
          description: '¿Antojo de döner a las 4 am? Estamos aquí para ti—abierto hasta las 5 am diariamente.'
        },
        family: {
          title: 'Hospitalidad Familiar',
          description: 'Servicio cálido y amigable que te hace sentir como en casa.'
        },
        location: {
          title: 'En El Strip de Las Vegas',
          description: 'Convenientemente ubicado en el corazón de Las Vegas para locales y visitantes.'
        }
      },
      aboutText: {
        paragraph1: 'En Istanbul Mediterranean, nuestra historia comienza en el corazón de Turquía, donde la comida es más que una simple comida—es una celebración de familia, tradición y unión. Nuestras recetas están arraigadas en la rica historia del Imperio Otomano y moldeadas por las vibrantes culturas a lo largo de la Ruta de la Seda y las costas mediterráneas. Cada plato que servimos es un reflejo del patrimonio de nuestra familia y las tradiciones culinarias centenarias transmitidas de generación en generación.',
        quote: 'Cocinar es la pasión de nuestra familia. Desde las bulliciosas calles de Estambul hasta nuestra cocina en Las Vegas, te traemos los auténticos sabores de la cocina turca y mediterránea.',
        paragraph2: 'Nos enorgullecemos de servir carnes 100% certificadas Halal y honrar los valores de abastecimiento ético y preparación tradicional. En Istanbul Mediterranean, te invitamos a unirte a nuestra mesa familiar y experimentar el verdadero sabor de Turquía—donde cada comida es un viaje a través de la historia, y cada invitado es tratado como familia.',
        signature: 'Familia Istanbul'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        questions: [
          {
            question: '¿Cuáles son sus horarios de apertura?',
            answer: 'Estamos abiertos diariamente de 10:00 AM a 5:00 AM, sirviendo comida turca fresca hasta altas horas de la noche.'
          },
          {
            question: '¿Toda su comida es halal?',
            answer: 'Sí, toda nuestra carne es 100% certificada halal. Nos enorgullecemos de servir auténtica cocina turca halal.'
          },
          {
            question: '¿Ofrecen opciones vegetarianas?',
            answer: '¡Absolutamente! Tenemos una variedad de opciones vegetarianas y veganas que incluyen falafel, hummus, hojas de parra rellenas y más.'
          },
          {
            question: '¿Dónde están ubicados en el Strip de Las Vegas?',
            answer: 'Estamos ubicados en 3615 S Las Vegas Blvd #101, Las Vegas, NV 89109, convenientemente situados en el Strip.'
          },
          {
            question: '¿Ofrecen servicio a domicilio?',
            answer: 'Sí, ofrecemos entrega a través de nuestro sitio web y principales plataformas de entrega como Uber Eats, DoorDash y Grubhub.'
          }
        ]
      }
    },
    menu: {
      title: 'Nuestro Menú',
      subtitle: 'Sabores tradicionales turcos con un toque moderno',
      categories: {
        doner: 'Döner Kebab',
        wraps: 'Wraps',
        plates: 'Platos',
        sides: 'Acompañamientos',
        desserts: 'Postres',
        drinks: 'Bebidas',
      },
      items: {
        doner_beef: 'Döner de Ternera',
        doner_chicken: 'Döner de Pollo',
        doner_mixed: 'Döner Mixto',
        wrap_beef: 'Wrap de Ternera',
        wrap_chicken: 'Wrap de Pollo',
        wrap_falafel: 'Wrap de Falafel',
        plate_beef: 'Plato de Döner de Ternera',
        plate_chicken: 'Plato de Döner de Pollo',
        plate_mixed: 'Plato de Döner Mixto',
        plate_falafel: 'Plato de Falafel',
        side_fries: 'Patatas Fritas',
        side_rice: 'Arroz',
        side_hummus: 'Hummus',
        side_salad: 'Ensalada',
        dessert_baklava: 'Baklava',
        dessert_kunefe: 'Kunefe',
        dessert_sutlac: 'Arroz con Leche',
        drink_ayran: 'Ayran',
        drink_tea: 'Té',
        drink_soda: 'Refrescos',
        drink_water: 'Agua'
      }
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
export const getTranslation = (key, language = 'en-us') => {
  // Default to English if language is not supported
  if (!translations[language]) {
    console.warn(`Language ${language} not supported, falling back to English`);
    language = 'en-us';
  }
  
  // Split the key by dots to navigate the translations object
  const keys = key.split('.');
  
  try {
    // Navigate through the translations object for the specified language
    let result = translations[language];
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
      let fallbackResult = translations['en-us'];
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
  Object.keys(translations).forEach(lang => {
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
  debugTranslation
};
