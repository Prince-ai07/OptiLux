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
import AboutUs from './components/Aboutus';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Careers from './components/Careers';
import Press from './components/Press';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">

  {/* LOGO */}
  <Link to="/" className="logo-wrapper">
    <svg className="logo-icon" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="42" height="42" rx="10" fill="#0f172a"/>
      <circle cx="13" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
      <circle cx="29" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
      <path d="M20 22 L22 22" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 22 L6 19" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 22 L36 19" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="11" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
      <circle cx="27" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
      <circle cx="21" cy="11" r="2" fill="#facc15"/>
    </svg>

    <div className="logo-text">
      <span>OptiLux</span>
      <span>Premium Eyewear</span>
    </div>
  </Link>

  {/* NAV */}
  <nav className="nav-container">
    <Link to="/" className="navlinks">Home</Link>
    <Link to="/addproducts" className="navlinks">Add</Link>
    <div className="nav-divider"></div>
    <Link to="/signin" className="signin-btn">Sign In</Link>
    <Link to="/signup" className="signup-btn">Sign Up</Link>
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
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
