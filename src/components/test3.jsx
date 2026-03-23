// UPDATED HOMEPAGE UI (Getproducts.jsx)
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Getproducts = () => {

    // initialize hooks to help you manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //declare the navigate hook
  const navigate = useNavigate();

  //below we specify the image base url
  const img_url = "https://jeremiahprince.alwaysdata.net/static/images/";

  //create a function to help you fetch the products from your API
  const fetchProducts = async () => {
    try {
      //4.Update the loading hook
      setLoading(true);

      //5.Interact with your endpoint for fetching products
      const [response] = await Promise.all([
      axios.get("https://jeremiahprince.alwaysdata.net/api/get_products"),
      new Promise((resolve) => setTimeout(resolve, 5000)) 
      ]);

      //6.Update the products hook with the response given from the API
      setProducts(response.data);

      //7.set the loading hook back to default
      setLoading(false);

    } 
    catch (error) {
      //8. step 8
      // if there is an error
      // set the loading hook back to default
      setLoading(false);

      // update the error with a message
      setError(error.message);
    }
  }

  // we shall the useEffect hook. This hook enables us to automatically re-render new features incase of any changes
  useEffect(() => {
    fetchProducts();
  }, []);

  // console.log(products)


  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <h1>See the World in Style 👓</h1>
        <p>Premium eyewear that defines your personality</p>
        <button className="hero-btn" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
          Explore Specs
        </button>
      </section>

      {/* PRODUCTS */}
      <div className='container mt-5'>
        <h2 className='text-primary mb-4'>Available Specs</h2>

        {loading && <p className="text-light">Loading...</p>}
        <h4 className="text-danger">{error}</h4>

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
                  <h5>{product.product_name}</h5>
                  <p>{product.product_description.slice(0, 80)}...</p>
                  <h4 className="price">Kes {product.product_cost}</h4>

                  <button
                    className="buy-btn"
                    onClick={() => navigate("/makepayment", { state: { product } })}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="features">
        <div>
          <h3>🕶 Trendy Designs</h3>
          <p>Stay ahead with modern styles</p>
        </div>
        <div>
          <h3>💎 Premium Quality</h3>
          <p>Durable and long-lasting frames</p>
        </div>
        <div>
          <h3>🚚 Fast Delivery</h3>
          <p>Get your specs quickly anywhere</p>
        </div>
      </section>
    </div>
  )
}

export default Getproducts;


/* ADD THIS CSS FILE (Home.css) */

