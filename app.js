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
    cover: "assets/portfolio/wedding/cover.jpg",
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
        image: "assets/portfolio/wedding/cover.jpg",
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
    cover: "assets/portfolio/graduation/cover.jpg",
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
        image: "assets/portfolio/graduation/cover.jpg",
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
    cover: "assets/portfolio/photoshoot/cover.jpg",
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
        image: "assets/portfolio/photoshoot/cover.jpg",
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
    cover: "assets/portfolio/occasion/cover.jpg",
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
        image: "assets/portfolio/occasion/cover.jpg",
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
    title: "主妆价格",
    items: [
      {
        name: "日常妆",
        price: "$87",
        services: "通勤｜日常｜等日常场合（不包含睫毛和遮瑕）"
      },
      {
        name: "场合妆",
        price: "$135",
        services: "晚宴｜生日｜演唱会｜主持｜伴娘等重要场合"
      },
      {
        name: "简单发型",
        price: "+$30",
        services: "编发/卷发，不含颅周、头发蓬松、纹理空气感等"
      },
      {
        name: "精致发型",
        price: "+$60",
        services: ""
      }
    ]
  },
  {
    title: "额外附加",
    items: [
      {
        name: "急单",
        price: "+$30",
        services: "4小时内"
      },
      {
        name: "改妆&发",
        price: "+$180",
        services: ""
      },
      {
        name: "早/晚班（早上7:30前或晚上10:30后）",
        price: "+$15/hr",
        services: ""
      },
      {
        name: "额外材料（如假发片等）",
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
    title: "婚礼价格",
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
        name: "婚礼试妆",
        price: "$250",
        services: "妆发，可抵扣 $50"
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

const BOOKING_API_URL = "https://script.google.com/macros/s/AKfycbwr53AxuED3AVtyoN4-rGZb_fPeKW-QP-eKpKd8MKCH1tJnfEoQfMYgmgb6Jr2A0fHU/exec";

const bookingSettings = {
  serviceDurationMinutes: 180,
  slotIntervalMinutes: 60,
  dayStartHour: 0,
  dayEndHour: 24,
  timezone: "America/Los_Angeles",
  calendarEmail: "littlehamster516@gmail.com"
};

const bookingServices = [
  {
    id: "daily-makeup",
    zh: "日常妆",
    en: "Daily Makeup"
  },
  {
    id: "event-makeup",
    zh: "场合妆",
    en: "Event Makeup"
  },
  {
    id: "bridal-single",
    zh: "新娘单次造型",
    en: "Bride Single Look"
  },
  {
    id: "wedding-day",
    zh: "婚礼跟妆",
    en: "Wedding Day Service"
  },
  {
    id: "photoshoot",
    zh: "约拍妆造",
    en: "Photoshoot Makeup"
  },
  {
    id: "graduation",
    zh: "毕业妆造",
    en: "Graduation Makeup"
  }
];

const bookingCopy = {
  zh: {
    bookingKicker: "预约申请",
    bookingIntro: "选择日期和时间后送出申请。我确认后，预约才会正式成立。",
    calendarKicker: "日历",
    calendarTitle: "选择日期",
    timeKicker: "可预约时间",
    timeTitle: "选择时间",
    requestKicker: "Request Booking",
    requestTitle: "预约资料",
    serviceLabel: "服务",
    nameLabel: "姓名",
    contactRequirement: "请至少留下一个联系方式：微信、小红书、电话或 Instagram。",
    wechatFormLabel: "微信名称",
    rednoteFormLabel: "小红书名称",
    phoneFormLabel: "电话",
    instagramFormLabel: "Instagram",
    locationLabel: "地点",
    eventLabel: "活动 / 场合",
    notesLabel: "备注",
    submitButton: "送出预约申请",
    selectDate: "请先选择日期。",
    loadingTimes: "正在读取 Google Calendar 可预约时间...",
    mockMode: "无法读取 Google Calendar。请切换为无痕模式，或只登入一个 Google 帐号后再试。",
    selectTime: "选择一个时间后填写资料。",
    noSlots: "这一天暂时没有可预约时间。",
    booked: "不可预约",
    available: "可预约",
    selected: "已选择",
    summaryEmpty: "请选择日期和时间。",
    summary: "预约申请：{date} {time}，服务时长约 3 小时，不含车程。",
    submitMissingTime: "请先选择日期和时间。",
    submitMissingContact: "请至少填写一个联系方式：微信、小红书、电话或 Instagram。",
    submitSending: "正在送出申请...",
    submitSuccess: "已送出申请。我会收到 Email，确认后会把预约加入 Google Calendar。",
    submitError: "送出失败，请稍后再试，或直接用微信/Instagram 联系我。",
    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    weekdays: ["日", "一", "二", "三", "四", "五", "六"]
  },
  en: {
    bookingKicker: "Booking Request",
    bookingIntro: "Pick a date and time, then send a request. Your appointment is confirmed after I accept it.",
    calendarKicker: "Calendar",
    calendarTitle: "Choose a date",
    timeKicker: "Available Time",
    timeTitle: "Select a time",
    requestKicker: "Request Booking",
    requestTitle: "Your details",
    serviceLabel: "Service",
    nameLabel: "Name",
    contactRequirement: "Leave at least one contact method: WeChat, RedNote, phone, or Instagram.",
    wechatFormLabel: "WeChat name",
    rednoteFormLabel: "RedNote name",
    phoneFormLabel: "Phone",
    instagramFormLabel: "Instagram",
    locationLabel: "Location",
    eventLabel: "Event",
    notesLabel: "Notes",
    submitButton: "Submit Request",
    selectDate: "Choose a date first.",
    loadingTimes: "Checking Google Calendar availability...",
    mockMode: "Unable to read Google Calendar. Please try Incognito mode, or sign in with only one Google account.",
    selectTime: "Select a time, then fill out your details.",
    noSlots: "No available times for this date.",
    booked: "Booked",
    available: "Available",
    selected: "Selected",
    summaryEmpty: "Choose a date and time.",
    summary: "Request: {date} at {time}. Service duration is about 3 hours, excluding travel.",
    submitMissingTime: "Choose a date and time first.",
    submitMissingContact: "Leave at least one contact method: WeChat, RedNote, phone, or Instagram.",
    submitSending: "Sending request...",
    submitSuccess: "Request sent. I will receive an email and add it to Google Calendar after accepting.",
    submitError: "Could not send the request. Please try again later or contact me on WeChat/Instagram.",
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  }
};

const bookingState = {
  visibleMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  selectedDate: "",
  selectedTime: "",
  slotsByDate: {}
};

function initBooking() {
  if (!document.getElementById("bookingCalendar")) return;

  document.getElementById("prevMonth").addEventListener("click", () => changeBookingMonth(-1));
  document.getElementById("nextMonth").addEventListener("click", () => changeBookingMonth(1));
  document.getElementById("bookingForm").addEventListener("submit", submitBookingRequest);
  window.addEventListener("languagechange", renderBooking);

  renderServiceOptions();
  renderBooking();
  selectBookingDate(toDateKey(new Date()));
  handleBookingActionFromUrl();
}

function getBookingLanguage() {
  return document.documentElement.lang === "en" ? "en" : "zh";
}

function getBookingCopy(key) {
  const lang = getBookingLanguage();
  return bookingCopy[lang][key] || bookingCopy.en[key] || key;
}

function renderBooking() {
  const lang = getBookingLanguage();
  const copy = bookingCopy[lang];

  document.querySelectorAll("[data-booking-i18n]").forEach(element => {
    const key = element.dataset.bookingI18n;
    if (copy[key]) element.textContent = copy[key];
  });

  renderServiceOptions();
  renderWeekdays();
  renderCalendar();
  renderTimeSlots();
  updateBookingSummary();
}

function renderServiceOptions() {
  const select = document.getElementById("bookingService");
  if (!select) return;
  const currentValue = select.value;
  const lang = getBookingLanguage();
  select.innerHTML = bookingServices.map(service => (
    `<option value="${service.id}">${service[lang] || service.en}</option>`
  )).join("");
  if (currentValue) select.value = currentValue;
}

function renderWeekdays() {
  const container = document.querySelector(".calendar-weekdays");
  if (!container) return;
  container.innerHTML = bookingCopy[getBookingLanguage()].weekdays
    .map(day => `<span>${day}</span>`)
    .join("");
}

function changeBookingMonth(direction) {
  bookingState.visibleMonth = new Date(
    bookingState.visibleMonth.getFullYear(),
    bookingState.visibleMonth.getMonth() + direction,
    1
  );
  renderCalendar();
}

function renderCalendar() {
  const calendar = document.getElementById("bookingCalendar");
  const label = document.getElementById("calendarMonthLabel");
  if (!calendar || !label) return;

  const lang = getBookingLanguage();
  const month = bookingState.visibleMonth;
  const monthName = bookingCopy[lang].monthNames[month.getMonth()];
  label.textContent = lang === "en" ? `${monthName} ${month.getFullYear()}` : `${month.getFullYear()} ${monthName}`;

  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const todayKey = toDateKey(new Date());
  const cells = [];

  for (let index = 0; index < firstDay.getDay(); index += 1) {
    cells.push('<span class="calendar-day empty"></span>');
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    const dateKey = toDateKey(date);
    const isPast = dateKey < todayKey;
    const isSelected = dateKey === bookingState.selectedDate;
    cells.push(`
      <button
        type="button"
        class="calendar-day ${isSelected ? "selected" : ""}"
        data-date="${dateKey}"
        ${isPast ? "disabled" : ""}
        aria-pressed="${isSelected ? "true" : "false"}"
      >
        <span>${day}</span>
      </button>
    `);
  }

  calendar.innerHTML = cells.join("");
  calendar.querySelectorAll("[data-date]").forEach(button => {
    button.addEventListener("click", () => selectBookingDate(button.dataset.date));
  });
}

async function selectBookingDate(dateKey) {
  bookingState.selectedDate = dateKey;
  bookingState.selectedTime = "";
  document.getElementById("bookingDate").value = dateKey;
  document.getElementById("bookingTime").value = "";
  renderCalendar();
  setBookingStatus(getBookingCopy("loadingTimes"));
  updateBookingSummary();

  try {
    const response = await fetchAvailability(dateKey);
    bookingState.slotsByDate[dateKey] = response.slots || [];
    if (response.mock) setBookingStatus(getBookingCopy("mockMode"));
    else setBookingStatus("");
  } catch (error) {
    bookingState.slotsByDate[dateKey] = buildMockSlots(dateKey);
    setBookingStatus(getBookingCopy("mockMode"));
  }

  renderTimeSlots();
}

async function fetchAvailability(dateKey) {
  if (!BOOKING_API_URL) {
    return { mock: true, slots: buildMockSlots(dateKey) };
  }

  return callBookingApi("availability", {
    date: dateKey,
    duration: bookingSettings.serviceDurationMinutes,
    interval: bookingSettings.slotIntervalMinutes
  });
}

function renderTimeSlots() {
  const container = document.getElementById("timeSlots");
  const dateLabel = document.getElementById("selectedDateLabel");
  if (!container || !dateLabel) return;

  if (!bookingState.selectedDate) {
    dateLabel.textContent = "";
    container.innerHTML = `<p class="empty-booking-state">${getBookingCopy("selectDate")}</p>`;
    return;
  }

  dateLabel.textContent = formatDisplayDate(bookingState.selectedDate);
  const slots = bookingState.slotsByDate[bookingState.selectedDate] || [];

  if (!slots.length) {
    container.innerHTML = `<p class="empty-booking-state">${getBookingCopy("noSlots")}</p>`;
    return;
  }

  container.innerHTML = slots.map(slot => {
    const selected = slot.time === bookingState.selectedTime;
    const status = slot.available ? getBookingCopy("available") : getBookingCopy("booked");
    return `
      <button
        type="button"
        class="time-slot ${selected ? "selected" : ""} ${slot.available ? "" : "booked"}"
        data-time="${slot.time}"
        ${slot.available ? "" : "disabled"}
        aria-pressed="${selected ? "true" : "false"}"
      >
        <strong>${formatDisplayTime(slot.time)}</strong>
        <span>${selected ? getBookingCopy("selected") : status}</span>
      </button>
    `;
  }).join("");

  container.querySelectorAll("[data-time]").forEach(button => {
    button.addEventListener("click", () => selectBookingTime(button.dataset.time));
  });
}

function selectBookingTime(time) {
  bookingState.selectedTime = time;
  document.getElementById("bookingTime").value = time;
  renderTimeSlots();
  updateBookingSummary();
}

function updateBookingSummary() {
  const summary = document.getElementById("bookingSummary");
  const submit = document.getElementById("submitBooking");
  if (!summary || !submit) return;

  if (!bookingState.selectedDate || !bookingState.selectedTime) {
    summary.textContent = getBookingCopy("summaryEmpty");
    submit.disabled = true;
    return;
  }

  summary.textContent = getBookingCopy("summary")
    .replace("{date}", formatDisplayDate(bookingState.selectedDate))
    .replace("{time}", formatDisplayTime(bookingState.selectedTime));
  submit.disabled = false;
}

async function submitBookingRequest(event) {
  event.preventDefault();

  const message = document.getElementById("bookingFormMessage");
  const submit = document.getElementById("submitBooking");
  const form = event.currentTarget;

  if (!bookingState.selectedDate || !bookingState.selectedTime) {
    message.textContent = getBookingCopy("submitMissingTime");
    return;
  }

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  const contactFields = ["wechat", "rednote", "phone", "instagram"];
  const hasContact = contactFields.some(field => (payload[field] || "").trim());
  if (!hasContact) {
    message.textContent = getBookingCopy("submitMissingContact");
    return;
  }

  const service = bookingServices.find(item => item.id === payload.service);
  payload.serviceName = service ? service.en : payload.service;
  payload.language = getBookingLanguage();
  payload.duration = bookingSettings.serviceDurationMinutes;
  payload.timezone = bookingSettings.timezone;

  submit.disabled = true;
  message.textContent = getBookingCopy("submitSending");

  try {
    if (BOOKING_API_URL) {
      await callBookingApi("request", payload);
    } else {
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    message.textContent = getBookingCopy("submitSuccess");
    form.reset();
    bookingState.selectedTime = "";
    document.getElementById("bookingDate").value = bookingState.selectedDate;
    renderServiceOptions();
    renderTimeSlots();
    updateBookingSummary();
  } catch (error) {
    console.error("Booking request failed:", error);
    message.textContent = `${getBookingCopy("submitError")} (${error.message})`;
    updateBookingSummary();
  }
}

async function handleBookingActionFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const action = params.get("bookingAction");
  const token = params.get("token");

  if (action !== "accept" || !token) return;

  showPage("booking");
  setBookingStatus("Accepting booking request...");

  try {
    const response = await callBookingApi("accept", { token });
    setBookingStatus(response.message || "Booking accepted and added to Google Calendar.");
    window.history.replaceState({}, document.title, window.location.pathname);
  } catch (error) {
    console.error("Booking accept failed:", error);
    setBookingStatus(`Accept failed: ${error.message}`);
  }
}

function callBookingApi(action, params) {
  return new Promise((resolve, reject) => {
    const callbackName = `bookingCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const url = new URL(BOOKING_API_URL);
    url.searchParams.set("action", action);
    url.searchParams.set("callback", callbackName);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value || ""));

    const script = document.createElement("script");
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("Booking API timeout"));
    }, 12000);

    function cleanup() {
      window.clearTimeout(timer);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = data => {
      cleanup();
      if (data && data.ok !== false) resolve(data);
      else reject(new Error(data?.error || "Booking API error"));
    };

    script.onerror = () => {
      cleanup();
      reject(new Error(`Booking API script failed: ${url.toString()}`));
    };

    script.src = url.toString();
    document.body.appendChild(script);
  });
}

function buildMockSlots(dateKey) {
  const slots = [];
  const date = new Date(`${dateKey}T00:00:00`);
  const mockBookedHours = date.getDate() % 2 === 0 ? [9, 17] : [10, 14];

  for (
    let minutes = bookingSettings.dayStartHour * 60;
    minutes <= bookingSettings.dayEndHour * 60 - bookingSettings.serviceDurationMinutes;
    minutes += bookingSettings.slotIntervalMinutes
  ) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    slots.push({
      time,
      available: !mockBookedHours.includes(hour)
    });
  }

  return slots;
}

function setBookingStatus(message) {
  const status = document.getElementById("bookingStatus");
  if (status) status.textContent = message;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  return new Intl.DateTimeFormat(getBookingLanguage() === "en" ? "en-US" : "zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "short"
  }).format(date);
}

function formatDisplayTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat(getBookingLanguage() === "en" ? "en-US" : "zh-CN", {
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

initBooking();
