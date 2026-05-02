import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Press.css';

const Press = () => {
  const navigate = useNavigate();

  // ── State for the press kit download request modal ─────────────────────────
  // When a user clicks a Download button, instead of serving a file we don't
  // have yet, we show a small form asking for their name + email, then send
  // you (optilux60@gmail.com) a notification so you can email the assets manually.
  // This is exactly how most professional press pages handle this.
  const [modal, setModal]           = useState(null);   // null | asset title string
  const [modalData, setModalData]   = useState({ name: "", email: "" });
  const [modalStatus, setModalStatus] = useState(null); // null | "loading" | "success" | "error"
  const [modalMsg, setModalMsg]     = useState("");

  // ── Open the modal for a specific press kit asset ──────────────────────────
  const openModal = (assetTitle) => {
    setModal(assetTitle);
    setModalData({ name: "", email: "" });
    setModalStatus(null);
    setModalMsg("");
  };

  // ── Close the modal and reset everything ──────────────────────────────────
  const closeModal = () => {
    setModal(null);
    setModalStatus(null);
  };

  // ── Submit the press kit download request ──────────────────────────────────
  // Reuses your existing /api/contact endpoint — no new API route needed.
  // It sends you an email that says "[Name] from [email] requested [Asset]"
  // so you know to send them the files.
  const handleDownloadRequest = async () => {
    const { name, email } = modalData;

    // Basic validation
    if (!name.trim() || !email.trim() || !email.includes("@")) {
      setModalStatus("error");
      setModalMsg("Please enter your full name and a valid email address.");
      return;
    }

    setModalStatus("loading");

    try {
      const res = await fetch("https://jeremiahprince.alwaysdata.net/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    name.trim(),
          email:   email.trim(),
          phone:   "N/A — Press Kit Request",     // phone is required by API, so we fill it
          subject: "Press & Media",               // maps to an existing subject option
          message: `Press Kit Download Request\n\nAsset requested: ${modal}\n\nPlease send the "${modal}" press kit assets to this email address.`
        })
      });

      const data = await res.json();

      if (data.success) {
        setModalStatus("success");
        setModalMsg(`Got it! We will send the "${modal}" assets to ${email} within 24 hours.`);
      } else {
        setModalStatus("error");
        setModalMsg("Something went wrong. Please email us directly at optilux60@gmail.com.");
      }

    } catch (err) {
      setModalStatus("error");
      setModalMsg("Could not reach the server. Please email optilux60@gmail.com directly.");
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // DATA — unchanged from your original
  // ══════════════════════════════════════════════════════════════════════════

  const coverage = [
    { outlet: "Business Daily Africa",  initials: "BD", date: "March 2026",    title: "OptiLux Is Redefining Luxury Retail in Kenya's Eyewear Market",               excerpt: "The Nairobi-based startup has quietly grown to serve over 5,000 customers across Kenya, combining premium eyewear with seamless M-Pesa payments.",                                                              type: "Feature"      },
    { outlet: "TechCabal",              initials: "TC", date: "February 2026",  title: "How OptiLux Built a Luxury E-Commerce Experience for the Kenyan Market",       excerpt: "A deep dive into how OptiLux's React and Flask-powered platform is delivering a world-class shopping experience tailored to Kenyan consumers.",                                                                  type: "Tech Feature" },
    { outlet: "Nairobi Business Monthly",initials:"NB", date: "January 2026",   title: "The 10 Most Exciting Kenyan Startups to Watch in 2026",                        excerpt: "OptiLux was named among Kenya's top 10 startups to watch, recognised for its rapid growth and innovative approach to luxury retail.",                                                                      type: "List Feature" },
    { outlet: "Style Magazine Kenya",   initials: "SM", date: "December 2025",  title: "OptiLux Named Best Eyewear Retailer in Kenya 2025",                            excerpt: "Style Magazine Kenya awarded OptiLux the Best Eyewear Retailer title, citing product quality, customer service, and delivery speed.",                                                                          type: "Award"        },
    { outlet: "The Standard",           initials: "TS", date: "November 2025",  title: "Kenyan Entrepreneurs Disrupting the Luxury Goods Sector",                      excerpt: "OptiLux founder Jeremiah Prince was featured among a new generation of Kenyan entrepreneurs bringing global luxury standards to local markets.",                                                                  type: "Profile"      },
    { outlet: "Africa Fashion Week",    initials: "AF", date: "October 2025",   title: "OptiLux Debuts at Africa Fashion Week Nairobi",                                 excerpt: "OptiLux made its runway debut at Africa Fashion Week Nairobi, showcasing a curated collection of frames styled with looks from 12 African designers.",                                                          type: "Event"        },
  ];

  const awards = [
    { year: "2026", title: "Best Luxury E-Commerce Platform",  body: "Kenya Digital Awards"       },
    { year: "2025", title: "Best Eyewear Retailer in Kenya",   body: "Style Magazine Kenya"       },
    { year: "2025", title: "Top 10 Kenyan Startups to Watch",  body: "Nairobi Business Monthly"   },
    { year: "2024", title: "Excellence in Customer Experience", body: "Retail Kenya Association"  },
  ];

  const facts = [
    { number: "5,200+", label: "Customers Served"  },
    { number: "320+",   label: "Premium Frames"    },
    { number: "40+",    label: "Certified Brands"  },
    { number: "3",      label: "Cities Covered"    },
    { number: "4.9★",   label: "Average Rating"    },
    { number: "2021",   label: "Year Founded"      },
  ];

  // ── Press kit assets — each has a title, icon, description, and what the
  //    download request email will say to you
  const kitAssets = [
    { icon: "◈", title: "Brand Logos",       desc: "SVG and PNG formats, light and dark versions"  },
    { icon: "◇", title: "Product Images",    desc: "High-resolution product photography"            },
    { icon: "◉", title: "Company Fact Sheet", desc: "Key figures, milestones, and leadership bios" },
    { icon: "◆", title: "Brand Guidelines",  desc: "Colours, typography, and usage rules"           },
  ];

  return (
    <div className="press-page">

      {/* ══════════════════════════════════════════════════════════════════════
          PRESS KIT DOWNLOAD REQUEST MODAL
          Shows when user clicks any Download button.
          Collects their name + email and fires a request to /api/contact
          so you get notified and can send the assets manually.
      ══════════════════════════════════════════════════════════════════════ */}
      {modal && (
        <div className="press-modal-overlay" onClick={closeModal}>
          <div
            className="press-modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Modal header */}
            <div className="press-modal-header">
              <div className="press-modal-icon">◈</div>
              <div>
                <h3>Request Press Asset</h3>
                <p className="press-modal-asset-name">{modal}</p>
              </div>
              {/* Close button */}
              <button className="press-modal-close" onClick={closeModal}>✕</button>
            </div>

            {/* SUCCESS state */}
            {modalStatus === "success" ? (
              <div className="press-modal-success">
                <div className="press-modal-success-icon">✓</div>
                <p>{modalMsg}</p>
                <button className="press-modal-done-btn" onClick={closeModal}>
                  Done
                </button>
              </div>

            ) : (
              /* FORM state */
              <div className="press-modal-body">
                <p className="press-modal-intro">
                  Enter your details and our press team will email you the
                  <strong> {modal}</strong> assets within 24 hours.
                </p>

                {/* Error banner */}
                {modalStatus === "error" && (
                  <div className="press-modal-error">✕ {modalMsg}</div>
                )}

                <div className="press-modal-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Jane Ochieng"
                    value={modalData.name}
                    onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                    disabled={modalStatus === "loading"}
                  />
                </div>

                <div className="press-modal-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    placeholder="jane@media.co.ke"
                    value={modalData.email}
                    onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                    disabled={modalStatus === "loading"}
                  />
                </div>

                <button
                  className="press-modal-submit"
                  onClick={handleDownloadRequest}
                  disabled={modalStatus === "loading"}
                >
                  {modalStatus === "loading" ? "Sending Request..." : "Request Asset →"}
                </button>

                <p className="press-modal-note">
                  By requesting assets you agree to use them only for editorial
                  and media coverage of OptiLux.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NAVBAR — unchanged */}
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
          <span onClick={() => navigate("/")}         className="about-nav-link">Home</span>
          <span onClick={() => navigate("/products")} className="about-nav-link">Shop</span>
          <span onClick={() => navigate("/about")}    className="about-nav-link">About</span>
          <span onClick={() => navigate("/blog")}     className="about-nav-link">Blog</span>
          <span className="about-nav-link active">Press</span>
        </div>
        <button className="about-nav-cta" onClick={() => navigate("/")}>Shop Now</button>
      </nav>

      {/* HERO */}
      <section className="press-hero">
        <div className="press-hero-content">
          <p className="about-section-tag">Newsroom</p>
          <h1>OptiLux in the <span className="press-accent">Press</span></h1>
          <p className="press-hero-sub">
            Media coverage, awards, press releases and brand resources.
            For media enquiries, contact our press team directly.
          </p>
          {/*
            "Contact Press Team" → opens Gmail compose window pre-addressed
            to optilux60@gmail.com with a press-related subject line.
            Using mailto: means no API call needed and it works on all devices.
          */}
          <a
            href="mailto:optilux60@gmail.com?subject=Press%20Enquiry%20—%20OptiLux&body=Hello%20OptiLux%20Press%20Team%2C%0A%0AI%20am%20reaching%20out%20regarding%3A"
            className="press-contact-btn"
          >
            Contact Press Team →
          </a>
        </div>
      </section>

      {/* FAST FACTS — unchanged */}
      <section className="press-facts">
        <div className="press-facts-inner">
          <p className="about-section-tag center">By the Numbers</p>
          <h2 className="about-section-title center">OptiLux at a Glance</h2>
          <div className="press-facts-grid">
            {facts.map((fact, i) => (
              <div key={i} className="press-fact-card">
                <h3>{fact.number}</h3>
                <p>{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS — unchanged */}
      <section className="press-awards">
        <div className="press-awards-inner">
          <p className="about-section-tag">Recognition</p>
          <h2 className="about-section-title">Awards & Honours</h2>
          <div className="press-awards-list">
            {awards.map((award, i) => (
              <div key={i} className="press-award-item">
                <div className="press-award-year">{award.year}</div>
                <div className="press-award-divider"></div>
                <div className="press-award-info">
                  <h4>{award.title}</h4>
                  <p>{award.body}</p>
                </div>
                <div className="press-award-badge">◈</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA COVERAGE — unchanged */}
      <section className="press-coverage">
        <div className="press-coverage-inner">
          <p className="about-section-tag">Media Coverage</p>
          <h2 className="about-section-title">Featured In</h2>
          <div className="press-coverage-grid">
            {coverage.map((item, i) => (
              <div key={i} className="press-coverage-card">
                <div className="press-coverage-header">
                  <div className="press-outlet-avatar">{item.initials}</div>
                  <div>
                    <p className="press-outlet-name">{item.outlet}</p>
                    <p className="press-outlet-date">{item.date}</p>
                  </div>
                  <span className="press-coverage-type">{item.type}</span>
                </div>
                <h4>{item.title}</h4>
                <p>{item.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS KIT — Download buttons now open the request modal */}
      <section className="press-kit">
        <div className="press-kit-inner">
          <p className="about-section-tag center">Resources</p>
          <h2 className="about-section-title center">Press Kit</h2>
          <p className="press-kit-sub">
            Download official OptiLux brand assets, logos, product images,
            and company information for media use.
          </p>
          <div className="press-kit-cards">
            {kitAssets.map((kit, i) => (
              <div key={i} className="press-kit-card">
                <div className="press-kit-icon">{kit.icon}</div>
                <h4>{kit.title}</h4>
                <p>{kit.desc}</p>
                {/*
                  Clicking Download opens the modal for this specific asset.
                  The modal collects name + email and emails you a request
                  notification so you can send the file manually.
                  When you eventually have the actual files, you can replace
                  this with a direct download link — the modal CSS class names
                  make it easy to find and swap out.
                */}
                <button onClick={() => openModal(kit.title)}>
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS CONTACT */}
      <section className="press-contact-section">
        <div className="press-contact-inner">
          <div>
            <p className="about-section-tag">Get in Touch</p>
            <h2>Media Enquiries</h2>
            <p>
              For interview requests, press releases, event coverage, and brand
              partnerships, reach out to our press team.
            </p>
            <div className="press-contact-details">

              {/* Email — opens Gmail compose pre-addressed to optilux60@gmail.com */}
              <div className="press-contact-item">
                <span>✉️</span>
                <a
                  href="mailto:optilux60@gmail.com?subject=Press%20Enquiry%20—%20OptiLux"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  optilux60@gmail.com
                </a>
              </div>

              {/* Phone — dials on mobile, opens softphone on desktop */}
              <div className="press-contact-item">
                <span>📞</span>
                <a
                  href="tel:+254717575102"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  +254 717 575 102
                </a>
              </div>

              <div className="press-contact-item">
                <span>🕐</span>
                <span>Mon – Fri, 9am – 5pm EAT</span>
              </div>

            </div>
          </div>

          {/* "Go to Contact Page" — already correct, unchanged */}
          <div className="press-contact-cta">
            <h3>Need Something Specific?</h3>
            <p>
              Use our contact form for detailed enquiries and we will respond
              within 24 hours.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="about-cta-btn"
            >
              Go to Contact Page →
            </button>
          </div>
        </div>
      </section>

      <div className="about-footer-note">
        <p>© 2026 OptiLux. All rights reserved. — Diani, Kenya</p>
      </div>

    </div>
  );
};

export default Press;