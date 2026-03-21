import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  // Initialize the hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Define the three states an application will move to
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Below is a function that will handle the submit function
  const handleSubmit =  async(e) =>{
    // Below we prevent our site from reloading
    e.preventDefault()

    // Update our loading hook with a message that will be displayed to the users who are trying to register
    setLoading("Please wait as registration is in progress...")

    try{
      // Create a form data object that will enable you to capture the four detail entered on the form
      const formdata = new FormData();

      // Insert the four details (username, email, password, phone) in terms of key - value pairs
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);

      // by use of axios, we can access the method post
      const response = await axios.post("https://jeremiahprince.alwaysdata.net/api/signup", formdata)

      // Set back the loading hook to default
      setLoading("");

      // Just incase everything goes on well, update the success hook with a message
      setSuccess(response.data.message)

      // clear your hooks 
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
    catch(error){
      // set the loading hook back to default
      setLoading("");

      // update the error hook with the message given back from the response
      setError(error.message)
    }

  }



  return (
    <div className='flex min-h-full flex-col row justify-content-center mt-4 px-6 py-12 lg:px-8'>
        <div className="card col-md-6 p-4 glowing-card">
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h1 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-white'>Sign Up</h1>
          </div>
          

          <h5 className='text-warning'>{loading}</h5>
          <h3 className='text-success'>{success}</h3>
          <h4 className='text-danger'>{error}</h4>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label htmlFor="username" className='block text-2xl/9 font-bold tracking-tight text-white'>Username</label>
                <div className='mt-2'>
                <input type="text" 
                className='form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required /> <br />
                </div>
              
            </div>
            

            {/* {username} */}

            <div>
              <label htmlFor="email" className="block text-2xl/9 font-bold tracking-tight text-white">Email address</label>
              <div className='mt-2'>
                <input type="email"
                className='form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 '
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required /> <br />

              </div>
            </div>

            
            {/* {email} */}
                <div>
                   <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-2xl/9 font-bold tracking-tight text-white">Password</label>
                   </div>
                   <div className="mt-2">
                        <input type="password" 
                        className='form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} /> <br />

                   </div>
                </div>

            {/* {password} */}

            <div>
              <label htmlFor="phone" className='block text-2xl/9 font-bold tracking-tight text-white'>Phone Number</label>
              <div className='mt-2'>
                <input type="tel"
                  className='form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                  value={phone} 
                  onChange={(e) => setPhone (e.target.value)}
                  required/> <br />
              </div>
            </div>

            

            {/* {phone} */}

            <div>
              <input type="submit"
               value="Signup" 
               className='form-control flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500' /> <br /> <br />
            </div>

            
            <p className='text-2xl/9 font-bold tracking-tight text-white'>Already have an account?</p>
             <Link to={'/signin'}>Signin</Link>

          </form>
          </div>

          
        </div>
    </div>
  )
}

export default Signup;

