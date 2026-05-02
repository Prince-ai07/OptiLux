import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Auth.css';

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [phone,    setPhone]    = useState("");
  const [showPwd,  setShowPwd]  = useState(false);

  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState("");
  const [error,    setError]    = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email",    email);
      formdata.append("password", password);
      formdata.append("phone",    phone);

      const response = await axios.post(
        "https://jeremiahprince.alwaysdata.net/api/signup",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);
      setUsername(""); setEmail(""); setPassword(""); setPhone("");

      // Redirect to sign in after 2 seconds
      setTimeout(() => {
        setSuccess("");
        navigate("/signin");
      }, 2000);

    } catch (err) {
      setLoading(false);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1"></div>
      <div className="auth-blob auth-blob-2"></div>

      <div className="auth-container">

        {/* ── LEFT: Brand panel ──────────────────────────────────────────── */}
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
              <p className="auth-brand-tag">Join the Family</p>
              <h1 className="auth-brand-title">See the World<br/>Differently</h1>
              <p className="auth-brand-sub">
                Create your OptiLux account and unlock exclusive member deals,
                early access to new arrivals, and a seamless shopping experience.
              </p>
            </div>

            <div className="auth-brand-perks">
              {[
                { icon: "🎁", text: "Exclusive member-only deals" },
                { icon: "🚚", text: "Free delivery above Kes 2,000" },
                { icon: "🔄", text: "7-day hassle-free returns"    },
                { icon: "✅", text: "100% authentic eyewear"        },
              ].map((perk, i) => (
                <div key={i} className="auth-perk">
                  <span className="auth-perk-icon">{perk.icon}</span>
                  <span>{perk.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form ────────────────────────────────────────────────── */}
        <div className="auth-form-panel">
          <div className="auth-form-inner">
            <p className="auth-form-tag">Create Account</p>
            <h2 className="auth-form-title">Sign Up</h2>
            <p className="auth-form-sub">
              Already have an account?{" "}
              <Link to="/signin" className="auth-link">Sign in →</Link>
            </p>

            {success && (
              <div className="auth-alert success">✓ {success} Redirecting...</div>
            )}
            {error && (
              <div className="auth-alert error">✕ {error}</div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">

              {/* Username */}
              <div className="auth-field">
                <label>Username *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">👤</span>
                  <input
                    type="text"
                    placeholder="e.g. john_kamau"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="auth-field">
                <label>Phone Number *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">📱</span>
                  <input
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field">
                <label>Password *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">🔒</span>
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="Create a strong password"
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
                {loading ? "Creating Account..." : "Create Account →"}
              </button>

              <p className="auth-terms">
                By signing up you agree to our{" "}
                <span className="auth-link">Terms of Service</span> and{" "}
                <span className="auth-link">Privacy Policy</span>.
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;