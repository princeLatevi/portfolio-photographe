// ============================================================================
// Antoni Latevi — Portfolio Photographe — script.js
// ============================================================================

// ----------------------------------------------------------------------------
// 1. DONNÉES À MODIFIER FACILEMENT
// ----------------------------------------------------------------------------

// -- DISTINCTIONS / PRIX DE CONCOURS -----------------------------------------
// Pour ajouter un prix : copiez un bloc { ... } et remplissez les champs.
// "image" est optionnel : laissez "" si vous n'avez pas de photo du prix/trophée.
const AWARDS_DATA = [
  {
    year: "2024",
    title: "Lauréat du Concours de Photographie de l'Union Européenne",
    org: "Concours organisé par la Délégation de l'Union européenne en Côte d'Ivoire",
    // Déposez la photo du prix/diplôme dans Assets/image/awards/ et indiquez son nom ici :
    image: "./Assets/image/awards/prix-ue-2024.jpg",
  },
  // Pour ajouter un autre prix, copiez ce bloc et remplissez les champs.
  // "image" est optionnel : laissez "" si vous n'avez pas de photo du prix/trophée.
  // {
  //   year: "2025",
  //   title: "1er Prix — Concours National de Photographie",
  //   org: "Fédération Ivoirienne de Photographie, catégorie Portrait",
  //   image: "./Assets/image/awards/prix-2025.jpg",
  // },
];

// -- GALERIES DU PORTFOLIO ----------------------------------------------------
// Remplacez les chemins d'images par vos vraies photos dans Assets/image/portfolio/
const PROJECTS_DATA = [
  {
    number: "01",
    category: "Mariage",
    name: "Cérémonies & mariages",
    images: {
      left: [
        "./Assets/image/portfolio/mariage-1.jpg",
        "./Assets/image/portfolio/mariage-2.jpg",
      ],
      right: "./Assets/image/portfolio/mariage-3.jpg",
    },
  },
  {
    number: "02",
    category: "Portrait",
    name: "Portraits & personnalité",
    images: {
      left: [
        "./Assets/image/portfolio/portrait-1.jpg",
        "./Assets/image/portfolio/portrait-2.jpg",
      ],
      right: "./Assets/image/portfolio/portrait-3.jpg",
    },
  },
  {
    number: "03",
    category: "Corporate & Événementiel",
    name: "Entreprises & événements",
    images: {
      left: [
        "./Assets/image/portfolio/corporate-1.jpg",
        "./Assets/image/portfolio/corporate-2.jpg",
      ],
      right: "./Assets/image/portfolio/corporate-3.jpg",
    },
  },
];

// -- APERÇU EN SPHÈRE 3D (section "Un aperçu, d'un geste") ------------------
// Un échantillon de photos, toutes catégories confondues, réparties sur une
// sphère que l'on fait pivoter à la souris ou au doigt. Remplacez "image"
// par vos vraies photos dans Assets/image/portfolio/ (voir README.md).
const SPHERE_DATA = [
  { category: "Mariage", title: "Cérémonie", image: "./Assets/image/portfolio/sphere-mariage-ceremonie.jpg" },
  { category: "Portrait", title: "Studio", image: "./Assets/image/portfolio/sphere-portrait-studio.jpg" },
  { category: "Mode & Art", title: "Collection créative", image: "./Assets/image/portfolio/sphere-mode-collection.jpg" },
  { category: "Corporate", title: "Séminaire d'entreprise", image: "./Assets/image/portfolio/sphere-corporate-seminaire.jpg" },
  { category: "Famille", title: "Séance en extérieur", image: "./Assets/image/portfolio/sphere-famille-exterieur.jpg" },
  { category: "Mariage", title: "Préparatifs", image: "./Assets/image/portfolio/sphere-mariage-preparatifs.jpg" },
  { category: "Portrait", title: "Lumière naturelle", image: "./Assets/image/portfolio/sphere-portrait-naturelle.jpg" },
  { category: "Événement", title: "Soirée privée", image: "./Assets/image/portfolio/sphere-evenement-soiree.jpg" },
  { category: "Mode & Art", title: "Série artistique", image: "./Assets/image/portfolio/sphere-mode-serie.jpg" },
  { category: "Famille", title: "Complicité", image: "./Assets/image/portfolio/sphere-famille-complicite.jpg" },
  { category: "Mariage", title: "Soirée de fête", image: "./Assets/image/portfolio/sphere-mariage-soiree.jpg" },
  { category: "Portrait", title: "Portrait entreprise", image: "./Assets/image/portfolio/sphere-portrait-entreprise.jpg" },
  { category: "Événement", title: "Gala annuel", image: "./Assets/image/portfolio/sphere-evenement-gala.jpg" },
  { category: "Corporate", title: "Lancement de produit", image: "./Assets/image/portfolio/sphere-corporate-lancement.jpg" },
  { category: "Famille", title: "Portrait de famille", image: "./Assets/image/portfolio/sphere-famille-portrait.jpg" },
  { category: "Mode & Art", title: "Studio noir", image: "./Assets/image/portfolio/sphere-mode-studio-noir.jpg" },
];

// -- CATÉGORIES POUR LE BANDEAU DÉFILANT (marquee) ---------------------------
const MARQUEE_CATEGORIES = [
  { label: "Mariage", icon: "./Assets/icone/couple.png" },
  { label: "Portrait", icon: "./Assets/icone/portrait.png" },
  { label: "Événement", icon: "./Assets/icone/danse.png" },
  { label: "Famille", icon: "./Assets/icone/Famille.png" },
  { label: "Mode & Art", icon: "./Assets/icone/arts.png" },
  { label: "Corporate", icon: "./Assets/icone/corporate.png" },
];

// ----------------------------------------------------------------------------
// 2. NAV MOBILE
// ----------------------------------------------------------------------------
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open")
    ? "hidden"
    : "";
});
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ----------------------------------------------------------------------------
// 3. FADE-IN AU SCROLL (data-fade / data-delay / data-x / data-y / data-dur)
// ----------------------------------------------------------------------------
const fadeEls = document.querySelectorAll("[data-fade]");
fadeEls.forEach((el) => {
  const delay = el.getAttribute("data-delay") || "0";
  const dur = el.getAttribute("data-dur") || "700";
  const x = el.getAttribute("data-x");
  const y = el.getAttribute("data-y");
  if (x) el.style.setProperty("--fx", `${x}px`);
  if (y) el.style.setProperty("--fy", `${y}px`);
  el.style.transitionDelay = `${delay}ms`;
  el.style.transitionDuration = `${dur}ms`;
});

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
);
fadeEls.forEach((el) => fadeObserver.observe(el));

// ----------------------------------------------------------------------------
// 4. EFFET MAGNÉTIQUE SUR LE PORTRAIT DU HERO
// ----------------------------------------------------------------------------
(function magnet() {
  const el = document.getElementById("heroMagnet");
  if (!el || window.matchMedia("(pointer: coarse)").matches) return;
  const padding = 120;
  const strength = 4;
  let active = false;

  window.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const within =
      e.clientX > rect.left - padding &&
      e.clientX < rect.right + padding &&
      e.clientY > rect.top - padding &&
      e.clientY < rect.bottom + padding;

    if (within) {
      if (!active) {
        active = true;
        el.style.transition = "transform 0.3s ease-out";
      }
      el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
    } else if (active) {
      active = false;
      el.style.transition = "transform 0.6s ease-in-out";
      el.style.transform = "translate3d(0, 0, 0)";
    }
  });
})();

// ----------------------------------------------------------------------------
// 5. MARQUEE — deux rangées défilant en sens opposé selon le scroll
// ----------------------------------------------------------------------------
(function marquee() {
  const row1 = document.getElementById("marqueeRow1");
  const row2 = document.getElementById("marqueeRow2");
  if (!row1 || !row2) return;

  function tile(cat) {
    const div = document.createElement("div");
    div.className = "marquee-tile";
    div.innerHTML = `<img src="${cat.icon}" alt="" /><span>${cat.label}</span>`;
    return div;
  }

  const setA = [...MARQUEE_CATEGORIES, ...MARQUEE_CATEGORIES, ...MARQUEE_CATEGORIES];
  const setB = [...MARQUEE_CATEGORIES].reverse();
  const setBTripled = [...setB, ...setB, ...setB];

  setA.forEach((c) => row1.appendChild(tile(c)));
  setBTripled.forEach((c) => row2.appendChild(tile(c)));

  const section = row1.closest(".marquee-section");
  let ticking = false;

  function update() {
    const rect = section.getBoundingClientRect();
    const offset = (window.scrollY - (rect.top + window.scrollY) + window.innerHeight) * 0.3;
    row1.style.transform = `translateX(${offset - 200}px)`;
    row2.style.transform = `translateX(${-(offset - 200)}px)`;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  update();
})();

// ----------------------------------------------------------------------------
// 6. TEXTE "À PROPOS" — révélation caractère par caractère au scroll
// ----------------------------------------------------------------------------
(function animatedText() {
  const el = document.getElementById("aboutText");
  if (!el) return;
  const text = el.textContent.trim();
  el.textContent = "";
  const chars = text.split("").map((ch) => {
    const span = document.createElement("span");
    span.textContent = ch;
    span.style.opacity = "0.2";
    el.appendChild(span);
    return span;
  });

  function update() {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // progress: 0 when el top at 0.8*vh, 1 when el bottom at 0.2*vh
    const start = vh * 0.8;
    const end = vh * 0.2;
    const total = chars.length;
    chars.forEach((span, i) => {
      const charPos = start - ((start - end) * (i / total));
      const progress = (start - rect.top) / (start - charPos || 1);
      const clamped = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      const localProgress = Math.max(0, Math.min(1, (clamped * total - i)));
      span.style.opacity = String(0.2 + 0.8 * localProgress);
    });
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

// ----------------------------------------------------------------------------
// 7. DISTINCTIONS / PRIX
// ----------------------------------------------------------------------------
(function renderAwards() {
  const list = document.getElementById("awardsList");
  const empty = document.getElementById("awardsEmpty");
  if (!list) return;

  if (!AWARDS_DATA.length) {
    empty.hidden = false;
    return;
  }

  AWARDS_DATA.forEach((award, i) => {
    const card = document.createElement("div");
    card.className = "award-card fade-in";
    card.setAttribute("data-fade", "");
    card.setAttribute("data-delay", String(i * 100));
    card.innerHTML = `
      ${
        award.image
          ? `<div class="award-frame">
              <img src="${award.image}" alt="${award.title}" onerror="this.parentElement.classList.add('award-frame-empty'); this.remove();" />
            </div>`
          : `<div class="award-frame award-frame-empty"></div>`
      }
      <div class="award-body">
        <span class="award-year">${award.year}</span>
        <h3>${award.title}</h3>
        ${award.org ? `<p>${award.org}</p>` : ""}
      </div>
    `;
    list.appendChild(card);
    const delay = card.getAttribute("data-delay") || "0";
    card.style.transitionDelay = `${delay}ms`;
    fadeObserver.observe(card);
  });
})();

// ----------------------------------------------------------------------------
// 8. GALERIES — cartes empilées (sticky) qui se réduisent au scroll
// ----------------------------------------------------------------------------
let LIGHTBOX_IMAGES = [];
let LIGHTBOX_META = []; // [{ category, title }] — même longueur que LIGHTBOX_IMAGES, ou vide
let lightboxIndex = 0;

(function renderProjects() {
  const stack = document.getElementById("cardsStack");
  if (!stack) return;

  const total = PROJECTS_DATA.length;

  PROJECTS_DATA.forEach((project, i) => {
    const sticky = document.createElement("div");
    sticky.className = "project-card-sticky";
    sticky.style.top = `calc(clamp(5.5rem, 10vw, 8rem) + ${i * 28}px)`;
    sticky.style.zIndex = String(i + 1);

    const allImages = [...project.images.left, project.images.right];

    sticky.innerHTML = `
      <div class="project-card" data-index="${i}">
        <div class="project-card-top">
          <span class="project-number">${project.number}</span>
          <div class="project-meta">
            <span class="project-category">${project.category}</span>
            <h3 class="project-name">${project.name}</h3>
          </div>
          <button class="project-cta" type="button">Voir la galerie</button>
        </div>
        <div class="project-grid">
          <div class="project-col-left">
            <div class="project-tile" data-src="${project.images.left[0]}">
              <img src="${project.images.left[0]}" alt="${project.name}" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg,#242427,#0c0c0c)'; this.remove();" />
            </div>
            <div class="project-tile" data-src="${project.images.left[1]}">
              <img src="${project.images.left[1]}" alt="${project.name}" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg,#242427,#0c0c0c)'; this.remove();" />
            </div>
          </div>
          <div class="project-col-right">
            <div class="project-tile" data-src="${project.images.right}">
              <img src="${project.images.right}" alt="${project.name}" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg,#242427,#0c0c0c)'; this.remove();" />
            </div>
          </div>
        </div>
      </div>
    `;

    stack.appendChild(sticky);

    // clic sur une tuile ou le bouton -> lightbox
    sticky.querySelectorAll(".project-tile, .project-cta").forEach((el) => {
      el.addEventListener("click", () => {
        LIGHTBOX_IMAGES = allImages;
        LIGHTBOX_META = allImages.map(() => ({
          category: project.category,
          title: project.name,
        }));
        lightboxIndex = el.classList.contains("project-tile")
          ? allImages.indexOf(el.getAttribute("data-src"))
          : 0;
        openLightbox();
      });
    });
  });

  // effet de pile : chaque carte se réduit légèrement en scrollant derrière la suivante
  const cards = Array.from(stack.querySelectorAll(".project-card"));
  function updateStack() {
    cards.forEach((card, i) => {
      const stickyEl = card.parentElement;
      const rect = stickyEl.getBoundingClientRect();
      const nextCard = cards[i + 1];
      let scale = 1;
      if (nextCard) {
        const nextRect = nextCard.parentElement.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, 1 - nextRect.top / window.innerHeight),
        );
        scale = 1 - progress * 0.05;
      }
      card.style.transform = `scale(${scale})`;
    });
  }
  window.addEventListener("scroll", updateStack, { passive: true });
  updateStack();
})();

// ----------------------------------------------------------------------------
// 9. LIGHTBOX
// ----------------------------------------------------------------------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCat = document.getElementById("lightboxCat");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxShare = document.getElementById("lightboxShare");
const lightboxInquire = document.getElementById("lightboxInquire");

function renderLightboxMeta() {
  const meta = LIGHTBOX_META[lightboxIndex];
  lightboxCat.textContent = meta?.category || "";
  lightboxTitle.textContent = meta?.title || "";
  if (lightboxInquire) {
    const msg = encodeURIComponent(
      meta?.title
        ? `Bonjour, je suis intéressé·e par une séance dans le style « ${meta.title} ».`
        : "Bonjour, je suis intéressé·e par une séance photo."
    );
    lightboxInquire.href = `https://wa.me/2250747979585?text=${msg}`;
  }
}

function openLightbox() {
  if (!LIGHTBOX_IMAGES.length) return;
  lightboxImg.src = LIGHTBOX_IMAGES[lightboxIndex];
  renderLightboxMeta();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}
function stepLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + LIGHTBOX_IMAGES.length) % LIGHTBOX_IMAGES.length;
  lightboxImg.src = LIGHTBOX_IMAGES[lightboxIndex];
  renderLightboxMeta();
}

lightboxShare?.addEventListener("click", async () => {
  const meta = LIGHTBOX_META[lightboxIndex];
  const shareData = {
    title: `${meta?.title || "Photo"} — Antoni Latevi Photographie`,
    text: meta?.category ? `${meta.category} — Antoni Latevi Photographie` : "Antoni Latevi Photographie",
    url: window.location.href.split("#")[0],
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      lightboxShare.textContent = "Lien copié";
      setTimeout(() => (lightboxShare.textContent = "Partager"), 1500);
    }
  } catch (e) {
    /* partage annulé */
  }
});

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", () => stepLightbox(-1));
document.getElementById("lightboxNext").addEventListener("click", () => stepLightbox(1));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});

// ----------------------------------------------------------------------------
// 10. CONTACT
// ----------------------------------------------------------------------------
// Le formulaire (nom/email/message) a été retiré : WhatsApp est l'unique
// moyen de contact du site (bouton dans la section #contact).
// L'ancien formulaire envoyait vers Supabase — admin.html et database.sql
// restent dans le projet mais ne sont plus utilisés tant qu'aucun formulaire
// n'est réintroduit.

// ----------------------------------------------------------------------------
// 11. CURSEUR PERSONNALISÉ (pointeurs fins uniquement)
// ----------------------------------------------------------------------------
(function customCursor() {
  const dot = document.getElementById("cursorDot");
  if (!dot || !window.matchMedia("(pointer: fine)").matches) return;

  let x = -100, y = -100, tx = -100, ty = -100;
  window.addEventListener("pointermove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  function loop() {
    x += (tx - x) * 0.22;
    y += (ty - y) * 0.22;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(loop);
  }
  loop();

  const hoverTargets = "a, button, .project-tile, .sphere-card, .marquee-tile";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) dot.classList.add("wide");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) dot.classList.remove("wide");
  });
})();

// ----------------------------------------------------------------------------
// 12. SPHÈRE INTERACTIVE — aperçu du portfolio en 3D (Fibonacci sphere)
// ----------------------------------------------------------------------------
(function sphereGallery() {
  const stage = document.getElementById("sphereStage");
  const world = document.getElementById("sphereWorld");
  if (!stage || !world || !SPHERE_DATA.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FALLBACKS = [
    "linear-gradient(150deg,#2a0e2c,#0c0c0c)",
    "linear-gradient(150deg,#241033,#0c0c0c)",
    "linear-gradient(150deg,#2c1608,#0c0c0c)",
    "linear-gradient(150deg,#150a1c,#0c0c0c)",
    "linear-gradient(150deg,#1c1a24,#0c0c0c)",
    "linear-gradient(150deg,#241418,#0c0c0c)",
  ];

  const N = SPHERE_DATA.length;
  const GA = Math.PI * (3 - Math.sqrt(5));
  const cards = [];

  SPHERE_DATA.forEach((item, i) => {
    const yv = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - yv * yv));
    const theta = i * GA;
    const vec = {
      x: Math.cos(theta) * rad,
      y: yv,
      z: Math.sin(theta) * rad,
    };

    const card = document.createElement("div");
    card.className = "sphere-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy"
           onerror="this.style.display='none'; this.parentElement.style.background='${FALLBACKS[i % FALLBACKS.length]}';" />
      <span class="sphere-tag">${item.category}</span>
    `;
    world.appendChild(card);
    cards.push({ el: card, vec });

    card.addEventListener("click", () => {
      if (didDrag) return;
      LIGHTBOX_IMAGES = SPHERE_DATA.map((d) => d.image);
      LIGHTBOX_META = SPHERE_DATA.map((d) => ({ category: d.category, title: d.title }));
      lightboxIndex = i;
      openLightbox();
    });
  });

  let R = 200, cw = 100;
  function layout() {
    const rect = stage.getBoundingClientRect();
    const shortSide = Math.min(rect.width, rect.height);
    R = Math.max(90, Math.min(260, shortSide * 0.42));
    cw = Math.round(Math.max(56, R * 0.5));
    cards.forEach(({ el }) => {
      el.style.width = cw + "px";
      el.style.height = Math.round(cw * 1.15) + "px";
      el.style.marginLeft = -cw / 2 + "px";
      el.style.marginTop = -(cw * 1.15) / 2 + "px";
    });
    render();
  }

  let spin = 0, tilt = -6;
  let dragX = 0, dragY = 0, velX = 0, velY = 0;
  let dragging = false, didDrag = false;
  let lastX = 0, lastY = 0, downX = 0, downY = 0;

  function render() {
    const sy = spin + dragX;
    const sx = tilt + dragY;
    world.style.transform = `rotateY(${sy}deg) rotateX(${sx}deg)`;

    const radY = (sy * Math.PI) / 180;
    const radX = (sx * Math.PI) / 180;

    cards.forEach(({ el, vec }) => {
      // rotate around Y then X to read world-space depth for shading
      let x1 = vec.x * Math.cos(radY) + vec.z * Math.sin(radY);
      let z1 = -vec.x * Math.sin(radY) + vec.z * Math.cos(radY);
      let y2 = vec.y * Math.cos(radX) - z1 * Math.sin(radX);
      let z2 = vec.y * Math.sin(radX) + z1 * Math.cos(radX);
      const depth = z2; // -1..1, 1 = nearest

      const lon = (Math.atan2(vec.x, vec.z) * 180) / Math.PI;
      const lat = (Math.asin(vec.y) * 180) / Math.PI;
      el.style.transform = `translate3d(${vec.x * R}px, ${-vec.y * R}px, ${vec.z * R}px) rotateY(${lon}deg) rotateX(${lat}deg)`;

      const dim = 0.15 + 0.7 * ((depth + 1) / 2);
      el.style.opacity = String(0.35 + 0.65 * dim);
    });
  }

  function onPointerDown(e) {
    dragging = true;
    didDrag = false;
    downX = lastX = e.clientX;
    downY = lastY = e.clientY;
    velX = velY = 0;
    stage.classList.add("dragging");
    stage.setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e) {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    if (Math.abs(e.clientX - downX) > 6 || Math.abs(e.clientY - downY) > 6) didDrag = true;
    dragX += dx * 0.25;
    dragY = Math.max(-32, Math.min(32, dragY - dy * 0.25));
    velX = dx * 0.25;
    velY = -dy * 0.25;
    render();
  }
  function onPointerUp(e) {
    dragging = false;
    stage.classList.remove("dragging");
    stage.releasePointerCapture?.(e.pointerId);
  }

  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);

  function loop() {
    if (!dragging) {
      if (!prefersReduced) spin += 0.045; // légère rotation d'ambiance
      dragX += velX;
      dragY = Math.max(-32, Math.min(32, dragY + velY));
      velX *= 0.94;
      velY *= 0.94;
      if (Math.abs(velX) < 0.002) velX = 0;
      if (Math.abs(velY) < 0.002) velY = 0;
      render();
    }
    requestAnimationFrame(loop);
  }

  layout();
  window.addEventListener("resize", layout);
  if (!prefersReduced) requestAnimationFrame(loop);
})();

// ----------------------------------------------------------------------------
// 13. TUNNEL DE SCROLL — zoom dans les yeux du portrait, puis on "sort" sur le site
// ----------------------------------------------------------------------------
(function heroZoomTunnel() {
  const wrap = document.getElementById("heroScroll");
  const zoomTarget = document.getElementById("zoomTarget");
  const veil = document.getElementById("heroVeil");
  const headingWrap = document.querySelector(".hero-heading-wrap");
  const heroBottom = document.querySelector(".hero-bottom");
  const scrollCue = document.querySelector(".scroll-cue");
  if (!wrap || !zoomTarget || !veil) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const MAX_SCALE = 10;

  function update() {
    const rect = wrap.getBoundingClientRect();
    const total = wrap.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, total > 0 ? scrolled / total : 0));

    // Le portrait grossit à partir des yeux (transform-origin) jusqu'à
    // remplir tout l'écran.
    const scale = 1 + p * (MAX_SCALE - 1);
    zoomTarget.style.transform = `scale(${scale})`;

    // Le texte du hero s'efface vite, avant que le portrait ne le recouvre.
    // (on ne touche pas à l'opacité tant que p=0, pour laisser l'animation
    // d'entrée du chargement de page se dérouler normalement)
    if (p > 0.001) {
      const textOpacity = Math.max(0, 1 - p * 3.2);
      if (headingWrap) headingWrap.style.opacity = String(textOpacity);
      if (heroBottom) heroBottom.style.opacity = String(textOpacity);
      if (scrollCue) scrollCue.style.opacity = String(textOpacity);
    } else {
      if (headingWrap) headingWrap.style.opacity = "";
      if (heroBottom) heroBottom.style.opacity = "";
      if (scrollCue) scrollCue.style.opacity = "";
    }

    // Voile noir : on "rentre dans les yeux" (0.32→0.62), on y reste un
    // instant, puis on en ressort (0.85→1) pour arriver sur le site.
    let veilOpacity = 0;
    if (p < 0.32) {
      veilOpacity = 0;
    } else if (p < 0.62) {
      veilOpacity = (p - 0.32) / 0.3;
    } else if (p < 0.85) {
      veilOpacity = 1;
    } else {
      veilOpacity = 1 - (p - 0.85) / 0.15;
    }
    veil.style.opacity = String(Math.max(0, Math.min(1, veilOpacity)));
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
