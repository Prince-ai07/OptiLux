import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup         from './components/Signup';
import Signin         from './components/Signin';
import Getproducts    from './components/Getproducts';
import Makepayment    from './components/Makepayment';
import Notfound       from './components/Notfound';
import Products       from './components/Products';
import Cart           from './components/Cart';
import AboutUs        from './components/Aboutus';
import Blog           from './components/Blog';
import BlogPost       from './components/BlogPost';
import Careers        from './components/Careers';
import Press          from './components/Press';
import Contact        from './components/Contact';
import AdminDashboard from './components/AdminDashboard';

// ══════════════════════════════════════════════════════════════════════════════
// ROUTES WHERE THE GLOBAL HEADER HIDES ITSELF
// These pages already have their own full navbars built in.
// Showing the App header on top would create a double-navbar problem.
// ══════════════════════════════════════════════════════════════════════════════
const HIDDEN_HEADER_ROUTES = [
  '/products',
  '/cart',
  '/makepayment',
  '/signin',
  '/signup',
  '/aboutus',
  '/blog',
  '/careers',
  '/press',
  '/contact',
  '/optilux-admin-2026',
];

// ══════════════════════════════════════════════════════════════════════════════
// SMART HEADER — auth-aware, hides on pages with their own navbars
// ══════════════════════════════════════════════════════════════════════════════
const AppHeader = () => {
  const navigate    = useNavigate();
  const location    = useLocation();
  const dropdownRef = useRef(null);

  const [user,         setUser]         = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount,    setCartCount]    = useState(0);
  const [scrolled,     setScrolled]     = useState(false);

  // Read user from localStorage — on mount and on every route change
  const readUser = () => {
    const stored = localStorage.getItem('user');
    setUser(stored ? JSON.parse(stored) : null);
  };

  useEffect(() => {
    readUser();
    window.addEventListener('storage',      readUser);
    window.addEventListener('userLoggedIn', readUser);
    return () => {
      window.removeEventListener('storage',      readUser);
      window.removeEventListener('userLoggedIn', readUser);
    };
  }, []);

  // Re-check user on every route change (catches in-app sign-in redirects)
  useEffect(() => { readUser(); }, [location.pathname]);

  // Cart count
  useEffect(() => {
    const sync = () => {
      const c = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(c.length);
    };
    sync();
    window.addEventListener('cartUpdated', sync);
    return () => window.removeEventListener('cartUpdated', sync);
  }, []);

  // Scroll shadow
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const fn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  // Sign out
  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    navigate('/');
  };

  // Hide on pages with their own navbar
  const shouldHide =
    HIDDEN_HEADER_ROUTES.includes(location.pathname) ||
    location.pathname.startsWith('/blog/');
  if (shouldHide) return null;

  // User initials for avatar
  const getInitials = (name = '') => {
    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase() || '?';
  };

  const displayName = user?.username || user?.email?.split('@')[0] || 'Member';

  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>

      {/* LOGO */}
      <Link to="/" className="app-logo">
        <svg viewBox="0 0 42 42" fill="none">
          <rect width="42" height="42" rx="10" fill="#0f172a"/>
          <circle cx="13" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
          <circle cx="29" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
          <path d="M20 22 L22 22" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 22 L6 19"   stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M36 22 L36 19" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="11" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
          <circle cx="27" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
          <circle cx="21" cy="11" r="2"   fill="#facc15"/>
        </svg>
        <div className="app-logo-text">
          <span className="app-logo-name">OptiLux</span>
          <span className="app-logo-sub">Premium Eyewear</span>
        </div>
      </Link>

      {/* RIGHT SIDE */}
      <div className="app-nav-right">

        {/* Cart */}
        <button className="app-cart-btn" onClick={() => navigate('/cart')}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {cartCount > 0 && <span className="app-cart-badge">{cartCount}</span>}
        </button>

        {/* ── LOGGED OUT ──────────────────────────────────────────────── */}
        {!user && (
          <div className="app-auth-btns">
            <Link to="/signin" className="app-signin-btn">Sign In</Link>
            <Link to="/signup" className="app-signup-btn">Sign Up</Link>
          </div>
        )}

        {/* ── LOGGED IN ───────────────────────────────────────────────── */}
        {user && (
          <div className="app-user-wrap" ref={dropdownRef}>

            {/* Trigger button */}
            <button
              className="app-user-btn"
              onClick={() => setDropdownOpen(o => !o)}
            >
              <div className="app-avatar">{getInitials(displayName)}</div>
              <div className="app-user-info">
                <span className="app-user-name">{displayName}</span>
                <span className="app-user-tag">Member</span>
              </div>
              <svg
                className={`app-caret ${dropdownOpen ? 'open' : ''}`}
                width="11" height="11" viewBox="0 0 10 6" fill="none"
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor"
                  strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="app-dropdown">

                {/* Profile header */}
                <div className="app-dropdown-profile">
                  <div className="app-dropdown-avatar">
                    {getInitials(displayName)}
                  </div>
                  <div className="app-dropdown-profile-info">
                    <p className="app-dropdown-name">{displayName}</p>
                    <p className="app-dropdown-email">{user.email}</p>
                  </div>
                </div>

                <div className="app-dropdown-sep"></div>

                <button className="app-dropdown-item" onClick={() => { navigate('/'); setDropdownOpen(false); }}>
                  <span className="app-dropdown-item-icon">🏠</span>
                  Home
                </button>
                <button className="app-dropdown-item" onClick={() => { navigate('/products'); setDropdownOpen(false); }}>
                  <span className="app-dropdown-item-icon">👓</span>
                  Browse Eyewear
                </button>
                <button className="app-dropdown-item" onClick={() => { navigate('/cart'); setDropdownOpen(false); }}>
                  <span className="app-dropdown-item-icon">🛒</span>
                  My Cart
                  {cartCount > 0 && (
                    <span className="app-dropdown-count">{cartCount}</span>
                  )}
                </button>

                <div className="app-dropdown-sep"></div>

                <button
                  className="app-dropdown-item app-dropdown-signout"
                  onClick={handleSignOut}
                >
                  <span className="app-dropdown-item-icon">🚪</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════
function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route path="/"            element={<Getproducts />}   />
          <Route path="/signup"      element={<Signup />}        />
          <Route path="/signin"      element={<Signin />}        />
          <Route path="/makepayment" element={<Makepayment />}   />
          <Route path="/products"    element={<Products />}      />
          <Route path="/cart"        element={<Cart />}          />
          <Route path="/aboutus"     element={<AboutUs />}       />
          <Route path="/blog"        element={<Blog />}          />
          <Route path="/blog/:id"    element={<BlogPost />}      />
          <Route path="/careers"     element={<Careers />}       />
          <Route path="/press"       element={<Press />}         />
          <Route path="/contact"     element={<Contact />}       />
          <Route path="/optilux-admin-2026" element={<AdminDashboard />} />
          <Route path="*"            element={<Notfound />}      />
        </Routes>
      </div>
    </Router>
  );
}

export default App;