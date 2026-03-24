import React, { useEffect, useState } from "react";

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

  return (
    <div className="home container mt-5">

      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <h4 className="text-center text-muted">Your cart is empty</h4>
      ) : (
        <>
          <div className="row">
            {cart.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">

                <div className="card product-card-advanced p-3">

                  <img
                    src={`https://jeremiahprince.alwaysdata.net/static/images/${item.product_photo}`}
                    alt=""
                    style={{ height: "150px", objectFit: "contain" }}
                  />

                  <h5 className="mt-2 text-primary">{item.product_name}</h5>

                  <h4 className="price">Kes {item.product_cost}</h4>

                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}
          </div>

          <h3 className="text-center mt-4">
            Total: <span className="price">Kes {total}</span>
          </h3>

        </>
      )}

    </div>
  );
};

export default Cart;