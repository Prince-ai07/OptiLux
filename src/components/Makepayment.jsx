import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../css/Makepayment.css';

const Makepayment = () => {

  const { product, cart, total } = useLocation().state || {};
  const isCartCheckout = cart && cart.length > 0;
  const navigate       = useNavigate();
  const img_url        = "https://jeremiahprince.alwaysdata.net/static/images/";

  // ── Delivery logic ─────────────────────────────────────────────────────────
  // Free delivery on orders above Kes 2,000 (as advertised on the homepage).
  // Below Kes 2,000 a flat Kes 200 delivery fee applies.
  const FREE_DELIVERY_THRESHOLD = 2000;
  const DELIVERY_FEE            = 200;

  const productAmount  = isCartCheckout ? total : product?.product_cost;
  const isFreeDelivery = productAmount >= FREE_DELIVERY_THRESHOLD;
  const deliveryCharge = isFreeDelivery ? 0 : DELIVERY_FEE;
  const grandTotal     = Number(productAmount) + deliveryCharge;

  // ── Form state ─────────────────────────────────────────────────────────────
  const [number,   setNumber]   = useState("");
  const [location, setLocation] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState("");
  const [error,    setError]    = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location.trim()) {
      setError("Please enter your delivery location.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("phone",   number);
      formdata.append("amount",  grandTotal);

      const response = await axios.post(
        "https://jeremiahprince.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="pay-page">

      {/* Ambient background blobs */}
      <div className="pay-blob pay-blob-1"></div>
      <div className="pay-blob pay-blob-2"></div>

      {/* Back button */}
      <button className="pay-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="pay-container">

        {/* ── LEFT: Order Summary ──────────────────────────────────────────── */}
        <div className="pay-summary">
          <p className="pay-label">Order Summary</p>

          {isCartCheckout ? (
            <>
              <h2 className="pay-summary-title">Cart Checkout</h2>
              <div className="pay-items-list">
                {cart.map((item, i) => (
                  <div key={i} className="pay-item">
                    <div className="pay-item-img">
                      <img
                        src={img_url + item.product_photo}
                        alt={item.product_name}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </div>
                    <div className="pay-item-info">
                      <p className="pay-item-name">{item.product_name}</p>
                      <p className="pay-item-price">Kes {Number(item.product_cost).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="pay-product-img">
                <img src={img_url + product?.product_photo} alt={product?.product_name} />
              </div>
              <h2 className="pay-summary-title">{product?.product_name}</h2>
              <p className="pay-product-desc">{product?.product_description}</p>
            </>
          )}

          {/* ── Price breakdown ───────────────────────────────────────────── */}
          <div className="pay-breakdown">
            <div className="pay-breakdown-row">
              <span>Subtotal</span>
              <span>Kes {Number(productAmount).toLocaleString()}</span>
            </div>
            <div className="pay-breakdown-row">
              <span>Delivery</span>
              {isFreeDelivery ? (
                <span className="pay-free">FREE 🎉</span>
              ) : (
                <span>Kes {DELIVERY_FEE.toLocaleString()}</span>
              )}
            </div>
            {!isFreeDelivery && (
              <div className="pay-free-hint">
                Add Kes {(FREE_DELIVERY_THRESHOLD - productAmount).toLocaleString()} more for free delivery
              </div>
            )}
            <div className="pay-breakdown-divider"></div>
            <div className="pay-breakdown-row total">
              <span>Total</span>
              <span>Kes {Number(grandTotal).toLocaleString()}</span>
            </div>
          </div>

          {/* ── Security badges ───────────────────────────────────────────── */}
          <div className="pay-badges">
            <span>🔒 Secure Payment</span>
            <span>✅ 100% Authentic</span>
            <span>🔄 7-Day Returns</span>
          </div>
        </div>

        {/* ── RIGHT: Payment Form ──────────────────────────────────────────── */}
        <div className="pay-form-side">
          <p className="pay-label">Complete Purchase</p>
          <h2 className="pay-form-title">Lipa na M-Pesa</h2>
          <p className="pay-form-sub">
            Enter your phone number and delivery location. You will receive
            an M-Pesa STK push to complete the payment.
          </p>

          {loading && (
            <div className="pay-loader-wrap"><Loader /></div>
          )}

          {success ? (
            <div className="pay-success-card">
              <div className="pay-success-icon">✓</div>
              <h3>Payment Initiated!</h3>
              <p>{success}</p>
              <button className="pay-home-btn" onClick={() => navigate("/")}>
                Back to Shop →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pay-form">

              {error && (
                <div className="pay-error-banner">✕ {error}</div>
              )}

              {/* M-Pesa Number */}
              <div className="pay-field">
                <label>M-Pesa Phone Number *</label>
                <div className="pay-input-wrap">
                  <span className="pay-input-prefix">📱</span>
                  <input
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <p className="pay-field-hint">
                  Use the number registered with M-Pesa. You will get a pop-up to confirm.
                </p>
              </div>

              {/* Delivery Location */}
              <div className="pay-field">
                <label>Delivery Location *</label>
                <div className="pay-input-wrap">
                  <span className="pay-input-prefix">📍</span>
                  <input
                    type="text"
                    placeholder="e.g. Westlands, Nairobi"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <p className="pay-field-hint">
                  {isFreeDelivery
                    ? "🎉 You qualify for FREE delivery anywhere in Kenya!"
                    : "Delivery fee of Kes 200 applies for orders below Kes 2,000."}
                </p>
              </div>

              {/* Delivery time info */}
              <div className="pay-delivery-info">
                <div className="pay-delivery-row">
                  <span>🏙️</span>
                  <span><strong>Nairobi</strong> — 1 to 2 business days</span>
                </div>
                <div className="pay-delivery-row">
                  <span>🌊</span>
                  <span><strong>Mombasa & Kisumu</strong> — 2 to 3 business days</span>
                </div>
                <div className="pay-delivery-row">
                  <span>🗺️</span>
                  <span><strong>Rest of Kenya</strong> — 3 to 5 business days</span>
                </div>
              </div>

              <button
                type="submit"
                className="pay-submit-btn"
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay Kes ${Number(grandTotal).toLocaleString()} →`}
              </button>

              <p className="pay-mpesa-note">
                After clicking Pay, check your phone for the M-Pesa prompt and enter your PIN to confirm.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Makepayment;