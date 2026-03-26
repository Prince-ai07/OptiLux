import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const [cart, setCart] = useState([]);


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + Number(item.product_cost), 0);

  const navigate = useNavigate();


  return (
  <div className="home container mt-5">

    <h2 className="text-center mb-4">🛒 Your Cart</h2>

    {cart.length === 0 ? (
      <div className="empty-cart text-center">

        <div className="empty-icon">🛒</div>

        <h4>Your cart feels lonely...</h4>
        <p className="text-muted">Start adding some stylish eyewear 😎</p>

        <button
          className="btn-buy mt-3"
          onClick={() => navigate("/products")}
        >
          Browse Products
        </button>

      </div>
    ) : (
      <>
        <div className="row">
          {cart.map((item, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-4">

              <div className="card product-card-advanced cart-card p-3">

                <div className="cart-img-wrapper">
                  <img
                    src={`https://jeremiahprince.alwaysdata.net/static/images/${item.product_photo}`}
                    alt={item.product_name}
                  />
                </div>

                <h5 className="mt-2 text-info">{item.product_name}</h5>

                <h4 className="price">Kes {item.product_cost}</h4>

                <button
                  className="remove-btn mt-2"
                  onClick={() => removeItem(index)}
                >
                  Remove ❌
                </button>

              </div>

            </div>
          ))}
        </div>

        {/* TOTAL SECTION */}
        <div className="cart-total text-center mt-4 p-4">
          <h3>Total Amount</h3>
          <h2 className="price">Kes {total}</h2>

          <button
              className="btn-buy mt-3"
              onClick={() => navigate("/makepayment", { state: { cart, total } })}
            >
              Proceed to Checkout
          </button>
        </div>

      </>
    )}

  </div>
  );

};

export default Cart;