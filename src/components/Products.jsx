import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "../css/Products.css";

const IMG     = "https://jeremiahprince.alwaysdata.net/static/images/";
const API     = "https://jeremiahprince.alwaysdata.net/api";
const PER_PAGE = 12;

// ── Toast notification (add to cart feedback) ──────────────────────────────
const Toast = ({ message, visible }) => (
  <div className={`prod-toast ${visible ? "prod-toast-visible" : ""}`}>
    ✓ {message}
  </div>
);

const Products = () => {
  const navigate = useNavigate();

  // ── Data state ─────────────────────────────────────────────────────────────
  const [products,         setProducts]         = useState([]);
  const [categories,       setCategories]       = useState([]);
  const [loading,          setLoading]          = useState(false);

  // ── UI state ───────────────────────────────────────────────────────────────
  const [search,           setSearch]           = useState("");
  const [showSuggestions,  setShowSuggestions]  = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage,      setCurrentPage]      = useState(1);
  const [cart,             setCart]             = useState([]);
  const [cartCount,        setCartCount]        = useState(0);
  const [toast,            setToast]            = useState({ msg: "", visible: false });
  const [addedIds,         setAddedIds]         = useState([]); // product_ids in cart for gold dot

  const searchRef = useRef(null);

  // ── Load cart from localStorage ────────────────────────────────────────────
  useEffect(() => {
    const syncCart = () => {
      const saved = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(saved);
      setCartCount(saved.length);
      setAddedIds(saved.map((p) => p.product_id));
    };
    syncCart();
    window.addEventListener("cartUpdated", syncCart);
    return () => window.removeEventListener("cartUpdated", syncCart);
  }, []);

  // ── Fetch categories ───────────────────────────────────────────────────────
  useEffect(() => {
    axios
      .get(`${API}/get_categories`)
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

  // ── Fetch products when category changes ───────────────────────────────────
  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? `${API}/get_products?category_id=${selectedCategory}`
      : `${API}/get_products`;

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data);
        setCurrentPage(1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  // ── Add to cart ────────────────────────────────────────────────────────────
  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
    setToast({ msg: `${product.product_name} added`, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  };

  // ── Filtering + pagination ─────────────────────────────────────────────────
  const filtered      = products.filter((p) =>
    p.product_name?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages    = Math.ceil(filtered.length / PER_PAGE);
  const start         = (currentPage - 1) * PER_PAGE;
  const paginated     = filtered.slice(start, start + PER_PAGE);

  const handleSearch  = (val) => { setSearch(val); setCurrentPage(1); setShowSuggestions(true); };
  const selectCategory = (id) => { setSelectedCategory(id); setSearch(""); };

  // Scroll to top of grid on page change
  const gridRef = useRef(null);
  const goToPage = (n) => {
    setCurrentPage(n);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Build visible page numbers (max 5 shown)
  const pageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end   = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="prod-page">

      {/* Ambient blobs */}
      <div className="prod-blob prod-blob-1"></div>
      <div className="prod-blob prod-blob-2"></div>

      {/* Toast */}
      <Toast message={toast.msg} visible={toast.visible} />

      {/* ══════════════════════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════════════════════ */}
      <nav className="prod-nav">
        {/* Logo — back to home */}
        <button className="prod-nav-logo" onClick={() => navigate("/")}>
          <svg viewBox="0 0 42 42" fill="none">
            <rect width="42" height="42" rx="10" fill="#0f172a"/>
            <circle cx="13" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
            <circle cx="29" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
            <path d="M20 22 L22 22" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6 22 L6 19"   stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
            <path d="M36 22 L36 19" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="11" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
            <circle cx="27" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
            <circle cx="21" cy="11" r="2"   fill="#facc15"/>
          </svg>
          <span>OptiLux</span>
        </button>

        {/* Search */}
        <div className="prod-search-wrap" ref={searchRef}>
          <span className="prod-search-icon">🔍</span>
          <input
            className="prod-search"
            type="text"
            placeholder="Search eyewear..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {search && (
            <button className="prod-search-clear" onClick={() => setSearch("")}>✕</button>
          )}
          {showSuggestions && search && (
            <div className="prod-suggestions">
              {filtered.length > 0 ? (
                filtered.slice(0, 6).map((p, i) => (
                  <div
                    key={i}
                    className="prod-suggestion-item"
                    onMouseDown={() => { setSearch(p.product_name); setShowSuggestions(false); }}
                  >
                    <span className="prod-suggestion-icon">👓</span>
                    {p.product_name}
                  </div>
                ))
              ) : (
                <div className="prod-suggestion-empty">No results for "{search}"</div>
              )}
            </div>
          )}
        </div>

        {/* Cart button */}
        <button className="prod-cart-btn" onClick={() => navigate("/cart")}>
          <span className="prod-cart-icon">🛒</span>
          {cartCount > 0 && (
            <span className="prod-cart-badge">{cartCount}</span>
          )}
        </button>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════════════════════════════════ */}
      <div className="prod-page-header">
        <div className="prod-page-header-inner">
          <p className="prod-page-tag">Explore</p>
          <h1 className="prod-page-title">The Collection</h1>
          <p className="prod-page-sub">
            {filtered.length} frame{filtered.length !== 1 ? "s" : ""}{" "}
            {selectedCategory
              ? `in ${categories.find((c) => c.category_id === selectedCategory)?.category_name}`
              : "across all categories"}
            {search ? ` matching "${search}"` : ""}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          CATEGORY PILLS
      ══════════════════════════════════════════════════════════════════ */}
      <div className="prod-cats-scroll-wrap">
        <div className="prod-cats">
          <button
            className={`prod-cat-pill ${selectedCategory === null ? "active" : ""}`}
            onClick={() => selectCategory(null)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.category_id}
              className={`prod-cat-pill ${selectedCategory === cat.category_id ? "active" : ""}`}
              onClick={() => selectCategory(cat.category_id)}
            >
              {cat.category_name}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          PRODUCT GRID
      ══════════════════════════════════════════════════════════════════ */}
      <div className="prod-grid-wrap" ref={gridRef}>

        {loading && (
          <div className="prod-loader-wrap"><Loader /></div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="prod-empty">
            <div className="prod-empty-icon">👓</div>
            <h3>No frames found</h3>
            <p>Try a different search term or browse all categories.</p>
            <button className="prod-empty-btn" onClick={() => { setSearch(""); setSelectedCategory(null); }}>
              Clear Filters
            </button>
          </div>
        )}

        {!loading && paginated.length > 0 && (
          <div className="prod-grid">
            {paginated.map((product, i) => (
              <div
                key={product.product_id || i}
                className="prod-card"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {/* Image area */}
                <div className="prod-card-img">
                  <img
                    src={IMG + product.product_photo}
                    alt={product.product_name}
                    onError={(e) => { e.target.style.opacity = "0.2"; }}
                  />

                  {/* Gold dot if already in cart */}
                  {addedIds.includes(product.product_id) && (
                    <div className="prod-card-in-cart" title="In your cart">●</div>
                  )}

                  {/* Hover action overlay */}
                  <div className="prod-card-overlay">
                    <button
                      className="prod-overlay-cart"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="prod-overlay-buy"
                      onClick={() => navigate("/makepayment", { state: { product } })}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* Info area */}
                <div className="prod-card-body">
                  <span className="prod-card-cat">
                    {product.category_name || "Eyewear"}
                  </span>
                  <h3 className="prod-card-name">{product.product_name}</h3>
                  <p className="prod-card-desc">
                    {product.product_description?.slice(0, 65)}...
                  </p>
                  <div className="prod-card-footer">
                    <span className="prod-card-price">
                      Kes {Number(product.product_cost).toLocaleString()}
                    </span>
                    {/* Mobile buttons (hover doesn't work on touch) */}
                    <div className="prod-card-mobile-btns">
                      <button
                        className="prod-mob-cart"
                        onClick={() => addToCart(product)}
                      >
                        + Cart
                      </button>
                      <button
                        className="prod-mob-buy"
                        onClick={() => navigate("/makepayment", { state: { product } })}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          PAGINATION
      ══════════════════════════════════════════════════════════════════ */}
      {totalPages > 1 && (
        <div className="prod-pagination">
          <button
            className="prod-page-btn arrow"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            ← Prev
          </button>

          {pageNumbers().map((n) => (
            <button
              key={n}
              className={`prod-page-btn ${currentPage === n ? "active" : ""}`}
              onClick={() => goToPage(n)}
            >
              {n}
            </button>
          ))}

          <button
            className="prod-page-btn arrow"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next →
          </button>
        </div>
      )}

      {/* Footer note */}
      <div className="prod-footer-note">
        <p>© 2026 OptiLux · Premium Eyewear · Diani, Kenya</p>
      </div>

    </div>
  );
};

export default Products;