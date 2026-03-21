import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {

  // introduce the hooks 
  const[product_name, setProductName] = useState("");
  const[product_description, setProductDescription] = useState("");
  const[product_cost, setProductCost] = useState("");
  const[product_photo, setProductPhoto] = useState("");

  // declare the additional hooks to manage the state of the application
  const[loading, setLoading] = useState(false);
  const[success, setSuccess] = useState("");
  const[error, setError] = useState("");

  // create a function that will handle the submit function
  const handleSubmit = async(e) => {
    // prevent the site from reloading
    e.preventDefault()

    // setloading hook with a message (activate it)
    setLoading(true)

    try{
      // create a form data
      const formdata = new FormData()

      // append the details to the form created
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      // interact with axios to help you use the method post
      const response = await axios.post("https://jeremiahprince.alwaysdata.net/api/add_product", formdata)

      // set the loading hook back to default
      setLoading(false)

      // update the success hook with a message 
      setSuccess(response.data.message)

      // clearing the hooks(setting them back to default)
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

      // reseting the form back to default
      e.target.reset()

    setTimeout(() => {
      setSuccess("");
    }, 5000);
    }
    catch(error){
      // set loading hook back to default
      setLoading(false)

      // update the setError with a message
      setError(error.message)
    }

  }
  return (
    <div className='flex min-h-full flex-col row justify-content-center mt-4 px-6 py-12 lg:px-8'>
       <div className="col-md-6 p-4 card glowing-card">
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='text-primary'>Add a Pair of Spectacles</h2>
        </div>
        
        {/* bind the loading hook */}
        {loading && <Loader />}
        <h3 className='text-success'>{success}</h3>
        <h4 className='text-danger'>{error}</h4>

      
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor="name" className='block text-2xl/9 font-bold tracking-tight text-white'>Name</label>
            <div className='mt-2'>
               <input type="text"
              className='form-control  block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
              required 
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}/> <br />

            </div>
          </div>

          {/* {product_name} */}

          <div>
            <label htmlFor="description" className='block text-2xl/9 font-bold tracking-tight text-white'>Description</label>
            <div className='mt-2'>
              <input type="text" 
              className='form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 '
              required
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)}/> <br />
            </div>
          </div>

          {/* {product_description} */}

          <div>
            <label htmlFor="cost" className='block text-2xl/9 font-bold tracking-tight text-white'>Price</label>
            <div className='mt-2'>              
              <input type="number"
              className='form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
              required 
              value={product_cost}
              onChange={(e) => setProductCost(e.target.value)}/> <br />
            </div>
          </div>



          {/* {product_cost} */}
          <div>
          <label className='block text-2xl/9 font-bold tracking-tight text-white'>Spectacles Photo</label>
          <div className='mt-2'>
            <input type="file" 
              className='form-control'
              required
              accept='image/*'
              onChange={(e) => setProductPhoto(e.target.files[0])} /> <br />
            </div>         
          </div>

          

          <input type="submit"
          value="Add Product" 
          className='form-control flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'/>

        </form>
      </div>
        
       </div>
    </div>
  )
}

export default Addproducts;
