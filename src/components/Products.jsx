import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import Loader from './Loader';

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);               // NEW
  const [selectedCategory, setSelectedCategory] = useState(null); // NEW
  const productsPerPage = 12;

  const navigate = useNavigate();
  const img_url = "https://jeremiahprince.alwaysdata.net/static/images/";

  // Cart listener
  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Fetch categories once
  useEffect(() => {
    axios.get("https://jeremiahprince.alwaysdata.net/api/get_categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  // Fetch products whenever selectedCategory changes
  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? `https://jeremiahprince.alwaysdata.net/api/get_products?category_id=${selectedCategory}`
      : "https://jeremiahprince.alwaysdata.net/api/get_products";

    axios.get(url)
      .then(res => {
        setProducts(res.data);
        setCurrentPage(1); // reset to page 1 on category change
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const filteredProducts = products.filter(p =>
    p.product_name?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      <div className="home">

        {/* TOP BAR */}
        <div className="products-header">
  <h2>All Eyewear Collection</h2>

  {/* SEARCH */}
  <div className="search-container">
    <input
      type="text"
      placeholder="Search all products..."
      className="search-bar"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setShowSuggestions(true);
        setCurrentPage(1);
      }}
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      onKeyDown={(e) => {
        if (e.key === "Enter") setShowSuggestions(false);
      }}
    />
    <span className="search-icon">🔍</span>

    {showSuggestions && search && (
      <div className="search-suggestions">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, 5).map((p, i) => (
            <div
              key={i}
              className="suggestion-item"
              onClick={() => {
                setSearch(p.product_name);
                setShowSuggestions(false);
                setCurrentPage(1);
              }}
            >
              {p.product_name}
            </div>
          ))
        ) : (
          <div className="suggestion-item text-danger">No products found</div>
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
          onClick={() => setSelectedCategory(cat.category_id)}
        >
          <span className="category-dot"></span>
          {cat.category_name}
        </div>
      ))}
    </div>
  </div>

  {/* CART */}
  <div
    style={{ cursor: "pointer", position: "relative", marginLeft: "15px" }}
    onClick={() => navigate("/cart")}
  >
    🛒
    {cartCount > 0 && (
      <span style={{
        position: "absolute", top: "-8px", right: "-10px",
        background: "red", color: "white", borderRadius: "50%",
        padding: "3px 7px", fontSize: "12px"
      }}>
        {cartCount}
      </span>
    )}
  </div>
</div>
        

        {/* PRODUCTS GRID */}
        <div className="container mt-4">
          {loading && <Loader />}
          <div className="row">
            {currentProducts.map((product, index) => (
              <div key={index} className="col-md-3 col-sm-6 mb-4">
                <div className="card product-card-advanced">
                  <div className="image-wrapper">
                    <img src={img_url + product.product_photo} alt={product.product_name} />
                  </div>
                  <div className="card-body">
                    <h5 className="text-info">{product.product_name}</h5>
                    <p className="text-white">{product.product_description?.slice(0, 60)}...</p>
                    <h4 className="price">Kes {product.product_cost}</h4>
                    <div className="d-flex gap-2 mt-2">
                      <button onClick={() => addToCart(product)} className="btn-cart flex-fill">Add to Cart</button>
                      <button onClick={() => navigate("/makepayment", { state: { product } })} className="btn-buy flex-fill">Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* PAGINATION */}
      <div className="pagination-container text-center mt-4 d-flex justify-content-center align-items-center gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`pagination-btn ${currentPage === 1 ? "disabled-btn" : ""}`}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`pagination-btn ${currentPage === i + 1 ? "active-btn" : ""}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`pagination-btn ${currentPage === totalPages ? "disabled-btn" : ""}`}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Products;