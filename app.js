import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.showPage = function (pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add("active");
    window.scrollTo(0, 0);
  }
};

const portfolioData = {
  Bridal: [
    {
      before: "assets/bridal1-before.jpg",
      after: "assets/bridal1-after.jpg",
      title: "Soft Bridal Glam"
    }
  ],
  Graduation: [
    {
      before: "assets/grad1-before.jpg",
      after: "assets/grad1-after.jpg",
      title: "Graduation Natural Look"
    }
  ],
  Photoshoot: [
    {
      before: "assets/photo1-before.jpg",
      after: "assets/photo1-after.jpg",
      title: "Camera Ready Makeup"
    }
  ],
  Event: [
    {
      before: "assets/event1-before.jpg",
      after: "assets/event1-after.jpg",
      title: "Evening Glam"
    }
  ]
};

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
  container.innerHTML = "";

  Object.keys(portfolioData).forEach(category => {
    const div = document.createElement("div");
    div.className = "category-card";
    div.innerHTML = `<strong>${category}</strong><button>View</button>`;
    div.onclick = () => renderPortfolioGallery(category);
    container.appendChild(div);
  });
}

function renderPortfolioGallery(category) {
  const gallery = document.getElementById("portfolioGallery");
  gallery.innerHTML = `<h2>${category}</h2>`;

  portfolioData[category].forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${item.title}</h3>
      <div class="before-after">
        <div><p>Before</p><img src="${item.before}" alt="Before"></div>
        <div><p>After</p><img src="${item.after}" alt="After"></div>
      </div>
    `;
    gallery.appendChild(div);
  });
}

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

function listenBookingSlots() {
  const container = document.getElementById("bookingSlots");
  if (!container) return;

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
