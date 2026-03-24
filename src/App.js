import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Products from "./components/Products";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2 className='title'>Welcome to Treasured Optics</h2>

          <nav>
            <Link to="/" className='navlinks'>Home</Link>
            <Link to="/addproducts" className='navlinks'>Add</Link>
            <Link to="/signup" className='navlinks'>Sign Up</Link>
            <Link to="/signin" className='navlinks'>Sign In</Link>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Getproducts />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} /> 
          <Route path='/addproducts' element={<Addproducts />} />
          <Route path='*' element={<Notfound />} />
          <Route path='/makepayment' element={<Makepayment />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
