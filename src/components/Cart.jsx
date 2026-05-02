import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Cart.css";

const IMG = "https://jeremiahprince.alwaysdata.net/static/images/";
const FREE_DELIVERY_THRESHOLD = 2000;
const DELIVERY_FEE            = 200;

const Cart = () => {
  const navigate = useNavigate();

  // ── Cart state ─────────────────────────────────────────────────────────────
  // Each item has an extra `qty` field we manage locally.
  // When first loaded from localStorage the items won't have qty,
  // so we default to 1.
  const [items,   setItems]   = useState([]);
  const [removed, setRemoved] = useState([]); // indices fading out

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    // Group duplicate products by product_id and add qty
    const grouped = [];
    saved.forEach((product) => {
      const existing = grouped.find(
        (g) => g.product_id === product.product_id
      );
      if (existing) {
        existing.qty += 1;
      } else {
        grouped.push({ ...product, qty: 1 });
      }
    });
    setItems(grouped);
  }, []);

  // ── Persist to localStorage whenever items change ──────────────────────────
  const persist = (newItems) => {
    // Flatten back: each item repeated qty times (for Makepayment compatibility)
    const flat = newItems.flatMap((item) =>
      Array(item.qty).fill({ ...item, qty: undefined })
    );
    localStorage.setItem("cart", JSON.stringify(flat));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ── Quantity controls ──────────────────────────────────────────────────────
  const changeQty = (index, delta) => {
    const updated = items.map((item, i) => {
      if (i !== index) return item;
      const newQty = item.qty + delta;
      if (newQty < 1) return item; // don't go below 1 — use remove for that
      return { ...item, qty: newQty };
    });
    setItems(updated);
    persist(updated);
  };

  // ── Remove item with fade-out animation ───────────────────────────────────
  const removeItem = (index) => {
    setRemoved((prev) => [...prev, index]);
    setTimeout(() => {
      const updated = items.filter((_, i) => i !== index);
      setItems(updated);
      persist(updated);
      setRemoved((prev) => prev.filter((i) => i !== index));
    }, 350); // matches the CSS transition duration
  };

  // ── Price calculations ─────────────────────────────────────────────────────
  const subtotal       = items.reduce((sum, item) => sum + Number(item.product_cost) * item.qty, 0);
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryCharge = isFreeDelivery ? 0 : subtotal === 0 ? 0 : DELIVERY_FEE;
  const grandTotal     = subtotal + deliveryCharge;

  // Progress toward free delivery (0–100%)
  const freeDeliveryProgress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const amountLeft           = FREE_DELIVERY_THRESHOLD - subtotal;

  // ── Checkout — pass flat cart + total to Makepayment ──────────────────────
  const handleCheckout = () => {
    const flat = items.flatMap((item) =>
      Array(item.qty).fill({
        product_id:          item.product_id,
        product_name:        item.product_name,
        product_cost:        item.product_cost,
        product_photo:       item.product_photo,
        product_description: item.product_description,
      })
    );
    navigate("/makepayment", { state: { cart: flat, total: grandTotal } });
  };

  // ══════════════════════════════════════════════════════════════════════════
  // EMPTY STATE
  // ══════════════════════════════════════════════════════════════════════════
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-blob cart-blob-1"></div>
        <div className="cart-blob cart-blob-2"></div>

        <div className="cart-empty">
          <div className="cart-empty-icon">
            <svg viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="rgba(201,168,76,0.2)" strokeWidth="1.5"/>
              <circle cx="28" cy="52" r="5" stroke="#c9a84c" strokeWidth="1.5" fill="none"/>
              <circle cx="52" cy="52" r="5" stroke="#c9a84c" strokeWidth="1.5" fill="none"/>
              <path d="M18 22h6l8 22h24l6-16H30" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="40" cy="32" r="1.5" fill="#c9a84c"/>
            </svg>
          </div>
          <p className="cart-empty-tag">Nothing here yet</p>
          <h2 className="cart-empty-title">Your Cart is Empty</h2>
          <p className="cart-empty-sub">
            Discover our collection of premium eyewear and find your perfect pair.
          </p>
          <button className="cart-shop-btn" onClick={() => navigate("/products")}>
            Browse Collection →
          </button>
          <button className="cart-home-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // CART WITH ITEMS
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="cart-page">
      <div className="cart-blob cart-blob-1"></div>
      <div className="cart-blob cart-blob-2"></div>

      <div className="cart-wrapper">

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div className="cart-header">
          <div>
            <p className="cart-header-tag">Your Selection</p>
            <h1 className="cart-header-title">Shopping Cart</h1>
          </div>
          <button className="cart-continue-btn" onClick={() => navigate("/products")}>
            ← Continue Shopping
          </button>
        </div>

        <div className="cart-layout">

          {/* ── LEFT: Item list ────────────────────────────────────────────── */}
          <div className="cart-items-col">

            {/* Free delivery progress bar */}
            {!isFreeDelivery && subtotal > 0 && (
              <div className="cart-delivery-bar">
                <div className="cart-delivery-bar-track">
                  <div
                    className="cart-delivery-bar-fill"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  ></div>
                </div>
                <p className="cart-delivery-bar-text">
                  Add <strong>Kes {amountLeft.toLocaleString()}</strong> more for free delivery 🚚
                </p>
              </div>
            )}

            {isFreeDelivery && (
              <div className="cart-delivery-achieved">
                🎉 You've unlocked <strong>FREE delivery!</strong>
              </div>
            )}

            {/* Column labels */}
            <div className="cart-col-labels">
              <span>Product</span>
              <span>Qty</span>
              <span>Price</span>
              <span></span>
            </div>

            {/* Items */}
            <div className="cart-items-list">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`cart-item ${removed.includes(index) ? "removing" : ""}`}
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  {/* Product image */}
                  <div className="cart-item-img">
                    <img
                      src={IMG + item.product_photo}
                      alt={item.product_name}
                      onError={(e) => { e.target.style.opacity = "0.3"; }}
                    />
                  </div>

                  {/* Product info */}
                  <div className="cart-item-info">
                    <span className="cart-item-cat">
                      {item.category_name || "Eyewear"}
                    </span>
                    <h3 className="cart-item-name">{item.product_name}</h3>
                    <p className="cart-item-desc">
                      {item.product_description?.slice(0, 70)}...
                    </p>
                    {/* Unit price (shown on mobile below name) */}
                    <span className="cart-item-unit-price">
                      Kes {Number(item.product_cost).toLocaleString()} each
                    </span>
                  </div>

                  {/* Quantity control */}
                  <div className="cart-item-qty">
                    <button
                      className="cart-qty-btn"
                      onClick={() => changeQty(index, -1)}
                      disabled={item.qty <= 1}
                    >
                      −
                    </button>
                    <span className="cart-qty-value">{item.qty}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => changeQty(index, 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="cart-item-total">
                    Kes {(Number(item.product_cost) * item.qty).toLocaleString()}
                  </div>

                  {/* Remove */}
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeItem(index)}
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Clear all */}
            <div className="cart-clear-row">
              <button
                className="cart-clear-btn"
                onClick={() => {
                  if (window.confirm("Remove all items from your cart?")) {
                    setItems([]);
                    localStorage.removeItem("cart");
                    window.dispatchEvent(new Event("cartUpdated"));
                  }
                }}
              >
                🗑 Clear Cart
              </button>
            </div>
          </div>

          {/* ── RIGHT: Order summary (sticky) ──────────────────────────────── */}
          <div className="cart-summary-col">
            <div className="cart-summary-card">
              <p className="cart-summary-tag">Order Summary</p>

              <div className="cart-summary-rows">
                <div className="cart-summary-row">
                  <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span>Kes {subtotal.toLocaleString()}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Delivery</span>
                  {isFreeDelivery ? (
                    <span className="cart-summary-free">FREE 🎉</span>
                  ) : (
                    <span>Kes {DELIVERY_FEE.toLocaleString()}</span>
                  )}
                </div>
              </div>

              <div className="cart-summary-divider"></div>

              <div className="cart-summary-total">
                <span>Total</span>
                <span>Kes {grandTotal.toLocaleString()}</span>
              </div>

              <button className="cart-checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout →
              </button>

              <div className="cart-summary-badges">
                <span>🔒 Secure Checkout</span>
                <span>📱 M-Pesa Accepted</span>
                <span>🔄 7-Day Returns</span>
              </div>

              {/* What happens next */}
              <div className="cart-summary-steps">
                <p className="cart-summary-steps-title">What happens next?</p>
                {[
                  { n: "1", t: "Enter your M-Pesa number" },
                  { n: "2", t: "Confirm the STK push on your phone" },
                  { n: "3", t: "Provide your delivery location" },
                  { n: "4", t: "We deliver to your door" },
                ].map((step) => (
                  <div key={step.n} className="cart-summary-step">
                    <span className="cart-step-num">{step.n}</span>
                    <span>{step.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;