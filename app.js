import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.showPage = function (pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  window.scrollTo(0, 0);
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
    name: "Bridal Makeup",
    price: "Starting at $250",
    services: "Skin prep, luxury makeup, lashes, long-wear finish."
  },
  {
    name: "Graduation Makeup",
    price: "Starting at $120",
    services: "Natural glam, photo-ready base, lashes included."
  },
  {
    name: "Photoshoot Makeup",
    price: "Starting at $150",
    services: "Camera-focused makeup, touch-up guidance."
  },
  {
    name: "Event Makeup",
    price: "Starting at $130",
    services: "Soft glam or full glam for parties and formal events."
  },
  {
    name: "Hair Styling Add-on",
    price: "Starting at $60",
    services: "Simple curls, soft waves, or clean styling."
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

const blogData = [
  {
    title: "How to Prepare for Your Makeup Appointment",
    date: "June 30, 2026",
    text: "Come with clean skin, avoid heavy skincare, and bring inspiration photos. This helps create a look that matches your event and personal style."
  },
  {
    title: "Soft Glam vs Korean-Inspired Makeup",
    date: "June 30, 2026",
    text: "Soft glam usually focuses on sculpted features and polished skin, while Korean-inspired makeup emphasizes fresh skin, soft eyes, and a delicate finish."
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
  pricingData.forEach(item => {
    const div = document.createElement("div");
    div.className = "price-card";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p class="price">${item.price}</p>
      <p>${item.services}</p>
    `;
    container.appendChild(div);
  });
}

function renderFAQ() {
  const container = document.getElementById("faqList");
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

function renderBlog() {
  const container = document.getElementById("blogList");
  blogData.forEach(post => {
    const div = document.createElement("div");
    div.className = "blog-card";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p class="sub">${post.date}</p>
      <p>${post.text}</p>
    `;
    container.appendChild(div);
  });
}

function listenBookingSlots() {
  const container = document.getElementById("bookingSlots");

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
renderPricing();
renderFAQ();
renderBlog();
listenBookingSlots();