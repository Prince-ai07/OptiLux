import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/About.css';

const AboutUs = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "Jeremiah Prince",
      role: "Founder & CEO",
      bio: "Visionary behind OptiLux. Passionate about merging luxury with accessibility in the eyewear space.",
      initials: "JP"
    },
    {
      name: "Amina Wanjiku",
      role: "Head of Design",
      bio: "Brings 10+ years of fashion design expertise to every frame we curate and stock.",
      initials: "AW"
    },
    {
      name: "Brian Otieno",
      role: "Operations Manager",
      bio: "Ensures every order from Nairobi to Mombasa reaches you on time, every time.",
      initials: "BO"
    },
  ];

  const values = [
    { icon: "◈", title: "Authenticity", desc: "Every frame we sell is sourced directly from certified brand distributors. No counterfeits, ever." },
    { icon: "◇", title: "Elegance", desc: "We believe eyewear is not just vision correction — it is a statement. We curate only the finest." },
    { icon: "◉", title: "Accessibility", desc: "Luxury should not be out of reach. We bring premium eyewear to every corner of Kenya." },
    { icon: "◈", title: "Trust", desc: "From secure M-Pesa payments to easy returns, we build every interaction around your trust." },
  ];

  return (
    <div className="about-page">

      {/* NAVBAR */}
      <nav className="about-nav">
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
        <div className="about-nav-links">
          <span onClick={() => navigate("/")} className="about-nav-link">Home</span>
          <span onClick={() => navigate("/products")} className="about-nav-link">Shop</span>
          <span className="about-nav-link active">About</span>
        </div>
        <button className="about-nav-cta" onClick={() => navigate("/")}>Shop Now</button>
      </nav>

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <p className="about-hero-tag">Our Story</p>
          <h1>Crafted for Those <br /> Who See Differently</h1>
          <p className="about-hero-sub">
            OptiLux was born in Nairobi with one mission — to make luxury eyewear
            accessible to every bold personality across Kenya.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="about-story">
        <div className="about-story-inner">
          <div className="about-story-text">
            <p className="about-section-tag">Who We Are</p>
            <h2>More Than an Eyewear Store</h2>
            <p>
              Founded in 2026, OptiLux started as a small boutique in Diani with a simple
              belief — that the right pair of glasses can transform not just how you see
              the world, but how the world sees you.
            </p>
            <p>
              Today we serve thousands of customers across Kenya, offering over 320
              premium frames from 40+ certified brands, all delivered to your doorstep
              with the care and speed you deserve.
            </p>
            <p>
              We are not just selling eyewear. We are building confidence, one frame at a time.
            </p>
          </div>
          <div className="about-story-stats">
            <div className="about-stat">
              <h3>5,200+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="about-stat">
              <h3>320+</h3>
              <p>Premium Frames</p>
            </div>
            <div className="about-stat">
              <h3>40+</h3>
              <p>Certified Brands</p>
            </div>
            <div className="about-stat">
              <h3>4.9★</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <p className="about-section-tag center">What Drives Us</p>
        <h2 className="about-section-title center">Our Core Values</h2>
        <div className="about-values-grid">
          {values.map((v, i) => (
            <div key={i} className="about-value-card">
              <div className="about-value-icon">{v.icon}</div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="about-team">
        <p className="about-section-tag center">The People Behind OptiLux</p>
        <h2 className="about-section-title center">Meet Our Team</h2>
        <div className="about-team-grid">
          {team.map((member, i) => (
            <div key={i} className="about-team-card">
              <div className="about-team-avatar">{member.initials}</div>
              <h4>{member.name}</h4>
              <p className="about-team-role">{member.role}</p>
              <p className="about-team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-inner">
          <h2>Ready to Find Your Perfect Frame?</h2>
          <p>Browse our full collection of premium eyewear, delivered anywhere in Kenya.</p>
          <button onClick={() => navigate("/products")} className="about-cta-btn">
            Shop the Collection
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <div className="about-footer-note">
        <p>© 2026 OptiLux. All rights reserved. — Diani, Kenya</p>
      </div>

    </div>
  );
};

export default AboutUs;