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

function openLightbox() {
  if (!LIGHTBOX_IMAGES.length) return;
  lightboxImg.src = LIGHTBOX_IMAGES[lightboxIndex];
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
}

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
