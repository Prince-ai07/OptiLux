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
  const productsPerPage = 12;

  const navigate = useNavigate();

  const img_url = "https://jeremiahprince.alwaysdata.net/static/images/";

  useEffect(() => {
    axios.get("https://jeremiahprince.alwaysdata.net/api/get_products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

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

      {/* 🔝 TOP BAR */}
      <div className="products-header">
        <h2>All Eyewear Collection</h2>

        <input
          type="text"
          placeholder="Search all products..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🛍 PRODUCTS GRID */}
      <div className="container mt-4">
         {loading && <Loader />}
        <div className="row">
          {currentProducts.map((product, index) => (
            <div key={index} className="col-md-3 col-sm-6 mb-4">

              <div className="card product-card-advanced">

                <div className="image-wrapper">
                  <img src={img_url + product.product_photo} alt="" />
                </div>

                <div className="card-body">
                  <h5 className="text-info">{product.product_name}</h5>

                  <p className="text-white">
                    {product.product_description?.slice(0, 60)}...
                  </p>

                  <h4 className="price">
                    Kes {product.product_cost}
                  </h4>

                  <button
                    onClick={() => navigate("/makepayment", { state: { product } })}
                    className="btn-buy w-100"
                  >
                    Buy Now
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
    <div className="pagination text-center mt-4">

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="btn btn-outline-light mx-2"
      >
        Prev
      </button>

      <span>Page {currentPage} of {totalPages}</span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="btn btn-outline-light mx-2"
      >
        Next
      </button>

    </div>
    </div>
  );
};

export default Products;