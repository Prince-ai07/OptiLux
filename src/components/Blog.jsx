import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Blog.css';
import AboutNav from './AboutNav';

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error"); setMessage("Please enter a valid email address.");
      setTimeout(() => setStatus(null), 4000); return;
    }
    setStatus("loading");
    try {
      const res = await fetch("https://jeremiahprince.alwaysdata.net/api/subscribe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success"); setMessage(data.message); setEmail("");
        setTimeout(() => { setStatus(null); setMessage(""); }, 5000);
      } else {
        setStatus("error"); setMessage(data.message);
        setTimeout(() => { setStatus(null); setMessage(""); }, 4000);
      }
    } catch (err) {
      setStatus("error"); setMessage("Something went wrong. Please try again.");
      setTimeout(() => { setStatus(null); setMessage(""); }, 4000);
    }
  };

  return (
    <div className="newsletter-form">
      <input type="email" placeholder="Enter your email..." value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus(null); }} disabled={status === "loading"} />
      <button onClick={handleSubscribe} disabled={status === "loading"}>
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "success" && <p className="newsletter-msg success">✓ {message}</p>}
      {status === "error" && <p className="newsletter-msg error">✕ {message}</p>}
    </div>
  );
};

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Style Guide", "Eye Health", "Brand Spotlight", "Trends"];

  const posts = [
    { id: 1, category: "Style Guide",     title: "How to Choose the Perfect Frame for Your Face Shape",     excerpt: "Not all frames are created equal. Discover which styles complement your unique features and elevate your everyday look.",                                         date: "April 12, 2026",    readTime: "5 min read", tag: "Featured" },
    { id: 2, category: "Eye Health",      title: "Blue Light Glasses — Do They Actually Work?",              excerpt: "With screen time at an all-time high, we break down the science behind blue light lenses and whether they are worth the investment.",                        date: "April 8, 2026",     readTime: "4 min read", tag: "Popular"  },
    { id: 3, category: "Brand Spotlight", title: "Ray-Ban Through the Decades — A Legacy of Cool",           excerpt: "From Aviators in the 1930s to modern Wayfarers, we trace the iconic journey of the world's most recognisable eyewear brand.",                            date: "March 30, 2026",    readTime: "6 min read", tag: null       },
    { id: 4, category: "Trends",          title: "2026 Eyewear Trends You Need to Know About",               excerpt: "Oversized frames are back, tortoiseshell is everywhere, and minimalist metals are ruling boardrooms. Here is what is hot this year.",                    date: "March 22, 2026",    readTime: "3 min read", tag: "New"      },
    { id: 5, category: "Eye Health",      title: "How Often Should You Get Your Eyes Checked?",              excerpt: "Most people wait until their vision deteriorates before visiting an optician. Here is why that is a mistake and what the experts say.",                   date: "March 15, 2026",    readTime: "4 min read", tag: null       },
    { id: 6, category: "Style Guide",     title: "Sunglasses for Every Occasion — From Beach to Boardroom",  excerpt: "One pair is never enough. We curate the perfect sunglasses for every setting in your life, from Diani beach to Nairobi CBD.",                            date: "March 10, 2026",    readTime: "5 min read", tag: null       },
    { id: 7, category: "Brand Spotlight", title: "Oakley vs Maui Jim — Which Performance Brand Wins?",       excerpt: "Two giants of performance eyewear go head to head. We compare lens technology, durability, style, and value for Kenyan buyers.",                          date: "March 4, 2026",     readTime: "7 min read", tag: "Popular"  },
    { id: 8, category: "Trends",          title: "The Rise of Gender-Neutral Eyewear in Africa",             excerpt: "A new wave of designers is breaking traditional boundaries in eyewear. OptiLux explores this exciting shift in African fashion.",                          date: "February 28, 2026", readTime: "4 min read", tag: "New"      },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch   = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost    = posts[0];
  const remainingPosts  = filteredPosts.filter(p => p.id !== featuredPost.id);

  return (
    <div className="blog-page">
      <AboutNav activeLink="Blog" />

      {/* HERO */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <p className="about-section-tag">The OptiLux Journal</p>
          <h1>Style, Vision & <span className="blog-hero-accent">Eyewear Culture</span></h1>
          <p className="blog-hero-sub">
            Expert guides, brand stories, eye health tips and trend reports —
            everything you need to see the world in style.
          </p>
          <div className="blog-search">
            <span className="blog-search-icon">🔍</span>
            <input type="text" placeholder="Search articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="blog-categories">
        <div className="blog-categories-inner">
          {categories.map((cat, i) => (
            <button key={i} className={`blog-cat-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED POST */}
      {activeCategory === "All" && !searchTerm && (
        <section className="blog-featured">
          <div className="blog-featured-inner">
            <div className="blog-featured-image">
              <div className="blog-featured-placeholder"><span>◈</span><p>Style Guide</p></div>
              <div className="blog-featured-badge">Featured</div>
            </div>
            <div className="blog-featured-content">
              <p className="blog-featured-cat">{featuredPost.category}</p>
              <h2>{featuredPost.title}</h2>
              <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
              <div className="blog-post-meta">
                <span className="blog-meta-date">📅 {featuredPost.date}</span>
                <span className="blog-meta-read">⏱ {featuredPost.readTime}</span>
              </div>
              <button className="blog-read-btn" onClick={() => navigate(`/blog/${featuredPost.id}`)}>Read Article →</button>
            </div>
          </div>
        </section>
      )}

      {/* POSTS GRID */}
      <section className="blog-grid-section">
        <div className="blog-grid-inner">
          {filteredPosts.length === 0 ? (
            <div className="blog-no-results">
              <p>No articles found for "<strong>{searchTerm}</strong>"</p>
              <button onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}>Clear Search</button>
            </div>
          ) : (
            <div className="blog-grid">
              {(activeCategory === "All" && !searchTerm ? remainingPosts : filteredPosts).map((post, i) => (
                <div key={i} className="blog-card" onClick={() => navigate(`/blog/${post.id}`)}>
                  <div className="blog-card-image">
                    <div className="blog-card-placeholder">
                      <span>
                        {post.category === "Style Guide" && "◈"}
                        {post.category === "Eye Health" && "◉"}
                        {post.category === "Brand Spotlight" && "◇"}
                        {post.category === "Trends" && "◆"}
                      </span>
                    </div>
                    {post.tag && <div className={`blog-card-tag ${post.tag.toLowerCase()}`}>{post.tag}</div>}
                  </div>
                  <div className="blog-card-body">
                    <p className="blog-card-cat">{post.category}</p>
                    <h3>{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <div className="blog-post-meta">
                        <span className="blog-meta-date">{post.date}</span>
                        <span className="blog-meta-dot">·</span>
                        <span className="blog-meta-read">{post.readTime}</span>
                      </div>
                      <button className="blog-card-read" onClick={(e) => { e.stopPropagation(); navigate(`/blog/${post.id}`); }}>Read →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-box">
          <h2>Stay in Style 👓</h2>
          <p>Subscribe to get exclusive deals, new arrivals, and style tips delivered to your inbox.</p>
          <NewsletterForm />
        </div>
      </section>

      <div className="about-footer-note">
        <p>© 2026 OptiLux. All rights reserved. — Diani, Kenya</p>
      </div>
    </div>
  );
};

export default Blog;