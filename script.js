/* ============================================================
   LAVISH GLOBAL EXIM — JavaScript
   Clean Modern Interactive Frontend & Comprehensive RFQ System
   ============================================================ */

// ── Navbar scroll effect ─────────────────────────────────────
const navbar    = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 50);
  backToTop.classList.toggle('visible', y > 400);
}, { passive: true });

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Mobile Hamburger & Navigation Engine ──────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  function closeMobileNav() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMobileNav() {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileNav);

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMobileNav);
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMobileNav();
    }
  });

  // Reset body overflow if user resizes back to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
      closeMobileNav();
    }
  }, { passive: true });
}

// ── Particles for Hero overlay ───────────────────────────────
(function createParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;animation-delay:${Math.random()*15}s;animation-duration:${Math.random()*15+10}s;`;
    c.appendChild(p);
  }
})();

// ── Hero Background Slider (from boldexportimport.com) ────────
(function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  const prev   = document.getElementById('heroPrevBtn');
  const next   = document.getElementById('heroNextBtn');
  if (!slides.length) return;

  let current = 0;
  let timer   = null;
  const delay = 5000;

  function showSlide(index) {
    if (index < 0) current = slides.length - 1;
    else if (index >= slides.length) current = 0;
    else current = index;

    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function prevSlide() {
    showSlide(current - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(nextSlide, delay);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  if (next) {
    next.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prev) {
    prev.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      showSlide(idx);
      startAutoplay();
    });
  });

  const heroSec = document.getElementById('home');
  if (heroSec) {
    heroSec.addEventListener('mouseenter', stopAutoplay);
    heroSec.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
})();

// ── Counter animation ─────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const start  = performance.now();
  const dur    = 2000;
  const run = now => {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target);
    if (p < 1) requestAnimationFrame(run);
    else el.textContent = target;
  };
  requestAnimationFrame(run);
}

let countered = false;
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !countered) {
      countered = true;
      document.querySelectorAll('.stat-num').forEach(animateCounter);
    }
  }, { threshold: 0.5 }).observe(statsEl);
}

// ── Scroll reveal ─────────────────────────────────────────────
const revealItems = document.querySelectorAll(
  '.product-card, .feature-card, .process-step, .about-grid, .contact-grid, .about-card, .port-card, .incoterm-card, .cstrip-item'
);
revealItems.forEach(el => el.classList.add('reveal'));
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.08 });
revealItems.forEach(el => revealObs.observe(el));

// ── Product filter tabs ───────────────────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Active nav highlight on scroll (for local sections) ────────
const sections = document.querySelectorAll('section[id]');
if (sections.length > 0) {
  sections.forEach(s => {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => {
          const href = a.getAttribute('href') || '';
          if (href.startsWith('#')) {
            if (href === `#${s.id}`) {
              a.style.color = 'var(--gold-bright)';
            } else {
              a.style.color = '';
            }
          }
        });
      }
    }, { threshold: 0.35 }).observe(s);
  });
}

// ── Smooth scroll for anchors ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── 3D tilt on product cards ──────────────────────────────────
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    card.style.transform = `perspective(900px) rotateX(${((y-cy)/cy)*-5}deg) rotateY(${((x-cx)/cx)*5}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});


/* ============================================================
   KAVRI EXIM STYLE COMPREHENSIVE RFQ SYSTEM & SEAPORT ENGINE
   ============================================================ */

// 1. Destination Country to Exact Discharge Seaport UN/LOCODE Directory (Kavri Exim Global Ports Reference)
const DESTINATION_PORTS = {
  "UAE": [
    "Jebel Ali Port, Dubai (AEJEA)",
    "Khalifa Port, Abu Dhabi (AEKHL)",
    "Port Khalid, Sharjah (AEPKH)",
    "Fujairah Port (AEFJR)",
    "Ajman Port (AEAJM)",
    "Others (Specify Port)"
  ],
  "Saudi Arabia": [
    "Jeddah Islamic Port (SAJED)",
    "King Abdulaziz Port, Dammam (SADMM)",
    "King Abdullah Port, Rabigh (SAKAP)",
    "Jubail Commercial Port (SAJUB)",
    "Yanbu Commercial Port (SAYNB)",
    "Others (Specify Port)"
  ],
  "Qatar": [
    "Hamad Port, Doha (QAHMD)",
    "Ras Laffan (QARLF)",
    "Mesaieed (QAMSD)",
    "Others (Specify Port)"
  ],
  "Oman": [
    "Port of Sohar (OMSOH)",
    "Port of Salalah (OMSLL)",
    "Port Sultan Qaboos, Muscat (OMMSQ)",
    "Others (Specify Port)"
  ],
  "Kuwait": [
    "Shuwaikh Port (KWSHU)",
    "Shuaiba Port (KWSAA)",
    "Others (Specify Port)"
  ],
  "Bahrain": [
    "Khalifa Bin Salman Port (BHKBS)",
    "Mina Salman (BHMIN)",
    "Others (Specify Port)"
  ],
  "USA": [
    "New York / New Jersey (USNYC)",
    "Los Angeles / Long Beach (USLAX / USLGB)",
    "Houston, Texas (USHOU)",
    "Savannah, Georgia (USSAV)",
    "Seattle / Tacoma (USSEA)",
    "Miami, Florida (USMIA)",
    "Norfolk / Hampton Roads, Virginia (USORF)",
    "Oakland, California (USOAK)",
    "Charleston, South Carolina (USCHS)",
    "Others (Specify Port)"
  ],
  "UK": [
    "Port of Felixstowe (GBFXT)",
    "Port of Southampton (GBSOU)",
    "London Gateway / Tilbury (GBLON)",
    "Liverpool (GBLIV)",
    "Immingham (GBIMM)",
    "Others (Specify Port)"
  ],
  "Germany": [
    "Port of Hamburg (DEHAM)",
    "Bremerhaven (DEBRV)",
    "Wilhelmshaven (JadeWeserPort) (DEWVN)",
    "Duisburg (Inland Marine Hub) (DEDUI)",
    "Others (Specify Port)"
  ],
  "Netherlands": [
    "Port of Rotterdam (NLRTM)",
    "Port of Amsterdam (NLAMS)",
    "Moerdijk (NLMOE)",
    "Others (Specify Port)"
  ],
  "Belgium": [
    "Port of Antwerp-Bruges (BEANR)",
    "Port of Zeebrugge (BEZEE)",
    "Ghent (BEGNE)",
    "Others (Specify Port)"
  ],
  "France": [
    "Port of Le Havre (FRLEH)",
    "Marseille / Fos-sur-Mer (FRFOS)",
    "Dunkirk (FRDKK)",
    "Others (Specify Port)"
  ],
  "Italy": [
    "Port of Genoa (ITGOA)",
    "Gioia Tauro (ITGIT)",
    "La Spezia (ITSPE)",
    "Trieste (ITTRS)",
    "Livorno (ITLIV)",
    "Others (Specify Port)"
  ],
  "Spain": [
    "Port of Valencia (ESVLC)",
    "Port of Algeciras (ESALG)",
    "Port of Barcelona (ESBCN)",
    "Bilbao (ESBIO)",
    "Others (Specify Port)"
  ],
  "Turkey": [
    "Mersin International Port (TRMER)",
    "Istanbul / Ambarli (TRIST)",
    "Izmir Port (TRIZM)",
    "Gebze / Evyap (TREVY)",
    "Others (Specify Port)"
  ],
  "Canada": [
    "Port of Vancouver, BC (CAVAN)",
    "Port of Montreal, QC (CAMTR)",
    "Prince Rupert, BC (CAPRR)",
    "Halifax Port, NS (CAHAL)",
    "Toronto (Inland Marine Terminal) (CATOR)",
    "Others (Specify Port)"
  ],
  "Australia": [
    "Port of Melbourne (AUMEL)",
    "Port Botany, Sydney (AUSYD)",
    "Port of Brisbane (AUBNE)",
    "Fremantle Port, Perth (AUFRE)",
    "Adelaide (AUADL)",
    "Others (Specify Port)"
  ],
  "New Zealand": [
    "Port of Auckland (NZAKL)",
    "Port of Tauranga (NZTRG)",
    "Lyttelton / Christchurch (NZLYT)",
    "Others (Specify Port)"
  ],
  "Singapore": [
    "Port of Singapore (PSA) (SGSIN)",
    "Jurong Port (SGJUR)",
    "Others (Specify Port)"
  ],
  "Malaysia": [
    "Port Klang (Westport / Northport) (MYPKG)",
    "Port of Tanjung Pelepas - PTP (MYTPP)",
    "Penang Port (MYPEN)",
    "Pasir Gudang, Johor (MYPGU)",
    "Kuantan Port (MYKUA)",
    "Others (Specify Port)"
  ],
  "Indonesia": [
    "Tanjung Priok, Jakarta (IDTPP)",
    "Tanjung Perak, Surabaya (IDTPS)",
    "Belawan Port, Medan (IDBLW)",
    "Tanjung Emas, Semarang (IDSRG)",
    "Makassar (Soekarno-Hatta) (IDMAK)",
    "Others (Specify Port)"
  ],
  "Thailand": [
    "Laem Chabang Port (THLCH)",
    "Bangkok Port (THBKK)",
    "Map Ta Phut (THMAT)",
    "Others (Specify Port)"
  ],
  "Vietnam": [
    "Cat Lai / Ho Chi Minh City (VNSGN)",
    "Cai Mep International Terminal (VNCMT)",
    "Hai Phong (VNHPH)",
    "Da Nang (VNDAD)",
    "Others (Specify Port)"
  ],
  "Japan": [
    "Tokyo Port (JPTYO)",
    "Yokohama (JPYOK)",
    "Kobe Port (JPUKB)",
    "Osaka Port (JPOSA)",
    "Nagoya Port (JPNGO)",
    "Others (Specify Port)"
  ],
  "South Korea": [
    "Busan Port (KRPUS)",
    "Incheon Port (KRINC)",
    "Gwangyang (KRKAN)",
    "Pyeongtaek (KRPTK)",
    "Others (Specify Port)"
  ],
  "China": [
    "Shanghai Port (CNSHA)",
    "Ningbo-Zhoushan Port (CNNGB)",
    "Shenzhen (Yantian / Shekou) (CNSZX)",
    "Qingdao Port (CNTAO)",
    "Guangzhou / Nansha (CNGZG)",
    "Tianjin / Xingang (CNTSN)",
    "Xiamen Port (CNXMN)",
    "Dalian Port (CNDLC)",
    "Others (Specify Port)"
  ],
  "Sri Lanka": [
    "Colombo Port (LKCMB)",
    "Hambantota International Port (LKHRI)",
    "Trincomalee Port (LKTRR)",
    "Others (Specify Port)"
  ],
  "Bangladesh": [
    "Chittagong / Chattogram Port (BDCGP)",
    "Mongla Port (BDMGL)",
    "Payra Port (BDPAY)",
    "Others (Specify Port)"
  ],
  "South Africa": [
    "Port of Durban (ZADUR)",
    "Port of Cape Town (ZACPT)",
    "Port Elizabeth / Ngqura (ZAPLZ)",
    "Coega (ZAZBA)",
    "Others (Specify Port)"
  ],
  "Egypt": [
    "Port Said (East/West) (EGPSD)",
    "Alexandria Port (EGALY)",
    "Damietta Port (EGDAM)",
    "Ain Sokhna (EGSOK)",
    "Others (Specify Port)"
  ],
  "Brazil": [
    "Port of Santos (BRSSZ)",
    "Paranaguá Port (BRPNG)",
    "Rio de Janeiro (BRRIO)",
    "Itajaí (BRITJ)",
    "Others (Specify Port)"
  ],
  "Mexico": [
    "Manzanillo Port (MXZLO)",
    "Veracruz Port (MXVER)",
    "Lázaro Cárdenas (MXLZC)",
    "Altamira Port (MXATM)",
    "Others (Specify Port)"
  ],
  "Others": [
    "Others (Specify Custom Port)"
  ]
};

// 2. Product Line Cascades: Commodities and Export Technical Grades (Kavri Exim Specification)
const COMMODITY_DATA = {
  "Spices": {
    "Alleppey Green Cardamom (Elettaria Cardamomum)": [
      "AGEB — Alleppey Green Extra Bold (8mm+ Sortex Graded)",
      "AGB — Alleppey Green Bold (7.5mm - 8mm)",
      "AGS — Alleppey Green Superior (7mm - 7.5mm)",
      "AGM — Alleppey Green Medium (6.5mm - 7mm)",
      "Green Cardamom Seeds / Decorticated (Sortex Cleaned)",
      "Custom / Others (Specify Grade)"
    ],
    "Tellicherry & Malabar Black Pepper (Piper Nigrum)": [
      "TGSEB — Tellicherry Garbled Special Extra Bold (4.75mm+ Pinhead Free)",
      "TGM — Tellicherry Garbled Extra Bold (4.25mm+)",
      "MG-1 — Malabar Garbled (550+ GL Density)",
      "Kolli Hills High-Piperine Black Pepper (Piperine > 6.5%)",
      "Steam-Sterilized Coarse Ground & Crushed Black Pepper (20–40 Mesh)",
      "Custom / Others (Specify Grade)"
    ],
    "GI-Certified Erode & Salem Turmeric (Curcuma Longa)": [
      "Erode Double Polished Finger (Curcumin 3.0% - 3.5%, GI Certified)",
      "Salem Golden Yellow Finger (Curcumin 4.5% - 5.5% High Curcumin)",
      "Erode & Salem Polished Turmeric Bulbs (Gatha / Round)",
      "Pure Steam-Sterilized Ground Turmeric Powder (Sortex Cleaned, Destoned)",
      "Turmeric Splits / Industrial Extraction Grade",
      "Custom / Others (Specify Grade)"
    ],
    "Red Chilli & Paprika (Capsicum Annuum)": [
      "Teja S17 Stemless (High Heat 75,000+ SHU, Bright Red)",
      "S4 Sannam Stemless / With Stem (Medium Heat 25,000–35,000 SHU)",
      "Byadgi Whole Chilli (Deep Red ASTA Color 120+, Low Pungency)",
      "Crushed Chilli Flakes / Pizza Flakes with Seeds (Heat Controlled)",
      "Kashmiri Whole Chilli & Fine Mild Red Powder",
      "Custom / Others (Specify Grade)"
    ],
    "Cumin, Coriander & Fennel Seeds": [
      "Singapore Quality Whole Cumin (99% Purity, Machine Cleaned)",
      "Europe Quality Whole Cumin (99.5% Purity, Sortex Cleaned)",
      "Eagle Quality Green Coriander Whole (Kaveri Basin)",
      "Scooter Quality Coriander Whole",
      "Lucknowi Sweet Green Fennel Seeds (Saunf 99%+)",
      "Custom / Others (Specify Grade)"
    ],
    "Whole Plantation Spices (Cloves, Nutmeg, Cinnamon)": [
      "Lal Pari Quality Handpicked Whole Cloves (Zanzibar / Madagascar Standard)",
      "Whole Indian Nutmeg with Shell / Shelled (ABCD Grade)",
      "Golden Yellow Mace Flowers (Whole Flower Blades)",
      "Ceylon Cinnamon Quills (Alba / C5 Special Export Grade)",
      "Whole Star Anise (Autumn Crop, 8-Point Intact)",
      "Green Fenugreek / Methi Seeds (Machine Cleaned)",
      "Custom / Others (Specify Grade)"
    ]
  },
  "Handcrafts": {
    "Traditional Heritage Brassware & Sacred Art": [
      "Lost-Wax Cast Heritage Brass Temple Idols & Deities",
      "Traditional Antique Brass Urli Floating Flower Bowls (10–24 inch)",
      "Handcrafted Peacock Hanging Diya & Temple Oil Lamps",
      "Carved Brass Pooja Bells, Incense Burners & Trays",
      "Cast Brass Traditional Heritage Sculptures & Wall Hangings",
      "Custom / Others (Specify Dimensions & Finish)"
    ],
    "Hand-Carved Teakwood & Sheesham Keepsake Chests": [
      "Antique Brass Inlay Sheesham Box (10x6x4 in with Latch)",
      "Hand-Carved Floral Rosewood Jewelry Box with Velvet Lining",
      "Hand-Carved Teakwood Decorative Wall Relief Panels",
      "Multi-Compartment Wooden Keepsake Chest with Secret Lock",
      "Custom Laser Engraved / OEM Dimensions & Branding"
    ],
    "Artisanal Wooden Kitchen Utilities & Tableware": [
      "Teakwood Serving Platter with Cast Brass Handles",
      "Sheesham Spice Box (9-Compartment Traditional Masala Dabba)",
      "Hand-Turned Rosewood Salad Bowls & Server Spoon Pairs",
      "Handcrafted Wooden Trivets, Coaster Sets & Tissue Holders",
      "Custom Teak / Acacia Wood Kitchenware"
    ],
    "Architectural Terracotta, Clay Pottery & Planters": [
      "Hand-Molded Architectural Terracotta Decorative Urns",
      "Indoor & Outdoor Unglazed Clay Garden Planters",
      "Traditional Clay Cooking Handi Pots & Water Coolers",
      "Custom Terracotta Heritage Murals & Relief Pottery"
    ],
    "Artisanal Pure Copper & Stone Inlay Decor": [
      "Hammered 100% Pure Ayurvedic Copper Water Pitcher & Tumbler Sets",
      "Pietra Dura Inlay White Marble Coasters, Trivets & Platters",
      "Hand-Carved Soapstone Floral Aroma Oil Burners & Tea-light Holders",
      "Custom Marble & Copper Artisan Decor"
    ]
  },
  "Textiles": {
    "100% Combed Cotton T-Shirts & Knitted Apparel": [
      "180 GSM Single Jersey Bio-Washed Combed Cotton Crewneck",
      "220 GSM Heavyweight French Terry Oversized Drop-Shoulder Tee",
      "160 GSM Lightweight Summer Combed Cotton T-Shirt",
      "240 GSM Pique Knit Polo Shirts with Ribbed Collar",
      "Custom OEM Screen Print, High-Density Print & Pantone Reactive Dye",
      "Custom / Others (Specify GSM & Cut)"
    ],
    "Export Terry Bath Towels & Luxury Hotel Linens": [
      "600 GSM Ring-Spun Combed Cotton Luxury Bath Towel (70x140 cm)",
      "500 GSM Zero-Twist Ultra Plush Hotel Bath Sheet (90x150 cm)",
      "400 GSM Quick-Dry Pool / Spa Cabana Stripe Towel",
      "Waffle Weave Cotton Bath Robes & Matching Hand Towel Sets",
      "Custom Jacquard Woven Border & Woven Hotel Brand Label"
    ],
    "Luxury Cotton Bedsheets, Duvets & Home Linens": [
      "300–400 Thread Count (TC) Pure Cotton Sateen Bedsheet Sets",
      "500–600 TC Egyptian & Indian Long-Staple Cotton Percale Hotel Sheets",
      "Duvet Covers, Pillow Shams & Fitted Sheet Program",
      "Woven Cotton Tablecloths, Table Runners & 100% Cotton Dining Napkins",
      "Custom / Others (Specify TC & Dimensions)"
    ],
    "Cotton Kitchen Linens & Heavy Canvas Bags": [
      "Waffle Weave Pure Cotton Kitchen Dish Towels (300 GSM)",
      "Heavyweight 100% Cotton Canvas Tote Bags (280–340 GSM)",
      "Calico / Muslin Drawstring Produce & Storage Bags",
      "Custom OEM Screen Printed Canvas Merchandise Bags"
    ],
    "Woven Grey Fabric Rolls & Knitted Mill Fabrics": [
      "Single Jersey Knitted Fabric Rolls (Raw Greige & Bio-Polished)",
      "100% Cotton Poplin, Twill & Oxford Woven Fabric Rolls",
      "2x2 Rib Knit Collar & Cuff Tubular Rolls",
      "Custom Yarn-Dyed Checks & Stripes Mill Fabric"
    ]
  },
  "Bamboo": {
    "Eco-Friendly Bamboo Toothbrushes & Dental Sets": [
      "Adult Wave Charcoal Bristles (BPA-Free DuPont Tynex Nylon)",
      "Child Soft Rounded Nylon-6 Pastel Bristles",
      "Flat Ergonomic Handle with Laser Engraved Brand Logo",
      "Round Cylindrical Handle with 100% Castor Bean Oil Bristles",
      "Custom Retail Kraft Box Packaging & Travel Bamboo Cases"
    ],
    "Handcrafted Neem Wood & Bamboo Grooming Combs": [
      "Dual-Tooth Wide Handle Anti-Static Pure Neem Comb",
      "Pocket Beard & Fine Hair Detangling Bamboo Comb",
      "Bamboo Paddle Hairbrush with Wooden Bristles & Rubber Cushion",
      "Custom / Others (Specify Model)"
    ],
    "Bamboo Corporate Stationery & Executive Gifts": [
      "Bamboo Barrel Ballpoint Pen with Solid Brass Clip (Refillable)",
      "Spiral Bamboo Hardcover Journal with Recycled Cotton Paper",
      "Bamboo Desk Organizer with Wireless Charging Pad Dock",
      "Custom Laser Engraved Corporate Gift Sets in Kraft Gift Box"
    ],
    "Bamboo Kitchenware, Travel Cutlery & Utility": [
      "4-Piece Bamboo Cutlery Set (Fork, Knife, Spoon, Straw) in Organic Cotton Pouch",
      "Solid Bamboo End-Grain Chopping & Serving Board (ISPM-15)",
      "Reusable Bamboo Drinking Straws with Coir Cleaning Brush",
      "Bamboo Soap Dishes & Bathroom Storage Racks"
    ]
  },
  "Plastic": {
    "Industrial HDPE & PP Rigid Containers & Drums": [
      "Food-Grade HDPE Drums & Tight-Head Jerry Cans (5L – 30L)",
      "Heavy-Duty PP Industrial Stacking Crates & Perforated Baskets",
      "Agricultural Polymer Carboys & Chemical Resistant Bottles",
      "Heavy-Duty Recycled Plastic Pallets (ISPM-15 Exempt)"
    ],
    "Commercial Household, Storage & Utility Ware": [
      "Virgin Polymer Multipurpose Storage Bins & Modular Organizers",
      "Airtight Modular Kitchen Food Storage Containers (BPA-Free)",
      "Food-Grade Microwave-Safe Airtight Tiffin Containers",
      "Heavy-Duty Commercial Plastic Basins, Buckets & Waste Bins"
    ],
    "Custom Precision Injection Molded Components": [
      "Custom Tooling Precision Engineering Plastics (POM, PA6, ABS, PC)",
      "Industrial Polymer Closures, Dispenser Pumps & Screw Caps",
      "Custom OEM Molded Technical Components"
    ]
  }
};

// Backwards compatibility & flexible key aliases
COMMODITY_DATA["Spices & Seasoning"] = COMMODITY_DATA["Spices"];
COMMODITY_DATA["Handcrafts & Arifacts"] = COMMODITY_DATA["Handcrafts"];
COMMODITY_DATA["Textiles & Fabrics"] = COMMODITY_DATA["Textiles"];
COMMODITY_DATA["Bamboo Products"] = COMMODITY_DATA["Bamboo"];
COMMODITY_DATA["Plastics Things"] = COMMODITY_DATA["Plastic"];

// ── Initialize Kavri RFQ Engine ──────────────────────────────
(function initKavriRfq() {
  const lineSelect       = document.getElementById('rfqProductLine');
  const commoditySelect  = document.getElementById('rfqCommodity');
  const gradeSelect      = document.getElementById('rfqGrade');
  const customGradeWrap  = document.getElementById('rfqCustomGradeWrap');
  const customGradeInput = document.getElementById('rfqCustomGrade');

  const countrySelect    = document.getElementById('rfqCountry');
  const portSelect       = document.getElementById('rfqPort');
  const customPortRow    = document.getElementById('rfqCustomPortRow');
  const customCountryWrap= document.getElementById('rfqCustomCountryWrap');
  const customPortWrap   = document.getElementById('rfqCustomPortWrap');
  const customCountryInp = document.getElementById('rfqCustomCountry');
  const customPortInp    = document.getElementById('rfqCustomPort');

  const rfqForm          = document.getElementById('rfqForm');
  const rfqSuccessWrap   = document.getElementById('rfqSuccessWrap');

  if (!lineSelect || !commoditySelect || !gradeSelect || !countrySelect || !portSelect || !rfqForm) {
    return;
  }

  // Populate Commodities for chosen Product Line
  function updateCommodities() {
    const line = lineSelect.value;
    const commodities = COMMODITY_DATA[line] ? Object.keys(COMMODITY_DATA[line]) : [];
    commoditySelect.innerHTML = '';
    commodities.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      commoditySelect.appendChild(opt);
    });
    updateGrades();
  }

  // Populate Grades for chosen Commodity
  function updateGrades() {
    const line = lineSelect.value;
    const comm = commoditySelect.value;
    const grades = (COMMODITY_DATA[line] && COMMODITY_DATA[line][comm]) ? COMMODITY_DATA[line][comm] : ['Standard Export Quality', 'Custom / Others (Specify)'];
    gradeSelect.innerHTML = '';
    grades.forEach(g => {
      const opt = document.createElement('option');
      opt.value = g;
      opt.textContent = g;
      gradeSelect.appendChild(opt);
    });
    checkCustomGrade();
  }

  // Toggle Custom Grade Input
  function checkCustomGrade() {
    const g = gradeSelect.value || '';
    if (g.toLowerCase().includes('custom') || g.toLowerCase().includes('others')) {
      customGradeWrap.style.display = 'block';
      if (customGradeInput) customGradeInput.required = true;
    } else {
      customGradeWrap.style.display = 'none';
      if (customGradeInput) customGradeInput.required = false;
    }
  }

  // Populate Discharge Seaports for chosen Country
  function updatePorts() {
    const country = countrySelect.value;
    const ports = DESTINATION_PORTS[country] || ['Port of Discharge (POD)', 'Others (Specify Port)'];
    portSelect.innerHTML = '';
    ports.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      portSelect.appendChild(opt);
    });
    checkCustomPort();
  }

  // Toggle Custom Country & Port Inputs
  function checkCustomPort() {
    const country = countrySelect.value;
    const port    = portSelect.value || '';
    const isCustomCountry = (country === 'Others');
    const isCustomPort    = (port.toLowerCase().includes('others'));

    if (isCustomCountry) {
      customPortRow.style.display = 'grid';
      customCountryWrap.style.display = 'block';
      customPortWrap.style.display = 'block';
      if (customCountryInp) customCountryInp.required = true;
      if (customPortInp) customPortInp.required = true;
    } else if (isCustomPort) {
      customPortRow.style.display = 'grid';
      customCountryWrap.style.display = 'none';
      customPortWrap.style.display = 'block';
      if (customCountryInp) customCountryInp.required = false;
      if (customPortInp) customPortInp.required = true;
    } else {
      customPortRow.style.display = 'none';
      customCountryWrap.style.display = 'none';
      customPortWrap.style.display = 'none';
      if (customCountryInp) customCountryInp.required = false;
      if (customPortInp) customPortInp.required = false;
    }
  }

  // Event Listeners for Dynamic Dropdowns
  lineSelect.addEventListener('change', updateCommodities);
  commoditySelect.addEventListener('change', updateGrades);
  gradeSelect.addEventListener('change', checkCustomGrade);
  countrySelect.addEventListener('change', updatePorts);
  portSelect.addEventListener('change', checkCustomPort);

  // Initialize defaults
  updateCommodities();
  updatePorts();

  // Auto-fill from URL parameters (e.g. contact.html?line=Spices)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const lineParam = urlParams.get('line');
    if (lineParam) {
      for (let i = 0; i < lineSelect.options.length; i++) {
        if (lineSelect.options[i].value.toLowerCase() === lineParam.toLowerCase() || lineSelect.options[i].text.toLowerCase().includes(lineParam.toLowerCase())) {
          lineSelect.selectedIndex = i;
          updateCommodities();
          break;
        }
      }
    }
  } catch (err) {
    // Graceful fallback
  }

  // Wire up "Enquire Now" buttons on Product Cards to auto-fill the RFQ
  document.querySelectorAll('.btn-product').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rfqSec = document.getElementById('rfq');
      if (!rfqSec) {
        // Allow link navigation to contact.html?line=...
        return;
      }
      e.preventDefault();
      const card = this.closest('.product-card');
      if (!card) return;
      const cat = card.dataset.category;
      const title = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').trim();

      // Map category to line
      if (cat === 'spices') lineSelect.value = 'Spices';
      else if (cat === 'handcrafts') lineSelect.value = 'Handcrafts';
      else if (cat === 'textiles') lineSelect.value = 'Textiles';
      else if (cat === 'bamboo') lineSelect.value = 'Bamboo';
      else if (cat === 'plastic') lineSelect.value = 'Plastic';

      updateCommodities();

      // Attempt to match commodity
      if (title) {
        for (let i = 0; i < commoditySelect.options.length; i++) {
          const optText = commoditySelect.options[i].text.toLowerCase();
          const firstWord = title.split(' ')[0].toLowerCase();
          if (optText.includes(firstWord) || title.toLowerCase().includes(commoditySelect.options[i].value.toLowerCase().split(' ')[0])) {
            commoditySelect.selectedIndex = i;
            updateGrades();
            break;
          }
        }
      }

      // Smooth scroll to RFQ form
      const rfqSec = document.getElementById('rfq');
      if (rfqSec) {
        const top = rfqSec.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
        // Visual focus indicator
        rfqForm.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
        rfqForm.style.boxShadow = '0 0 35px rgba(212, 175, 55, 0.4)';
        rfqForm.style.borderColor = 'var(--accent-light)';
        setTimeout(() => {
          rfqForm.style.boxShadow = '';
          rfqForm.style.borderColor = '';
        }, 2000);
      }
    });
  });

  // Handle Form Submission
  rfqForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = rfqForm.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Processing Commercial RFQ...</span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Extract values
    const fullName   = (document.getElementById('rfqFullName').value || '').trim();
    const company    = (document.getElementById('rfqCompany').value || '').trim();
    const email      = (document.getElementById('rfqEmail').value || '').trim();
    const phone      = (document.getElementById('rfqPhone').value || '').trim();
    const buyerTypeEl = document.getElementById('rfqBuyerType');
    const buyerType  = buyerTypeEl ? buyerTypeEl.value : 'Direct Importer';

    const line       = lineSelect.value;
    const commodity  = commoditySelect.value;
    let grade        = gradeSelect.value;
    if ((grade.toLowerCase().includes('custom') || grade.toLowerCase().includes('others')) && customGradeInput && customGradeInput.value) {
      grade = `Custom: ${customGradeInput.value.trim()}`;
    }

    const qty        = (document.getElementById('rfqQuantity').value || '').trim();
    const qtyUnit    = document.getElementById('rfqQuantityUnit').value;

    let country      = countrySelect.value;
    if (country === 'Others' && customCountryInp && customCountryInp.value) {
      country = customCountryInp.value.trim();
    }

    let port         = portSelect.value;
    if ((countrySelect.value === 'Others' || port.toLowerCase().includes('others')) && customPortInp && customPortInp.value) {
      port = `Custom Port: ${customPortInp.value.trim()}`;
    }

    const pol        = document.getElementById('rfqPol').value;
    const incoterm   = document.getElementById('rfqIncoterm').value;
    const packaging  = document.getElementById('rfqPackaging').value;
    const schedule   = document.getElementById('rfqSchedule').value;
    const notes      = (document.getElementById('rfqNotes').value || 'Standard Export Specifications').trim();

    // Generate unique reference number: LGE-RFQ-2026-XXXX
    const refYear = new Date().getFullYear();
    const refCode = `LGE-RFQ-${refYear}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Build WhatsApp Pre-filled payload
    const waText = 
`🌟 *LAVISH GLOBAL EXIM — COMMERCIAL EXPORT RFQ*
━━━━━━━━━━━━━━━━━━━━━━
📋 *RFQ Ref:* ${refCode}
👤 *Buyer:* ${fullName}
🏢 *Company:* ${company}
💼 *Buyer Type:* ${buyerType}
📧 *Email:* ${email}
📞 *Direct / WhatsApp:* ${phone}

📦 *COMMODITY & GRADE SPECIFICATION (KAVRI EXIM STD):*
• Product Division: ${line}
• Commodity / Sub-Division: ${commodity}
• Target Technical Grade: ${grade}
• Volume / Target Quantity: ${qty} ${qtyUnit}

🚢 *MARITIME DELIVERY & INCOTERMS 2020:*
• Commercial Terms: ${incoterm} 2020
• Port of Loading (POL): ${pol}
• Destination Country: ${country}
• Port of Discharge (POD): ${port}

📋 *PACKAGING & SHIPPING TIMELINE:*
• Packaging Std: ${packaging}
• Target Sailing Program: ${schedule}
• Buyer Instructions: ${notes}
━━━━━━━━━━━━━━━━━━━━━━
⚡ *Official Proforma Invoice SLA: Within 12 Business Hours*`;

    const waEncoded = encodeURIComponent(waText);
    const waLink = `https://wa.me/917448580888?text=${waEncoded}`;

    setTimeout(() => {
      // Hide form & display success summary wrap
      rfqForm.style.display = 'none';

      rfqSuccessWrap.innerHTML = `
        <span class="success-icon">🚢</span>
        <div class="rfq-ref-badge">Quotation Reference: ${refCode}</div>
        <h3 style="color: var(--gold-light); font-size: 1.5rem; margin-bottom: 0.5rem;">Export Quotation Request Transmitted</h3>
        <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">
          Thank you, <strong>${fullName}</strong>. Your commercial enquiry has been logged with our international trade desk under Indian Export Regulations (DGFT, APEDA & Spices Board). Our export desk is preparing your container stuffing calculations and freight breakdown.
        </p>

        <div class="rfq-summary-box">
          <div class="rfq-summary-item">
            <span class="rfq-summary-label">Buyer Entity</span>
            <span class="rfq-summary-val">${company} (${buyerType})</span>
          </div>
          <div class="rfq-summary-item">
            <span class="rfq-summary-label">Commodity & Grade</span>
            <span class="rfq-summary-val">${commodity} — ${grade}</span>
          </div>
          <div class="rfq-summary-item">
            <span class="rfq-summary-label">Volume & Terms</span>
            <span class="rfq-summary-val">${qty} ${qtyUnit} (${incoterm})</span>
          </div>
          <div class="rfq-summary-item">
            <span class="rfq-summary-label">Discharge Seaport</span>
            <span class="rfq-summary-val">${port} (${country})</span>
          </div>
          <div class="rfq-summary-item">
            <span class="rfq-summary-label">Origin Gateway</span>
            <span class="rfq-summary-val">${pol}</span>
          </div>
          <div class="rfq-summary-item">
            <span class="rfq-summary-label">Packaging & Schedule</span>
            <span class="rfq-summary-val">${packaging} · ${schedule}</span>
          </div>
        </div>

        <div style="margin: 1.5rem 0 1rem;">
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-rfq">
            <span>💬 Send Direct via WhatsApp Trade Desk</span>
            <span>→</span>
          </a>
        </div>

        <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 0.75rem;">
          ⚡ Proforma Invoice, container stuffing calculations and official FOB/CIF freight rates are issued within <strong>12 business hours</strong>.
        </p>

        <button type="button" id="rfqResetBtn" class="btn btn-outline" style="margin-top: 1.25rem; font-size: 0.85rem; padding: 0.6rem 1.4rem;">
          <span>Submit Another Quotation Enquiry</span>
        </button>
      `;

      rfqSuccessWrap.style.display = 'block';

      // Scroll to summary smoothly
      const rfqSec = document.getElementById('rfq');
      if (rfqSec) {
        const top = rfqSec.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }

      // Reset button handler
      const resetBtn = document.getElementById('rfqResetBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          rfqForm.reset();
          updateCommodities();
          updatePorts();
          rfqSuccessWrap.style.display = 'none';
          rfqForm.style.display = 'block';
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        });
      }
    }, 900);
  });
})();
