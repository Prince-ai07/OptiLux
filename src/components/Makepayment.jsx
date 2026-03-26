import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {

    // Destructure the details passed from the Getproducts component
    // The useLocation hook allows us to get/destrucutre the properties passed from the previous component.
    const { product, cart, total } = useLocation().state || {};
    const isCartCheckout = cart && cart.length > 0;

// If it's cart → use total
// If it's buy now → use product price
    const amountToPay = isCartCheckout
    ? total
    : product?.product_cost;

    // declare the navigate hook
    const navigate = useNavigate()
    //console.log("The details passed from getproducts are: ", product)

    // below we specify the image base url
    const img_url = "https://jeremiahprince.alwaysdata.net/static/images/"

    // initialize hooks to manage the state of your application
    const [number, setNumber] = useState("");
    const[loading, setLoading] = useState(false);
    const[success, setSuccess] = useState("");
    const[error, setError] = useState("");

    // create a function that will handle the submit action
    const handleSubmit = async (e) =>{
        // prevent the site from reloading
        e.preventDefault()

        // update the loading hook
        setLoading(true)

        try{
        //create a form data object
        const formdata = new FormData()

        //append the data to the form data
        formdata.append("phone", number)
        formdata.append("amount", amountToPay)
        const response = await axios.post("https://jeremiahprince.alwaysdata.net/api/mpesa_payment", formdata)

        // set loading back to default
        setLoading(false)

        // update the success hook with the message 
        setSuccess(response.data.message)
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
        }
        catch(error){
        // if there is an error respond to the error
        setLoading(false)

        // update the error hook with the error message
        setError(error.message)

        }
    }
   


  return (
    <div className='row justify-content-center'>
        {/* <button className='btn btn-outline-primary'>Back to Products</button> */}
        <h1 className="text-success">Make Payment - Lipa na M-Pesa</h1> <br />

        <div className="col-md-1">
            <input type="button"
            className="btn btn-primary"
            value="<- Back"
            onClick={() => navigate("/") } />
        </div>

        <div className="col-md-6 card shadow p-4">
            <div className="card-body">
                {isCartCheckout ? (
                <>
                    <h2 className="text-primary">Cart Checkout</h2>

                    {cart.map((item, index) => (
                    <div key={index} style={{ borderBottom: "1px solid #444", marginBottom: "10px" }}>
                        <p className="text-white">{item.product_name}</p>
                        <p className="text-warning">KES {item.product_cost}</p>
                    </div>
                    ))}

                    <h3 className="text-success mt-3">Total: KES {total}</h3>
                </>
                ) : (
                <>
                    <img src={img_url + product.product_photo} alt="Product Name" className='product_img' />

                    <h2 className='text-primary'>{product.product_name}</h2>

                    <p className="text-white">{product.product_description}</p>

                    <h3 className="text-warning">KES {product.product_cost}</h3>
                </>
                )}
                <form onSubmit={handleSubmit}>

                     {/* bind the loading hook */}
                    {loading && <Loader />}
                    <h3 className="text-success"> {success} </h3>
                    <h4 className="text-danger"> {error} </h4>


                    <input type="tel" 
                    className='form-control text-white'
                    placeholder='Enter the Phone number +254XXXXXXXXX'
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}/> <br />

                    {/* {number} */}

                    <input type="submit" 
                    value="Make Payment"
                    className='btn btn-success'/>
                </form>

            </div>
        </div>

    </div>
  )
}

export default Makepayment;
