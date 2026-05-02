import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Auth.css';

const Signin = () => {
  const navigate = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);

  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("email",    email);
      formdata.append("password", password);

      const response = await axios.post(
        "https://jeremiahprince.alwaysdata.net/api/signin",
        formdata
      );

      setLoading(false);

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        setError("Incorrect email or password. Please try again.");
      }

    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1"></div>
      <div className="auth-blob auth-blob-2"></div>

      <div className="auth-container signin-layout">

        {/* ── LEFT: Form ─────────────────────────────────────────────────── */}
        <div className="auth-form-panel">
          <div className="auth-form-inner">
            <p className="auth-form-tag">Welcome Back</p>
            <h2 className="auth-form-title">Sign In</h2>
            <p className="auth-form-sub">
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">Sign up →</Link>
            </p>

            {error && (
              <div className="auth-alert error">✕ {error}</div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">

              {/* Email */}
              <div className="auth-field">
                <label>Email Address *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">✉️</span>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field">
                <div className="auth-field-header">
                  <label>Password *</label>
                  {/* Forgot password — you can wire this to a route later */}
                  <span className="auth-forgot">Forgot password?</span>
                </div>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">🔒</span>
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="auth-pwd-toggle"
                    onClick={() => setShowPwd(!showPwd)}
                    tabIndex={-1}
                  >
                    {showPwd ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In →"}
              </button>

            </form>

            {/* Divider */}
            <div className="auth-divider">
              <span></span>
              <p>or continue as</p>
              <span></span>
            </div>

            <button
              className="auth-guest-btn"
              onClick={() => navigate("/")}
            >
              👓 Browse as Guest
            </button>

          </div>
        </div>

        {/* ── RIGHT: Brand panel ──────────────────────────────────────────── */}
        <div className="auth-brand-panel">
          <div className="auth-brand-inner">
            <div className="auth-brand-logo">
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
              <span>OptiLux</span>
            </div>

            <div className="auth-brand-copy">
              <p className="auth-brand-tag">Kenya's Finest</p>
              <h1 className="auth-brand-title">Premium<br/>Eyewear<br/>Awaits</h1>
              <p className="auth-brand-sub">
                Sign in to access your order history, saved items,
                and exclusive member offers.
              </p>
            </div>

            <div className="auth-brand-stats">
              {[
                { num: "5,200+", label: "Happy Customers" },
                { num: "320+",   label: "Premium Frames"  },
                { num: "4.9★",   label: "Average Rating"  },
              ].map((s, i) => (
                <div key={i} className="auth-stat">
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signin;