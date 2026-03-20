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
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
                    <div className="mt-2">
                     <input type="email"
                        placeholder='Enter the email address here...'
                        className='form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                        required
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}/> <br />
                    </div>
                </div>
                
               

            {/* {email} */}

                <div>
                   <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
                   </div>
                   <div className="mt-2">
                        <input type="password"
                        placeholder='Enter the password here...' 
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

               

            
                        Don't have an account? 
                        <Link to={'/signup'}>Signup</Link>
             </form>
          </div>

          
        </div>
    </div>