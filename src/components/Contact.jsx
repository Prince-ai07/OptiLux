import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Contact.css';
import AboutNav from './AboutNav';

const Contact = () => {
  const navigate  = useNavigate();
  const formRef   = useRef(null);

  const [formData, setFormData]   = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors]       = useState({});
  const [submitStatus, setSubmitStatus]   = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);

  const TAWK_PROPERTY_ID = "69f7a71e52b26a1c3925b1c4";
  const TAWK_WIDGET_ID   = "1jnnm9kdj";

  useEffect(() => {
    if (TAWK_PROPERTY_ID === "69f7a71e52b26a1c3925b1c4" || TAWK_WIDGET_ID === "1jnnm9kdj") return;
    if (document.getElementById("tawk-script")) return;
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    const script = document.createElement("script");
    script.id = "tawk-script"; script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = "UTF-8"; script.setAttribute("crossorigin", "*");
    document.head.appendChild(script);
  }, []);

  const handleStartChat = () => {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
    } else {
      window.open(`https://wa.me/254717575102?text=${encodeURIComponent("Hello OptiLux! I would like to chat with your team.")}`, "_blank");
    }
  };

  const handleCall      = () => { window.location.href = "tel:+254717575102"; };
  const handleEmailUs   = () => { if (formRef.current) formRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const handleWhatsApp  = () => { window.open(`https://wa.me/254717575102?text=${encodeURIComponent("Hello OptiLux! 👓 I visited your website and would like to get in touch.")}`, "_blank"); };

  const channels = [
    { icon: "💬", title: "Live Chat",  desc: "Chat with our team in real time",      action: "Start Chat",    sub: "Usually responds in under 2 minutes",   onClick: handleStartChat },
    { icon: "📞", title: "Call Us",    desc: "+254 717 575 102",                       action: "Call Now",      sub: "Mon – Sat, 8am – 6pm EAT",              onClick: handleCall      },
    { icon: "✉️", title: "Email Us",  desc: "optilux60@gmail.com",                   action: "Send Message",  sub: "We respond within 24 hours",            onClick: handleEmailUs   },
    { icon: "📱", title: "WhatsApp",  desc: "+254 717 575 102",                       action: "Message Us",    sub: "Quick replies, 7 days a week",          onClick: handleWhatsApp  },
  ];

  const faqs = [
    { q: "How long does delivery take?",            a: "Standard delivery within Nairobi takes 1-2 business days. Mombasa and Kisumu take 2-3 days. All other regions take 3-5 business days. Express same-day delivery is available in Nairobi for orders placed before 11am." },
    { q: "Do you accept M-Pesa payments?",          a: "Yes. M-Pesa is our primary payment method. You will receive an STK push to your phone at checkout. We also accept Visa, Mastercard, and bank transfers for orders above Kes 10,000." },
    { q: "What is your returns policy?",            a: "We offer a 7-day no-questions-asked return policy on all products. The item must be in its original condition with the original packaging. Contact us and we will arrange a collection from your location at no charge." },
    { q: "Are all your products authentic?",        a: "Absolutely. OptiLux is an authorised stockist for all brands we carry. Every product comes with the original manufacturer packaging, warranty card, and authentication documentation. We have a zero-tolerance policy for counterfeits." },
    { q: "Can I get my prescription lenses fitted?",a: "Yes. We work with certified opticians in Nairobi, Mombasa, and Kisumu who can fit prescription lenses into any frame you purchase from us. Contact us and we will connect you with the nearest partner optician." },
    { q: "Do you offer bulk or corporate orders?",  a: "We do. Corporate and bulk orders of 10 units or more qualify for special pricing and dedicated account management. Contact our sales team at sales@optilux.co.ke for a custom quote." },
  ];

  const offices = [
    { city: "Nairobi", address: "Westlands Commercial Centre, Waiyaki Way, Nairobi", phone: "+254 717 575 102", email: "optilux60@gmail.com", hours: "Mon – Sat, 8am – 7pm" },
    { city: "Mombasa", address: "Nyali Centre, Links Road, Mombasa",                 phone: "+254 717 575 103", email: "optilux60@gmail.com", hours: "Mon – Sat, 9am – 6pm" },
    { city: "Diani",   address: "Diani Beach Road, Kwale County",                    phone: "+254 717 575 104", email: "optilux60@gmail.com", hours: "Mon – Sun, 9am – 6pm" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim())    newErrors.name    = "Full name is required.";
    if (!formData.email.trim())   newErrors.email   = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.phone.trim())   newErrors.phone   = "Phone number is required.";
    else if (!/^[+\d\s]{7,15}$/.test(formData.phone)) newErrors.phone = "Please enter a valid phone number.";
    if (!formData.subject)        newErrors.subject = "Please select a subject.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    else if (formData.message.trim().length < 10) newErrors.message = "Message is too short. Please give us a bit more detail.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitStatus("loading");
    try {
      const res  = await fetch("https://jeremiahprince.alwaysdata.net/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus("success"); setSubmitMessage(data.message);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error"); setSubmitMessage(data.message || "Something went wrong. Please try again.");
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (err) {
      setSubmitStatus("error"); setSubmitMessage("Could not reach the server. Please check your connection and try again.");
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="contact-page">
      <AboutNav activeLink="Contact" />

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
          {channels.map((ch, i) => (
            <div key={i} className="contact-channel-card">
              <div className="contact-channel-icon">{ch.icon}</div>
              <h4>{ch.title}</h4>
              <p className="contact-channel-desc">{ch.desc}</p>
              <p className="contact-channel-sub">{ch.sub}</p>
              <button className="contact-channel-btn" onClick={ch.onClick}>{ch.action}</button>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + OFFICES */}
      <section className="contact-main">
        <div className="contact-main-inner">

          <div className="contact-form-side" ref={formRef}>
            <p className="about-section-tag">Send a Message</p>
            <h2>Drop Us a Line</h2>
            <p className="contact-form-sub">Fill in the form and we will get back to you within 24 hours.</p>

            {submitStatus === "success" ? (
              <div className="contact-success">
                <div className="contact-success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will respond to you within 24 hours at the email address you provided.</p>
                <button onClick={() => setSubmitStatus(null)}>Send Another Message</button>
              </div>
            ) : (
              <div className="contact-form">
                {submitStatus === "error" && <div className="contact-form-error-banner">✕ {submitMessage}</div>}
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label>Full Name <span className="required-star">*</span></label>
                    <input type="text" name="name" placeholder="John Kamau" value={formData.name} onChange={handleChange} className={errors.name ? "input-error" : ""} />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>
                  <div className="contact-form-group">
                    <label>Email Address <span className="required-star">*</span></label>
                    <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className={errors.email ? "input-error" : ""} />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label>Phone Number <span className="required-star">*</span></label>
                    <input type="tel" name="phone" placeholder="+254 7XX XXX XXX" value={formData.phone} onChange={handleChange} className={errors.phone ? "input-error" : ""} />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                  <div className="contact-form-group">
                    <label>Subject <span className="required-star">*</span></label>
                    <select name="subject" value={formData.subject} onChange={handleChange} className={errors.subject ? "input-error" : ""}>
                      <option value="">Select a subject</option>
                      <option value="Order Enquiry">Order Enquiry</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Returns & Refunds">Returns &amp; Refunds</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Press & Media">Press &amp; Media</option>
                      <option value="Careers">Careers</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <span className="field-error">{errors.subject}</span>}
                  </div>
                </div>
                <div className="contact-form-group full">
                  <label>Message <span className="required-star">*</span></label>
                  <textarea name="message" rows="6" placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange} className={errors.message ? "input-error" : ""}></textarea>
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>
                <button className="contact-submit-btn" onClick={handleSubmit} disabled={submitStatus === "loading"}>
                  {submitStatus === "loading" ? "Sending..." : "Send Message →"}
                </button>
              </div>
            )}
          </div>

          <div className="contact-offices-side">
            <p className="about-section-tag">Our Locations</p>
            <h2>Find Us</h2>
            <div className="contact-offices-list">
              {offices.map((office, i) => (
                <div key={i} className="contact-office-card">
                  <div className="contact-office-header"><h4>{office.city}</h4><span className="contact-office-badge">Open</span></div>
                  <div className="contact-office-detail"><span>📍</span><span>{office.address}</span></div>
                  <div className="contact-office-detail"><span>📞</span><span>{office.phone}</span></div>
                  <div className="contact-office-detail"><span>✉️</span><span>{office.email}</span></div>
                  <div className="contact-office-detail"><span>🕐</span><span>{office.hours}</span></div>
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
              <div key={i} className={`contact-faq-item ${activeAccordion === i ? "open" : ""}`}>
                <div className="contact-faq-question" onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="contact-faq-chevron">{activeAccordion === i ? "▴" : "▾"}</span>
                </div>
                {activeAccordion === i && <div className="contact-faq-answer"><p>{faq.a}</p></div>}
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