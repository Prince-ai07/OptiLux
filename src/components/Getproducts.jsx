import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css'; 
import Loader from './Loader'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      // Auto-clear error after 4 seconds
      setTimeout(() => setStatus(null), 4000);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("https://jeremiahprince.alwaysdata.net/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
        // Auto-clear success message after 5 seconds
        setTimeout(() => {
          setStatus(null);
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(data.message);
        // Auto-clear error after 4 seconds
        setTimeout(() => {
          setStatus(null);
          setMessage("");
        }, 4000);
      }

    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      setTimeout(() => {
        setStatus(null);
        setMessage("");
      }, 4000);
    }
  };

  return (
    <div className="newsletter-form">
      <input
        type="email"
        placeholder="Enter your email..."
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setStatus(null);
        }}
        disabled={status === "loading"}
      />
      <button
        onClick={handleSubscribe}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>

      {status === "success" && (
        <p className="newsletter-msg success">✓ {message}</p>
      )}
      {status === "error" && (
        <p className="newsletter-msg error">✕ {message}</p>
      )}
    </div>
  );
};


const Getproducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);           // NEW
  const [selectedCategory, setSelectedCategory] = useState(null); // NEW

  const navigate = useNavigate();
  const img_url = "https://jeremiahprince.alwaysdata.net/static/images/";

  // Fetch categories once on mount
  useEffect(() => {
    axios.get("https://jeremiahprince.alwaysdata.net/api/get_categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  // Fetch products whenever selectedCategory changes
  const fetchProducts = async (categoryId = null) => {
    try {
      setLoading(true);
      const url = categoryId
        ? `https://jeremiahprince.alwaysdata.net/api/get_products?category_id=${categoryId}`
        : "https://jeremiahprince.alwaysdata.net/api/get_products";

      const [response] = await Promise.all([
        axios.get(url),
        new Promise((resolve) => setTimeout(resolve, 5000))
      ]);
      setProducts(response.data);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const filteredProducts = products.filter((p) =>
    p.product_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">

      {/* NAVBAR */}
     <nav className="navbar premium-nav">
  <svg className="logo-icon" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="10" fill="#0f172a"/>
    <circle cx="13" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
    <circle cx="29" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
    <path d="M20 22 L22 22" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 22 L6 19" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
    <path d="M36 22 L36 19" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="11" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
    <circle cx="27" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
    <circle cx="21" cy="11" r="2" fill="#facc15"/>
  </svg>

  {/* SEARCH */}
  <div className="search-container">
    <input
      type="text"
      placeholder="Search specs..."
      className="search-bar"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") scrollToProducts();
      }}
    />
    <span className="search-icon">🔍</span>

    {search && (
      <div className="search-suggestions">
        {filteredProducts.slice(0, 5).map((p, i) => (
          <div
            key={i}
            className="suggestion-item"
            onClick={() => {
              setSearch(p.product_name);
              scrollToProducts();
            }}
          >
            {p.product_name}
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="suggestion-item text-danger">No results found</div>
        )}
      </div>
    )}
  </div>

  {/* CATEGORY DROPDOWN */}
  <div className="nav-category-dropdown">
    <button className="nav-category-btn">
      <span className="nav-category-label">
        {selectedCategory === null
          ? "All Categories"
          : categories.find(c => c.category_id === selectedCategory)?.category_name}
      </span>
      <svg className="caret-icon" viewBox="0 0 10 6" fill="none">
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>

    <div className="nav-category-menu">
      <div
        className={`nav-category-item ${selectedCategory === null ? "active" : ""}`}
        onClick={() => setSelectedCategory(null)}
      >
        <span className="category-dot"></span>
        All Categories
      </div>
      {categories.map((cat) => (
        <div
          key={cat.category_id}
          className={`nav-category-item ${selectedCategory === cat.category_id ? "active" : ""}`}
          onClick={() => {
            setSelectedCategory(cat.category_id);
            scrollToProducts();
          }}
        >
          <span className="category-dot"></span>
          {cat.category_name}
        </div>
      ))}
    </div>
  </div>

  {/* CART */}
  <div className="cart" onClick={() => navigate("/cart")} style={{ cursor: "pointer" }}>
    🛒 {cart.length}
  </div>
</nav>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>See the World Differently</h1>
          <p>Luxury eyewear crafted for bold personalities</p>
          <button onClick={scrollToProducts} className="hero-btn">Shop Now</button>
        </div>
      </section>

      {/* PRODUCTS */}
      <div id="products-section" className="container mt-5">

        <h2 className="section-title">Featured Collection</h2>

        {loading && <Loader />}
        {error && <h4 className="text-danger">{error}</h4>}

        <div className="row">
          {filteredProducts.slice(0, 8).map((product, index) => (
            <div key={index} className="col-md-3 col-sm-6 mb-4">
              <div className="card product-card-advanced">
                <div className="image-wrapper">
                  <img src={img_url + product.product_photo} alt="product" />
                </div>
                <div className="card-body">
                  <h5 className='text-primary'>{product.product_name}</h5>
                  <p className='text-white'>{product.product_description?.slice(0, 60)}...</p>
                  <h4 className="price">Kes {product.product_cost}</h4>
                  <div className="actions">
                    <button onClick={() => addToCart(product)} className="btn-cart">Add to Cart</button>
                    <button onClick={() => navigate("/makepayment", { state: { product } })} className="btn-buy">Buy</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="view-more-btn" onClick={() => navigate("/products")}>
            View More Products →
          </button>
        </div>
      </div>

      {/* STATS BANNER */}
      <section className="stats-banner">
        <div className="stat-item"><h2>5,200+</h2><p>Happy Customers</p></div>
        <div className="stat-item"><h2>320+</h2><p>Products Listed</p></div>
        <div className="stat-item"><h2>40+</h2><p>Premium Brands</p></div>
        <div className="stat-item"><h2>4.9★</h2><p>Average Rating</p></div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <h2 className="section-title">Why Choose OptiLux?</h2>
        <p className="section-sub">We deliver more than eyewear — we deliver confidence</p>
        <div className="features-grid">
          <div className="feature-card"><div className="feature-icon">🚚</div><h4>Free Delivery</h4><p>Free shipping on all orders above Kes 2,000 nationwide.</p></div>
          <div className="feature-card"><div className="feature-icon">✅</div><h4>100% Authentic</h4><p>Every frame is sourced directly from certified brands.</p></div>
          <div className="feature-card"><div className="feature-icon">🔄</div><h4>Easy Returns</h4><p>Changed your mind? Return within 7 days, no questions asked.</p></div>
          <div className="feature-card"><div className="feature-icon">🛡️</div><h4>Secure Payments</h4><p>Your data is protected with end-to-end encryption.</p></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-sub">Real reviews from real OptiLux fans</p>
        <div className="testimonials-grid">
          {[
            { initials: "AK", name: "Amina K.", loc: "Nairobi, Kenya", stars: 5, review: "The quality is unreal. My Ray-Bans arrived in 2 days and look even better in person!" },
            { initials: "JM", name: "James M.", loc: "Mombasa, Kenya", stars: 5, review: "Super smooth checkout and the specs are exactly as described. Will definitely order again." },
            { initials: "SN", name: "Sharon N.", loc: "Kisumu, Kenya", stars: 4, review: "Loving my new frames! Customer support was very helpful when I had a sizing question." },
          ].map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
              <p>"{t.review}"</p>
              <div className="reviewer">
                <div className="avatar">{t.initials}</div>
                <div>
                  <div className="reviewer-name">{t.name}</div>
                  <div className="reviewer-loc">{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-box">
          <h2>Stay in Style 👓</h2>
          <p>Subscribe to get exclusive deals, new arrivals, and style tips delivered to your inbox.</p>
          <NewsletterForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <svg className="logo-icon" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="42" height="42" rx="10" fill="#0f172a"/>
              <circle cx="13" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
              <circle cx="29" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
              <path d="M20 22 L22 22" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 22 L6 19" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
              <path d="M36 22 L36 19" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="11" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
              <circle cx="27" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
              <circle cx="21" cy="11" r="2" fill="#facc15"/>
            </svg>
            <div className="logo-text"><span>OptiLux</span></div>
            <div className="footer-divider"></div>
            <p>Premium eyewear crafted for bold personalities. See the world differently with OptiLux.</p>
            <div className="social-icons">
              <a className="social-btn" href="https://web.facebook.com/groups/469154604086297/">f</a>
              <a className="social-btn" href="https://ke.linkedin.com/">in</a>
              <a className="social-btn" href="https://x.com/">X</a>
              <a className="social-btn" href="https://www.instagram.com/?hl=en">ig</a>
            </div>
          </div>
          <div className="footer-col">
              <h4>Shop</h4>
              <ul>
                <li>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}>New Arrivals</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(1);
                    const el = document.getElementById('products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}>Sunglasses</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(3);
                    const el = document.getElementById('products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}>Kids</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate("/products");
                  }}>Sale</a>
                </li>
              </ul>
            </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  navigate("/aboutus");
                }}>About Us</a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  navigate("/blog");
                }}>Blog</a>
              </li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/careers"); }}>Careers</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/press"); }}>Press</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/contact"); }}>Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-item"><span className="contact-icon">📍</span><span>Diani, Kenya</span></div>
            <div className="footer-contact-item"><span className="contact-icon">📞</span><span>+254 717 575 102</span></div>
            <div className="footer-contact-item"><span className="contact-icon">✉️</span><span>optilux@gmail.com</span></div>
            <div className="footer-contact-item"><span className="contact-icon">🕐</span><span>Mon – Sat, 8am – 6pm</span></div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 OptiLux. All rights reserved.</p>
          <div className="footer-badges">
            <span className="badge">Privacy Policy</span>
            <span className="badge">Terms of Use</span>
            <span className="badge">M-Pesa Accepted</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Getproducts;