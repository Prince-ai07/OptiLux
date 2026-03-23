// UPDATED HOMEPAGE UI (Getproducts.jsx) - PREMIUM CAROUSEL + RESTORED IMPORTS
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css'; 
import Loader from './Loader'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#0f172a' }}>

      {/* HERO SECTION WITH PREMIUM CAROUSEL */}
      <section style={{ height: '90vh' }}>
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="2500"
          data-bs-pause="hover"
        >

          {/* Indicators */}
          <div className="carousel-indicators">
            {[0,1,2,3].map(i => (
              <button key={i} type="button" data-bs-target="#heroCarousel" data-bs-slide-to={i} className={i===0 ? 'active' : ''}></button>
            ))}
          </div>

          <div className="carousel-inner">

            {[
              'carousel1.avif',
              'carousel2.avif',
              'carousel3.avif',
              'carousel4.webp'
            ].map((img, i) => (
              <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                <img
                  src={`/images/${img}`}
                  className="d-block w-100"
                  style={{
                    height: '90vh',
                    objectFit: 'cover',
                    filter: 'brightness(60%)',
                    transition: 'transform 6s ease'
                  }}
                  alt={`slide-${i + 1}`}
                />

                <div
                  className="carousel-caption"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    animation: 'fadeIn 1s ease'
                  }}
                >
                  <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                    See the World in Style 👓
                  </h1>
                  <p style={{ fontSize: '18px' }}>
                    Premium eyewear that defines your personality
                  </p>

                  <button
                    onClick={scrollToProducts}
                    className="hero-btn"
                  >
                    Explore Specs
                  </button>
                </div>
              </div>
            ))}

          </div>

          {/* Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>

        </div>
      </section>

      {/* PRODUCTS */}
      <div id="products-section" className='container mt-5'>
        <h2 className='text-primary mb-4'>Available Specs</h2>

        {/* ✅ RESTORED LOADER + ERROR */}
        {loading && <Loader/>}
        {error && <h4 className="text-danger">{error}</h4>}

        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card product-card">
                <img
                  src={img_url + product.product_photo}
                  alt="product"
                  className="product-img"
                />

                <div className="card-body">
                  <h5 className='text-primary'>{product.product_name}</h5>
                  <p className='text-white'>{product.product_description ? product.product_description.slice(0, 80) : ''}...</p>
                  <h4 className="price">Kes {product.product_cost}</h4>

                  <button
                    onClick={() => navigate("/makepayment", { state: { product } })}
                    className="buy-btn"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="features">
        <div>
          <h3>🕶 Trendy Designs</h3>
          <p>Stay ahead with modern styles</p>
        </div>
        <div>
          <h3>💎 Premium Quality</h3>
          <p>Durable frames</p>
        </div>
        <div>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick shipping</p>
        </div>
      </section>

    </div>
  );
};

export default Getproducts;