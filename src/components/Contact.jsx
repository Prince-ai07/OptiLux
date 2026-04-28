import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Contact.css';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const faqs = [
    { q: "How long does delivery take?", a: "Standard delivery within Nairobi takes 1-2 business days. Mombasa and Kisumu take 2-3 days. All other regions take 3-5 business days. Express same-day delivery is available in Nairobi for orders placed before 11am." },
    { q: "Do you accept M-Pesa payments?", a: "Yes. M-Pesa is our primary payment method. You will receive an STK push to your phone at checkout. We also accept Visa, Mastercard, and bank transfers for orders above Kes 10,000." },
    { q: "What is your returns policy?", a: "We offer a 7-day no-questions-asked return policy on all products. The item must be in its original condition with the original packaging. Contact us and we will arrange a collection from your location at no charge." },
    { q: "Are all your products authentic?", a: "Absolutely. OptiLux is an authorised stockist for all brands we carry. Every product comes with the original manufacturer packaging, warranty card, and authentication documentation. We have a zero-tolerance policy for counterfeits." },
    { q: "Can I get my prescription lenses fitted?", a: "Yes. We work with certified opticians in Nairobi, Mombasa, and Kisumu who can fit prescription lenses into any frame you purchase from us. Contact us and we will connect you with the nearest partner optician." },
    { q: "Do you offer bulk or corporate orders?", a: "We do. Corporate and bulk orders of 10 units or more qualify for special pricing and dedicated account management. Contact our sales team at sales@optilux.co.ke for a custom quote." },
  ];

  const offices = [
    {
      city: "Nairobi",
      address: "Westlands Commercial Centre, Waiyaki Way, Nairobi",
      phone: "+254 717 575 102",
      email: "nairobi@optilux.co.ke",
      hours: "Mon – Sat, 8am – 7pm"
    },
    {
      city: "Mombasa",
      address: "Nyali Centre, Links Road, Mombasa",
      phone: "+254 717 575 103",
      email: "mombasa@optilux.co.ke",
      hours: "Mon – Sat, 9am – 6pm"
    },
    {
      city: "Diani",
      address: "Diani Beach Road, Kwale County",
      phone: "+254 717 575 104",
      email: "diani@optilux.co.ke",
      hours: "Mon – Sun, 9am – 6pm"
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">

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
          <span onClick={() => navigate("/about")} className="about-nav-link">About</span>
          <span onClick={() => navigate("/blog")} className="about-nav-link">Blog</span>
          <span className="about-nav-link active">Contact</span>
        </div>
        <button className="about-nav-cta" onClick={() => navigate("/")}>Shop Now</button>
      </nav>

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <p className="about-section-tag">Get in Touch</p>
          <h1>We Would Love to <span className="contact-accent">Hear From You</span></h1>
          <p className="contact-hero-sub">
            Whether you have a question about a product, need help with an order,
            or just want to say hello — our team is always ready to help.
          </p>
        </div>
      </section>

      {/* CONTACT CHANNELS */}
      <section className="contact-channels">
        <div className="contact-channels-inner">
          {[
            { icon: "💬", title: "Live Chat", desc: "Chat with our team in real time", action: "Start Chat", sub: "Usually responds in under 2 minutes" },
            { icon: "📞", title: "Call Us", desc: "+254 717 575 102", action: "Call Now", sub: "Mon – Sat, 8am – 6pm EAT" },
            { icon: "✉️", title: "Email Us", desc: "optilux@gmail.com", action: "Send Email", sub: "We respond within 24 hours" },
            { icon: "📱", title: "WhatsApp", desc: "+254 717 575 102", action: "Message Us", sub: "Quick replies, 7 days a week" },
          ].map((ch, i) => (
            <div key={i} className="contact-channel-card">
              <div className="contact-channel-icon">{ch.icon}</div>
              <h4>{ch.title}</h4>
              <p className="contact-channel-desc">{ch.desc}</p>
              <p className="contact-channel-sub">{ch.sub}</p>
              <button className="contact-channel-btn">{ch.action}</button>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + OFFICES */}
      <section className="contact-main">
        <div className="contact-main-inner">

          {/* FORM */}
          <div className="contact-form-side">
            <p className="about-section-tag">Send a Message</p>
            <h2>Drop Us a Line</h2>
            <p className="contact-form-sub">Fill in the form and we will get back to you within 24 hours.</p>

            {submitted ? (
              <div className="contact-success">
                <div className="contact-success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will respond to you within 24 hours at the email address you provided.</p>
                <button onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <div className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Kamau"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+254 7XX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form-group">
                    <label>Subject</label>
                    <select name="subject" value={formData.subject} onChange={handleChange}>
                      <option value="">Select a subject</option>
                      <option value="order">Order Enquiry</option>
                      <option value="product">Product Question</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="partnership">Partnership</option>
                      <option value="press">Press & Media</option>
                      <option value="careers">Careers</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="contact-form-group full">
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button className="contact-submit-btn" onClick={handleSubmit}>
                  Send Message →
                </button>
              </div>
            )}
          </div>

          {/* OFFICES */}
          <div className="contact-offices-side">
            <p className="about-section-tag">Our Locations</p>
            <h2>Find Us</h2>
            <div className="contact-offices-list">
              {offices.map((office, i) => (
                <div key={i} className="contact-office-card">
                  <div className="contact-office-header">
                    <h4>{office.city}</h4>
                    <span className="contact-office-badge">Open</span>
                  </div>
                  <div className="contact-office-detail">
                    <span>📍</span><span>{office.address}</span>
                  </div>
                  <div className="contact-office-detail">
                    <span>📞</span><span>{office.phone}</span>
                  </div>
                  <div className="contact-office-detail">
                    <span>✉️</span><span>{office.email}</span>
                  </div>
                  <div className="contact-office-detail">
                    <span>🕐</span><span>{office.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <div className="contact-faq-inner">
          <p className="about-section-tag center">Quick Answers</p>
          <h2 className="about-section-title center">Frequently Asked Questions</h2>
          <div className="contact-faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`contact-faq-item ${activeAccordion === i ? "open" : ""}`}
              >
                <div
                  className="contact-faq-question"
                  onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className="contact-faq-chevron">
                    {activeAccordion === i ? "▴" : "▾"}
                  </span>
                </div>
                {activeAccordion === i && (
                  <div className="contact-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="about-footer-note">
        <p>© 2026 OptiLux. All rights reserved. — Diani, Kenya</p>
      </div>

    </div>
  );
};

export default Contact;