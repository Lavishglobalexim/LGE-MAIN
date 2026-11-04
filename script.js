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

// ── Mobile Hamburger ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  }));
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

// 1. Destination Country to Exact Discharge Seaport UN/LOCODE Directory
const DESTINATION_PORTS = {
  "UAE": [
    "Jebel Ali Port, Dubai (AEJEA)",
    "Khalifa Port, Abu Dhabi (AEKHL)",
    "Port Khalid, Sharjah (AEPKH)",
    "Fujairah Port (AEFJR)",
    "Ajman Port (AEAJM)",
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
  "Saudi Arabia": [
    "Jeddah Islamic Port (SAJED)",
    "King Abdulaziz Port, Dammam (SADMM)",
    "King Abdullah Port, Rabigh (SAKAP)",
    "Jubail Commercial Port (SAJUB)",
    "Yanbu Commercial Port (SAYNB)",
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
  "Sri Lanka": [
    "Colombo Port (LKCMB)",
    "Hambantota International Port (LKHRI)",
    "Trincomalee Port (LKTRR)",
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
  "Indonesia": [
    "Tanjung Priok, Jakarta (IDTPP)",
    "Tanjung Perak, Surabaya (IDTPS)",
    "Belawan Port, Medan (IDBLW)",
    "Tanjung Emas, Semarang (IDSRG)",
    "Makassar (Soekarno-Hatta) (IDMAK)",
    "Others (Specify Port)"
  ],
  "Others": [
    "Others (Specify Custom Port)"
  ]
};

// 2. Product Line Cascades: Commodities and Export Technical Grades
const COMMODITY_DATA = {
  "Spices": {
    "Cardamom (Alleppey Green Extra Bold)": [
      "AGEB — Alleppey Green Extra Bold (8mm+)",
      "AGB — Alleppey Green Bold (7.5mm - 8mm)",
      "AGS — Alleppey Green Superior (7mm - 7.5mm)",
      "Split / Small Green Cardamom Pods",
      "Custom / Others (Specify)"
    ],
    "Black Pepper (Tellicherry & Malabar Garbled)": [
      "TGSEB — Tellicherry Garbled Special Extra Bold (4.75mm+)",
      "TGM — Tellicherry Garbled (4.25mm+)",
      "MG-1 — Malabar Garbled (550+ GL Density)",
      "Coarse Ground & Crushed Black Pepper",
      "Custom / Others (Specify)"
    ],
    "Turmeric (Erode / Salem Double Polished)": [
      "Erode Double Polished Finger (Curcumin 3.0% - 3.5%)",
      "Salem Golden Yellow Finger (Curcumin 4.5% - 5.5%)",
      "Steam Sterilized Turmeric Powder (Curcumin 3.5%+)",
      "Turmeric Bulbs / Unpolished Splits",
      "Custom / Others (Specify)"
    ],
    "Red Chilli (Teja S17 / S4 Sannam / Byadgi)": [
      "Teja S17 Stemless (High Heat 75,000+ SHU)",
      "S4 Sannam Stemless / With Stem",
      "Byadgi Whole Chilli (Deep Red, Low Heat ASTA)",
      "Crushed Chilli Flakes / Coarse Powder",
      "Custom / Others (Specify)"
    ],
    "Cumin & Coriander Seeds": [
      "Singapore Quality Cumin (99% Purity)",
      "Europe Quality Cumin (99.5% Machine Cleaned)",
      "Eagle Quality Green Coriander Seeds",
      "Scooter Quality Coriander Whole",
      "Custom / Others (Specify)"
    ],
    "Cloves, Nutmeg & Mace": [
      "Lal Pari Quality Handpicked Whole Cloves",
      "Whole Indian Nutmeg with Shell / Without Shell",
      "Whole Golden Yellow Mace Flowers",
      "Custom / Others (Specify)"
    ]
  },
  "Handcrafts": {
    "Engraved Wooden Jewelry & Keepsake Boxes": [
      "Antique Brass Inlay Sheesham Box (10x6x4 in)",
      "Hand-Carved Floral Rosewood Box (8x5x3 in)",
      "Velvet Lined Multi-Compartment Keepsake Box",
      "Custom Laser Engraved / OEM Dimensions"
    ],
    "Handcrafted Teak & Sheesham Kitchen Utilities": [
      "Teakwood Serving Platter with Brass Handles",
      "Sheesham Spice Box (9-Compartment Masala Dabba)",
      "Hand-Turned Wooden Bowls & Salad Servers",
      "Custom / Others (Specify)"
    ],
    "Artisanal Brass & Copper Handicrafts": [
      "Antique Brass Hanging Peacock Diya (Oil Lamp)",
      "Cast Brass Traditional Heritage Sculptures",
      "Hammered 100% Pure Copper Water Pitcher & Cups",
      "Custom / Others (Specify)"
    ],
    "Marble & Soapstone Sculpted Decor": [
      "Pietra Dura Inlay White Marble Coasters & Trivets",
      "Hand-Carved Soapstone Floral Aroma Burner",
      "Custom / Others (Specify)"
    ]
  },
  "Textiles": {
    "100% Combed Cotton T-Shirts & Apparel": [
      "180 GSM Single Jersey Bio-Washed Combed Cotton",
      "220 GSM Heavyweight French Terry Oversized",
      "160 GSM Lightweight Summer Combed Cotton",
      "Custom OEM Print, Embroidery & Pantone Dye"
    ],
    "Luxury Terry Bath Towels & Hotel Linen": [
      "600 GSM Ring-Spun Combed Cotton Bath Towel",
      "500 GSM Zero-Twist Ultra Plush Hotel Bath Sheet",
      "400 GSM Quick-Dry Pool / Spa Cabana Stripe Towel",
      "Custom Jacquard Woven Hotel Branding"
    ],
    "Cotton Kitchen Linen & Eco Canvas Bags": [
      "Waffle Weave Cotton Kitchen Towels (300 GSM)",
      "Heavyweight Pure Cotton Canvas Tote Bags (280 GSM)",
      "Printed Cotton Table Runners & Dining Napkins",
      "Custom / Others (Specify)"
    ],
    "Woven Grey Fabric & Knitted Rolls": [
      "Single Jersey Knitted Fabric Rolls (Raw Greige / Dyed)",
      "100% Cotton Poplin & Twill Woven Fabric",
      "Custom / Others (Specify)"
    ]
  },
  "Bamboo": {
    "Eco-Friendly Bamboo Toothbrushes": [
      "Adult Wave Charcoal Bristles (BPA-Free Dupont Nylon)",
      "Child Soft Rounded Nylon-6 Pastel Bristles",
      "Flat Ergonomic Handle with Laser Engraved Logo",
      "Custom Retail Kraft Box Packaging"
    ],
    "Handcrafted Neem & Bamboo Combs": [
      "Dual-Tooth Wide Handle Anti-Static Neem Comb",
      "Pocket Beard & Fine Hair Detangling Comb",
      "Custom / Others (Specify)"
    ],
    "Bamboo Stationery & Corporate Gifts": [
      "Bamboo Barrel Ballpoint Pen with Brass Clip",
      "Spiral Bamboo Hardcover Journal with Recycled Paper",
      "Custom / Others (Specify)"
    ],
    "Bamboo Kitchenware & Travel Cutlery": [
      "4-Piece Bamboo Cutlery Set with Organic Cotton Pouch",
      "Solid Bamboo Chopping & Serving Board (ISPM-15)",
      "Custom / Others (Specify)"
    ]
  },
  "Plastic": {
    "Industrial HDPE & PP Rigid Containers": [
      "Food-Grade HDPE Drums & Jerry Cans (5L – 30L)",
      "Heavy-Duty PP Industrial Stacking Crates & Totes",
      "Custom Polymer Molded Containers"
    ],
    "Commercial Household & Utility Ware": [
      "Virgin Polymer Multipurpose Bins & Organizers",
      "Airtight Modular Kitchen Storage Containers",
      "Custom / Others (Specify)"
    ],
    "Custom Precision Injection Molded Components": [
      "Custom Tooling Precision Engineering Plastics",
      "Custom OEM Parts / Specifications"
    ]
  }
};

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
📧 *Email:* ${email}
📞 *Direct / WhatsApp:* ${phone}

📦 *COMMODITY & GRADE SPECIFICATION:*
• Product Line: ${line}
• Commodity: ${commodity}
• Target Grade: ${grade}
• Volume / Quantity: ${qty} ${qtyUnit}

🚢 *MARITIME DELIVERY & INCOTERMS:*
• Commercial Terms: ${incoterm} 2020
• Port of Loading (POL): ${pol}
• Destination Country: ${country}
• Port of Discharge (POD): ${port}

📋 *PACKAGING & SHIPPING TIMELINE:*
• Packaging Std: ${packaging}
• Target Sailing: ${schedule}
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
          Thank you, <strong>${fullName}</strong>. Your commercial enquiry has been logged with our international trade desk under Indian Export Regulations (DGFT, APEDA & Spices Board). Our export manager is preparing your freight schedule and container stuffing breakdown.
        </p>

        <div class="rfq-summary-box">
          <div class="rfq-summary-item">
            <span class="rfq-summary-label">Buyer Entity</span>
            <span class="rfq-summary-val">${company} (${fullName})</span>
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
            <span class="rfq-summary-label">Packaging Std</span>
            <span class="rfq-summary-val">${packaging}</span>
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
