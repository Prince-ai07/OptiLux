import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproducts = () => {


  // initialize hooks to help you manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // declare the navigate hook
  const navigate = useNavigate()

  // below we specify the image base url
  const img_url = "https://jeremiahprince.alwaysdata.net/static/images/"

  // create a function to help you fetch the products from your API
  const fetchProducts = async() =>{
    try{
      // 4. Update the loading hook
       setLoading(true)

      //5. Interact with your endpoint for fetching products
      const [response] = await Promise.all([
      axios.get("https://jeremiahprince.alwaysdata.net/api/get_products"),
      new Promise((resolve) => setTimeout(resolve, 5000)) 
    ]);

      // 6. Update the products hook with the response given from the API
      setProducts(response.data)

      // 7. set the loading hook back to default
      setLoading(false)
    }
    catch(error){
      // step 8.
      // if there is an error
      // set the loading hook back to default
      setLoading(false)

      // update the error with a message
      setError(error.message)
    }
  }

  // we shall the useEffect hook. This hook enables us to automatically re-render new features incase of any changes
  useEffect(() => {
    fetchProducts()
  }, [])

  // console.log(products)


  return (
    <div className='row products'>
      <h1 className='text-primary'>Available Specs</h1>

        {loading && <Loader/>}
        <h4 className="text-danger">{error}</h4>
       
        {/* map the products fetched from the API to the user interface */}

        {products.map((product)  => (
            <div className="col-md-3 justify-content-center mb-3 product-container">
            <div className="card glowing-card">
                <img 
                  src={img_url + product.product_photo}
                  alt="product name" 
                  className='product_img mt-3'/>

                <div className="card-body">
                  <h5 className="text-primary">{product.product_name}</h5>

                  <p className="text-white">{product.product_description.slice(0, 100) }...</p>

                  <h4 className="text-warning">Kes {product.product_cost}</h4>

                  <button className="btn btn-outline-info" onClick={() => navigate("/makepayment", {state : {product}})}>Purchase Now</button>
                </div>
            </div>

          </div>
           
        ) )}

    </div>
  )
}

export default Getproducts;
