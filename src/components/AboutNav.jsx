import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Shared responsive navigation bar for secondary pages:
 * About, Blog, Contact, Press, Careers
 *
 * Props:
 *   activeLink — string matching one of the nav link names
 *                e.g. "About" | "Blog" | "Contact" | "Press" | "Careers"
 */
const AboutNav = ({ activeLink = "" }) => {
  const navigate  = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef   = useRef(null);

  const links = [
    { label: "Home",    path: "/"         },
    { label: "Shop",    path: "/products" },
    { label: "About",   path: "/aboutus"  },
    { label: "Blog",    path: "/blog"     },
    { label: "Contact", path: "/contact"  },
  ];

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <nav className="about-nav" ref={menuRef}>
        {/* Logo */}
        <svg
          className="logo-icon"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
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

        {/* Desktop links */}
        <div className="about-nav-links">
          {links.map((link) => (
            <span
              key={link.label}
              onClick={() => navigate(link.path)}
              className={`about-nav-link ${activeLink === link.label ? "active" : ""}`}
            >
              {link.label}
            </span>
          ))}
        </div>

        {/* Desktop CTA + Hamburger */}
        <div className="about-nav-right">
          <button className="about-nav-cta about-nav-cta-desktop" onClick={() => navigate("/")}>
            Shop Now
          </button>
          <button
            className={`hamburger-btn ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer about-mobile-drawer ${menuOpen ? "open" : ""}`}>
        {links.map((link) => (
          <div
            key={link.label}
            className={`mobile-drawer-item ${activeLink === link.label ? "active" : ""}`}
            onClick={() => { navigate(link.path); setMenuOpen(false); }}
          >
            {link.label}
          </div>
        ))}
        <div className="mobile-drawer-divider"></div>
        <div
          className="mobile-drawer-item mobile-drawer-cta"
          onClick={() => { navigate("/"); setMenuOpen(false); }}
        >
          Shop Now →
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
};

export default AboutNav;