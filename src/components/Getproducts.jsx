import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css'; 
import Loader from './Loader'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Getproducts = () => {

  // ✅ EXISTING STATES (UNCHANGED)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ ✅ ADDED STATES (NEW)
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  const img_url = "https://jeremiahprince.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [response] = await Promise.all([
        axios.get("https://jeremiahprince.alwaysdata.net/api/get_products"),
        new Promise((resolve) => setTimeout(resolve, 5000)) 
      ]);
      setProducts(response.data);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ EXISTING USEEFFECT
  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ ✅ ADDED: LOAD CART FROM LOCAL STORAGE
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // ✅ ✅ ADDED: ADD TO CART FUNCTION
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ ✅ ADDED: FILTER PRODUCTS
 const filteredProducts = products.filter((p) =>
  p.product_name?.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="home">

      {/* 🔝 NAVBAR */}
      <nav className="navbar premium-nav">
        <h3 className="logo">👓 OptiLux</h3>

       <div className="search-container">
        <input
          type="text"
          placeholder="Search specs..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              scrollToProducts();
            }
          }}
        />

        <span className="search-icon">🔍</span>
      </div>

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
            <div className="suggestion-item text-danger">
              No results found
            </div>
          )}
        </div>
      )}

        <div 
          className="cart" 
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer" }}
        >
          🛒 {cart.length}
        </div>
      </nav>

      {/* 🎯 HERO */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>See the World Differently</h1>
          <p>Luxury eyewear crafted for bold personalities</p>

          <button onClick={scrollToProducts} className="hero-btn">
            Shop Now
          </button>
        </div>
      </section>

      {/* 🛍 PRODUCTS */}
      <div id="products-section" className="container mt-5">

        <h2 className="section-title">Featured Collection</h2>

        {loading && <Loader />}
        {error && <h4 className="text-danger">{error}</h4>}

        <div className="row">
          {products.slice(0, 8).filter((p) =>
              p.product_name?.toLowerCase().includes(search.toLowerCase())
            ).map((product, index) => (
            <div key={index} className="col-md-3 col-sm-6 mb-4">

              <div className="card product-card-advanced">

                <div className="image-wrapper">
                  <img
                    src={img_url + product.product_photo}
                    alt="product"
                  />
                </div>

                <div className="card-body">
                  <h5 className='text-primary'>{product.product_name}</h5>

                  <p className='text-white'>
                    {product.product_description?.slice(0, 60)}...
                  </p>

                  <h4 className="price">
                    Kes {product.product_cost}
                  </h4>

                  <div className="actions">
                    <button
                      onClick={() => addToCart(product)}
                      className="btn-cart"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => navigate("/makepayment", { state: { product } })}
                      className="btn-buy"
                    >
                      Buy
                    </button>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            className="view-more-btn"
            onClick={() => navigate("/products")}
          >
            View More Products →
          </button>
        </div>
      </div>

      {/* ✨ FOOTER */}
      <footer className="footer">
        <p>© 2026 OptiLux. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Getproducts;