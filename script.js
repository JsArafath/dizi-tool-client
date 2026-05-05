/* =============================================
   DIGZ.STORE CLONE — SCRIPT
   ============================================= */

// ── PRODUCT DATA ──────────────────────────────
const products = [
  {
    id: 1,
    icon: "🔵",
    iconBg: "#f0f7ff",
    name: "Veo3 + Anti Ultra 25K (no watermark) credit warranty 24 hours",
    shortDesc: "Credits can only be used for veo3, not for antigravity. Note: This product can be used with anti, but the quality is not guaranteed.",
    fullDesc: "Google Veo3 Ultra account with 25,000 credits and Antigravity access. 24-hour warranty period. Perfect for quick video generation projects. Credits are non-transferable between services.",
    stock: 47,
    sold: 7174,
    usdt: 2.50,
    inr: 259,
  },
  {
    id: 2,
    icon: "🔵",
    iconBg: "#f0f7ff",
    name: "Veo3 + Anti Ultra 25k (no watermark) 30-Day credit guarantee",
    shortDesc: "Google Veo3 Ultra account with 25,000 credits and Antigravity access. Extended 30-day warranty period.",
    fullDesc: "Full Google Veo3 Ultra account including Antigravity access with 25,000 credits. Our most popular plan with an extended 30-day credit guarantee. Ideal for long-term creative projects.",
    stock: 55,
    sold: 1527,
    usdt: 10.50,
    inr: 1129,
  },
  {
    id: 3,
    icon: "🅰️",
    iconBg: "#f0f4ff",
    name: "Admin Family Ultra 25k Credit 1 month with 3 days warranty",
    shortDesc: "Premium Google Workspace family slot with Antigravity Ultra, 25,000 credits, 30TB Google Drive, Nano Banana Pro…",
    fullDesc: "Admin-level Google Workspace family slot with Antigravity Ultra access and 25,000 credits. Includes 30TB Google Drive storage and Nano Banana Pro features. Comes with a 3-day replacement warranty.",
    stock: 2,
    sold: 1,
    usdt: 44.50,
    inr: 4459,
  },
  {
    id: 4,
    icon: "🅰️",
    iconBg: "#f0f4ff",
    name: "Slot Antigravity Ultra 5K Credit 1 year full warranty",
    shortDesc: "Premium Google Workspace family slot with Antigravity Ultra, 5,000 credits, 30TB Google Drive, Nano Banana Pro…",
    fullDesc: "One-year Google Workspace family slot with Antigravity Ultra access and 5,000 credits. Includes 30TB Google Drive storage and Nano Banana Pro. Full 1-year warranty with credit replacement guarantee.",
    stock: 16,
    sold: 27,
    usdt: 18.00,
    inr: 1899,
  },
  {
    id: 5,
    icon: "🅰️",
    iconBg: "#f0f4ff",
    name: "Slot Antigravity Ultra 0 Credit 1 year full warranty",
    shortDesc: "Premium Google Workspace family slot with Antigravity Ultra, 0 credits, 30TB Google Drive, Nano Banana Pro, and…",
    fullDesc: "One-year Google Workspace family slot with Antigravity Ultra access and 0 starting credits. Includes 30TB Google Drive storage and Nano Banana Pro. Full 1-year slot warranty — purchase credits separately.",
    stock: 17,
    sold: 20,
    usdt: 9.50,
    inr: 999,
  },
  {
    id: 6,
    icon: "⭕",
    iconBg: "#1a1a1a",
    name: "GIFT KLING ULTRA 26K CREDIT (2 DAYS warranty)",
    shortDesc: "Premium digital product with fast delivery.",
    fullDesc: "Kling Ultra account gifted with 26,000 credits. 2-day warranty included. Fast delivery within 60 minutes of payment confirmation. One of our most popular AI video tools.",
    stock: 2,
    sold: 0,
    usdt: 12.00,
    inr: 1259,
  },
  {
    id: 7,
    icon: "🟠",
    iconBg: "#fff7f0",
    name: "ChatGPT Plus 1 Month Shared Account",
    shortDesc: "Access to ChatGPT Plus features including GPT-4, DALL-E image generation, and priority access during peak times.",
    fullDesc: "Shared ChatGPT Plus account for 1 month. Includes full GPT-4 access, DALL-E 3 image generation, Browse with Bing, Advanced Data Analysis, and all latest plugins. Delivered within 60 minutes.",
    stock: 30,
    sold: 892,
    usdt: 5.00,
    inr: 529,
  },
  {
    id: 8,
    icon: "🎵",
    iconBg: "#f0fff4",
    name: "Spotify Premium 3 Months Individual",
    shortDesc: "Ad-free music streaming with offline downloads and unlimited skips.",
    fullDesc: "3 months of Spotify Premium Individual plan. Enjoy ad-free listening, offline downloads on up to 5 devices, unlimited skips, and high-quality audio streaming at 320kbps.",
    stock: 88,
    sold: 3410,
    usdt: 4.50,
    inr: 469,
  },
  {
    id: 9,
    icon: "📺",
    iconBg: "#fff0f0",
    name: "Netflix Premium UHD 1 Month",
    shortDesc: "4K Ultra HD Netflix Premium plan for 1 month — watch on 4 screens simultaneously.",
    fullDesc: "Full Netflix Premium UHD subscription for 1 month. Stream in 4K Ultra HD on 4 devices simultaneously. Includes access to all Netflix Originals, movies, and TV shows. Instant delivery.",
    stock: 45,
    sold: 5620,
    usdt: 6.50,
    inr: 679,
  },
];

// ── CART STATE ─────────────────────────────────
let cart = [];

// ── RENDER PRODUCTS ────────────────────────────
function renderProducts() {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = products.map((p) => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-card-top">
        <div class="product-icon" style="background:${p.iconBg}">${p.icon}</div>
        <div class="product-card-info">
          <h3 class="product-name">${p.name}</h3>
          <div class="product-badges">
            <span class="badge badge-warranty">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Warranty
            </span>
            <span class="badge badge-refund">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.27"/></svg>
              Refund Policy
            </span>
            <span class="badge badge-speed">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              60 min
            </span>
          </div>
        </div>
      </div>

      <div>
        <p class="product-desc">${p.shortDesc}</p>
        <button class="view-details-btn" id="vd-${p.id}" onclick="toggleDetails(${p.id})">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          View details
        </button>
        <div class="product-full-desc" id="fd-${p.id}">${p.fullDesc}</div>
      </div>

      <div class="stock-row">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        <span class="stock-in">${p.stock} in stock</span>
        <span class="stock-divider">|</span>
        <span class="stock-sold">${p.sold.toLocaleString()} sold</span>
      </div>

      <div class="pricing-row">
        <div class="price-box">
          <div class="price-label">BINANCE</div>
          <div class="price-value">$${p.usdt.toFixed(2)}</div>
          <div class="price-currency">USDT</div>
        </div>
        <div class="price-box">
          <div class="price-label">UPI / CARDS</div>
          <div class="price-value">₹${p.inr}</div>
          <div class="price-currency">INR</div>
        </div>
      </div>

      <button class="add-to-cart-btn" id="atc-${p.id}" onclick="addToCart(${p.id})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        Add to Cart
      </button>
    </article>
  `).join("");
}

// ── TOGGLE PRODUCT DETAILS ─────────────────────
function toggleDetails(id) {
  const btn = document.getElementById(`vd-${id}`);
  const desc = document.getElementById(`fd-${id}`);
  const isOpen = desc.classList.contains("open");
  desc.classList.toggle("open", !isOpen);
  btn.classList.toggle("open", !isOpen);
  btn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="${isOpen ? "6 9 12 15 18 9" : "18 15 12 9 6 15"}"/>
    </svg>
    ${isOpen ? "View details" : "Hide details"}
  `;
}

// ── CART LOGIC ─────────────────────────────────
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    showToast(`"${product.name.slice(0, 32)}…" already in cart`);
    return;
  }

  cart.push({ ...product });
  updateCartUI();
  renderCartItems();
  showToast("Added to cart ✓");
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  const countEl = document.getElementById("cart-count");
  const count = cart.length;
  countEl.textContent = count;
  countEl.classList.toggle("visible", count > 0);
}

function renderCartItems() {
  const body = document.getElementById("cart-body");
  const empty = document.getElementById("cart-empty");
  const itemsList = document.getElementById("cart-items");
  const footer = document.getElementById("cart-footer");

  if (cart.length === 0) {
    empty.style.display = "flex";
    itemsList.style.display = "none";
    footer.style.display = "none";
    return;
  }

  empty.style.display = "none";
  itemsList.style.display = "flex";
  footer.style.display = "flex";

  itemsList.innerHTML = cart.map((item) => `
    <li class="cart-item">
      <div class="cart-item-icon" style="background:${item.iconBg}">${item.icon}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name.length > 50 ? item.name.slice(0, 50) + "…" : item.name}</div>
        <div class="cart-item-price">$${item.usdt.toFixed(2)} USDT · ₹${item.inr} INR</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove from cart">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </li>
  `).join("");

  const totalUsdt = cart.reduce((sum, i) => sum + i.usdt, 0);
  const totalInr  = cart.reduce((sum, i) => sum + i.inr, 0);
  document.getElementById("cart-total-usdt").textContent = `$${totalUsdt.toFixed(2)}`;
  document.getElementById("cart-total-inr").textContent  = `₹${totalInr}`;
}

// ── CART DRAWER OPEN / CLOSE ───────────────────
function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ── TOAST ─────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

// ── INIT ───────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCartItems();

  document.getElementById("cart-btn").addEventListener("click", openCart);
  document.getElementById("cart-close-btn").addEventListener("click", closeCart);
  document.getElementById("cart-overlay").addEventListener("click", closeCart);

  // Escape key closes cart
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  // Sticky header shadow on scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 8
      ? "0 2px 12px rgba(0,0,0,.08)"
      : "none";
  }, { passive: true });
});
