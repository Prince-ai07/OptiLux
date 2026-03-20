import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

  // Define the two hooks for capturing/storing the users input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

// Declare 3 additional hooks
const [loading, setLoading] = useState("");
const [success, setSuccess] = useState("");
const [error, setError] = useState("");

// Below we have the useNavigate hook to redirect us to another page on successful login/signin
const navigate = useNavigate()

// Below is the function to add the signin function
const handleSubmit = async(e) =>{
  // Prevent the site from reloading
e.preventDefault()

//Update the loading hook with a message
setLoading("Please wait while we authenticate your account.")

try{
  // Create a formData object that will hold the email and the password
  const formdata = new FormData()

  // Insert/append the email and the password on the formData created.
  formdata.append("email", email);
  formdata.append("password", password)

  // interact with axios for the response
  const response = await axios.post("https://jeremiahprince.alwaysdata.net/api/signin", formdata);

  // Set the loading hook back to default
  setLoading("");

  // check whether the user exists as part of your response from the API
  if(response.data.user){
    // If user is there, definitely the details during signin are correct
    // console.log(response.data.user)
    // setSuccess("Login successful")

     // Store user details in local storage
    localStorage.setItem("user", JSON.stringify(response.data.user));
    

    // If it is successful, let a person get redirected to another page
    navigate("/");
  }
  else{
    // User is not found, that means the credential entered on the form are incorrect
    setError("Login Failed: Please try again...")
  }
}
catch(error){
  // Set loading back to default
  setLoading("")

  // update the error hook with message
  setError("Oops, something went wrong. Try again...")
}
}

  return (
   <div className='flex min-h-full flex-col row justify-content-center mt-4 px-6 py-12 lg:px-8'>
        <div className="col-md-6 card shadow p-4 card">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
            </div>

          <h5 className='text-info'>{loading}</h5>
          <h3 className='text-success'>{success}</h3>
          <h4 className="text-danger">{error}</h4>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-2xl/9 font-bold tracking-tight text-white">Email address</label>
                    <div className="mt-2">
                     <input type="email"
                        className='form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                        required
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}/> <br />
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
                     <input type="submit"
                    value="Signin" 
                    className='flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'/> <br /> <br />
                </div>

               

                      <p className='text-2xl/9 font-bold tracking-tight text-white'>Don't have an account?</p>
                      <Link to={'/signup'}>Signup</Link>
             </form>
          </div>

          
        </div>
    </div>
  )
}

export default Signin;

// How can you store the users details on the local storage
