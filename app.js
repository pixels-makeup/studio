window.showPage = function (pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add("active");
    window.scrollTo(0, 0);
  }
};

const portfolioData = [
  {
    id: "wedding",
    name: {
      zh: "婚禮",
      en: "Wedding"
    },
    cover: "assets/portfolio-wedding-cover.jpg",
    description: {
      zh: "新娘妝、婚禮跟妝與重要儀式造型。",
      en: "Bridal makeup, wedding day touch-ups, and polished looks for important ceremonies."
    },
    works: [
      {
        title: {
          zh: "柔光新娘妝",
          en: "Soft Bridal Glam"
        },
        image: "assets/portfolio-wedding-cover.jpg",
        description: {
          zh: "柔和精緻的新娘妝感，適合婚禮與試妝參考。",
          en: "A soft, refined bridal look for wedding day and trial makeup reference."
        }
      }
    ]
  },
  {
    id: "graduation",
    name: {
      zh: "畢業",
      en: "Graduation"
    },
    cover: "assets/portfolio-graduation-cover.jpg",
    description: {
      zh: "畢業照、典禮與校園拍攝妝造。",
      en: "Makeup and styling for graduation portraits, ceremonies, and campus photo sessions."
    },
    works: [
      {
        title: {
          zh: "自然畢業妝",
          en: "Graduation Natural Look"
        },
        image: "assets/portfolio-graduation-cover.jpg",
        description: {
          zh: "乾淨自然、上鏡穩定的畢業妝造。",
          en: "A clean, camera-ready graduation look that stays natural in portraits."
        }
      }
    ]
  },
  {
    id: "photoshoot",
    name: {
      zh: "約拍",
      en: "Photoshoot"
    },
    cover: "assets/portfolio-photoshoot-cover.jpg",
    description: {
      zh: "棚拍、外拍與鏡頭前妝髮調整。",
      en: "Makeup and hair adjustments for studio shoots, outdoor portraits, and camera work."
    },
    works: [
      {
        title: {
          zh: "鏡頭感妝造",
          en: "Camera Ready Makeup"
        },
        image: "assets/portfolio-photoshoot-cover.jpg",
        description: {
          zh: "適合攝影棚與人像約拍的精緻鏡頭妝。",
          en: "A polished makeup look designed for studio lighting and portrait sessions."
        }
      }
    ]
  },
  {
    id: "event",
    name: {
      zh: "場合",
      en: "Occasion"
    },
    cover: "assets/portfolio-event-cover.jpg",
    description: {
      zh: "聚餐、晚宴、生日與重要活動妝造。",
      en: "Looks for dinners, evening events, birthdays, and special occasions."
    },
    works: [
      {
        title: {
          zh: "精緻場合妝",
          en: "Evening Glam"
        },
        image: "assets/portfolio-event-cover.jpg",
        description: {
          zh: "精緻但不厚重的場合妝髮，適合晚宴與朋友聚會。",
          en: "A refined but lightweight event look for dinners and gatherings with friends."
        }
      }
    ]
  }
];

const pricingData = [
  {
    title: "主妆价格 MAKEUP",
    items: [
      {
        name: "日常妆 DAILY MAKEUP",
        price: "$87",
        services: "通勤｜日常｜等日常场合（不包含睫毛和遮瑕）"
      },
      {
        name: "场合妆 DELICATE MAKEUP",
        price: "$135",
        services: "晚宴｜生日｜演唱会｜主持｜伴娘等重要场合"
      },
      {
        name: "简单发型 HAIR",
        price: "+$30",
        services: "编发/卷发，不含颅周、头发蓬松、纹理空气感等"
      },
      {
        name: "精致发型 DELICATE HAIR",
        price: "+$60",
        services: ""
      }
    ]
  },
  {
    title: "额外附加 ADD-ONS",
    items: [
      {
        name: "急单 URGENT RESERVATION",
        price: "+$30",
        services: "4小时内"
      },
      {
        name: "改妆&发 MAKEUP CHANGES",
        price: "+$180",
        services: ""
      },
      {
        name: "早/晚班 BEFORE 7:30AM OR AFTER 10:30PM",
        price: "+$15/hr",
        services: ""
      },
      {
        name: "额外材料（如假发片等）EXTRA MATERIALS",
        price: "DM",
        services: ""
      },
      {
        name: "路费",
        price: "DM",
        services: ""
      }
    ]
  },
  {
    title: "婚礼价格 WEDDING",
    items: [
      {
        name: "新娘单次造型",
        price: "$420",
        services: "包含一套妆容+发型"
      },
      {
        name: "全天跟妆",
        price: "$999",
        services: "包含一套妆容+发型，2次改妆/发，最多9小时跟妆，不含化妆时间，不收取早班费用"
      },
      {
        name: "半天跟妆",
        price: "$799",
        services: "包含一套妆容+发型，1次改妆/发，最多6小时跟妆，不含化妆时间，不收取早班费用"
      },
      {
        name: "新郎/妈妈/亲戚造型",
        price: "$200",
        services: "包含一套妆容+发型"
      },
      {
        name: "婚礼试妆 BRIDAL TRIAL",
        price: "$250",
        services: "MAKEUP & HAIR，$50 credit"
      }
    ]
  }
];

const faqData = [
  {
    q: "How do I book an appointment?",
    a: "Choose an available time on the Booking page and contact me to confirm your service, location, and deposit."
  },
  {
    q: "Do you travel to clients?",
    a: "Yes. Travel fee depends on distance, parking, and total travel time."
  },
  {
    q: "Are lashes included?",
    a: "Yes, standard lashes are included in most makeup services."
  },
  {
    q: "How should I prepare before makeup?",
    a: "Please arrive with a clean face, no sunscreen or heavy skincare, and share inspiration photos before the appointment."
  },
  {
    q: "Can I reschedule?",
    a: "Rescheduling depends on availability and must follow the cancellation/reschedule policy."
  }
];

function renderPortfolioCategories() {
  const container = document.getElementById("portfolioCategories");
  const gallery = document.getElementById("portfolioGallery");
  const lang = getPortfolioLanguage();
  container.innerHTML = "";
  gallery.innerHTML = "";
  container.hidden = false;
  gallery.dataset.activeCategory = "";

  portfolioData.forEach(category => {
    const categoryName = getLocalizedText(category.name, lang);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-card";
    button.setAttribute("aria-label", categoryName);
    button.innerHTML = `
      <img src="${category.cover}" alt="${categoryName}" loading="lazy">
      <span class="category-card-shade"></span>
      <span class="category-card-copy">
        <strong>${categoryName}</strong>
      </span>
    `;
    button.onclick = () => renderPortfolioGallery(category.id);
    container.appendChild(button);
  });
}

function renderPortfolioGallery(categoryId) {
  const category = portfolioData.find(item => item.id === categoryId);
  if (!category) return;

  const categories = document.getElementById("portfolioCategories");
  const gallery = document.getElementById("portfolioGallery");
  const lang = getPortfolioLanguage();
  const categoryName = getLocalizedText(category.name, lang);
  const backLabel = lang === "en" ? "Back to Portfolio" : "返回作品集";
  categories.hidden = true;
  gallery.dataset.activeCategory = categoryId;
  gallery.innerHTML = `
    <div class="portfolio-detail-header">
      <button type="button" class="portfolio-back" aria-label="${backLabel}">${backLabel}</button>
      <div>
        <p class="section-kicker">${categoryName}</p>
        <h3>${categoryName}</h3>
        <p>${getLocalizedText(category.description, lang)}</p>
      </div>
    </div>
    <div class="portfolio-work-grid"></div>
  `;

  gallery.querySelector(".portfolio-back").onclick = renderPortfolioCategories;

  const grid = gallery.querySelector(".portfolio-work-grid");
  category.works.forEach(work => {
    const workTitle = getLocalizedText(work.title, lang);
    const article = document.createElement("article");
    article.className = "portfolio-work-card";
    article.innerHTML = `
      <img src="${work.image}" alt="${workTitle}" loading="lazy" onerror="this.onerror=null;this.src='assets/hero.jpg';">
      <div>
        <h4>${workTitle}</h4>
        <p>${getLocalizedText(work.description, lang)}</p>
      </div>
    `;
    grid.appendChild(article);
  });
}

function getPortfolioLanguage() {
  return document.documentElement.lang === "en" ? "en" : "zh";
}

function getLocalizedText(value, lang) {
  if (typeof value === "string") return value;
  return value[lang] || value.zh || value.en || "";
}

window.addEventListener("languagechange", () => {
  const gallery = document.getElementById("portfolioGallery");
  const activeCategory = gallery?.dataset.activeCategory;

  if (activeCategory) {
    renderPortfolioGallery(activeCategory);
  } else {
    renderPortfolioCategories();
  }
});

function renderPricing() {
  const container = document.getElementById("pricingList");
  container.innerHTML = `
    <div class="pricing-note">
      全部赠送单次假睫毛、全脸保湿去角质、修眉毛与小胡子
    </div>
  `;

  pricingData.forEach(section => {
    const div = document.createElement("div");
    div.className = "price-card";
    div.innerHTML = `
      <h2>${section.title}</h2>
      ${section.items.map(item => `
        <div class="price-row">
          <div>
            <h3>${item.name}</h3>
            ${item.services ? `<p>${item.services}</p>` : ""}
          </div>
          <p class="price">${item.price}</p>
        </div>
      `).join("")}
    `;
    container.appendChild(div);
  });

  container.insertAdjacentHTML("beforeend", `
    <p class="pricing-footer">提供工作室化妆，如需上门根据距离计算路费。</p>
  `);
}

function renderFAQ() {
  const container = document.getElementById("faqList");
  if (!container) return;

  faqData.forEach(item => {
    const div = document.createElement("div");
    div.className = "faq-item";
    div.innerHTML = `
      <div class="faq-question">${item.q}<span>＋</span></div>
      <div class="faq-answer">${item.a}</div>
    `;
    div.onclick = () => div.classList.toggle("open");
    container.appendChild(div);
  });
}

async function listenBookingSlots() {
  const container = document.getElementById("bookingSlots");
  if (!container) return;

  const { firebaseConfig } = await import("./firebase-config.js");
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
  const { getFirestore, collection, onSnapshot } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  onSnapshot(collection(db, "availableSlots"), snapshot => {
    container.innerHTML = "";

    snapshot.forEach(doc => {
      const slot = doc.data();
      const div = document.createElement("div");
      div.className = `slot-card ${slot.available ? "" : "unavailable"}`;
      div.innerHTML = `
        <div>
          <strong>${slot.date}</strong>
          <p>${slot.time}</p>
          <p>${slot.note || ""}</p>
        </div>
        <button ${slot.available ? "" : "disabled"}>
          ${slot.available ? "Request" : "Booked"}
        </button>
      `;
      container.appendChild(div);
    });
  });
}

renderPortfolioCategories();
renderFAQ();
listenBookingSlots();
