import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/AdminDashboard.css';
 
// ══════════════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD — OptiLux
// Secret URL: /optilux-admin-2026  (not linked anywhere on the public site)
// Protected by password gate — wrong password = no access, no hints given
// ══════════════════════════════════════════════════════════════════════════════
 
const ADMIN_PASSWORD = "OptiLux@Admin2026"; // ← change this anytime you want
const API            = "https://jeremiahprince.alwaysdata.net/api";
 
// ══════════════════════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ══════════════════════════════════════════════════════════════════════════════
const LoginScreen = ({ onLogin }) => {
  const [pwd,     setPwd]     = useState("");
  const [error,   setError]   = useState("");
  const [shaking, setShaking] = useState(false);
  const [show,    setShow]    = useState(false);
 
  const handleLogin = () => {
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem("optilux_admin", "true");
      onLogin();
    } else {
      setError("Incorrect password. Access denied.");
      setShaking(true);
      setPwd("");
      setTimeout(() => { setShaking(false); setError(""); }, 2500);
    }
  };
 
  return (
    <div className="admin-login-page">
      <div className="admin-login-grid"></div>
 
      <div className={`admin-login-card ${shaking ? "shake" : ""}`}>
        <div className="admin-login-logo">
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
        </div>
 
        <p className="admin-login-tag">Restricted Access</p>
        <h1 className="admin-login-title">OptiLux Admin</h1>
        <p className="admin-login-sub">Enter your admin password to continue.</p>
 
        {error && <div className="admin-login-error">🔒 {error}</div>}
 
        <div className="admin-login-field">
          <input
            type={show ? "text" : "password"}
            placeholder="Admin password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            autoFocus
          />
          <button className="admin-pwd-toggle" onClick={() => setShow(!show)} tabIndex={-1}>
            {show ? "🙈" : "👁️"}
          </button>
        </div>
 
        <button className="admin-login-btn" onClick={handleLogin}>
          Access Dashboard →
        </button>
 
        <p className="admin-login-footer">OptiLux Admin Panel · Authorised personnel only</p>
      </div>
    </div>
  );
};
 
// ══════════════════════════════════════════════════════════════════════════════
// TAB 1 — ADD PRODUCT
// ══════════════════════════════════════════════════════════════════════════════
const AddProductTab = () => {
  const [form, setForm] = useState({
    product_name: "", product_description: "", product_cost: "", category_id: ""
  });
  const [photo,      setPhoto]      = useState(null);
  const [categories, setCategories] = useState([]);
  const [status,     setStatus]     = useState(null);
  const [message,    setMessage]    = useState("");
 
  useEffect(() => {
    axios.get(`${API}/get_categories`)
      .then(res => setCategories(res.data))
      .catch(() => {});
  }, []);
 
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.product_name || !form.product_description || !form.product_cost || !form.category_id || !photo) {
      setStatus("error"); setMessage("All fields including photo are required."); return;
    }
    setStatus("loading");
    try {
      const fd = new FormData();
      fd.append("product_name",        form.product_name);
      fd.append("product_description", form.product_description);
      fd.append("product_cost",        form.product_cost);
      fd.append("category_id",         form.category_id);
      fd.append("product_photo",       photo);
      const res = await axios.post(`${API}/add_product`, fd);
      setStatus("success");
      setMessage(res.data.message || "Product added successfully!");
      setForm({ product_name: "", product_description: "", product_cost: "", category_id: "" });
      setPhoto(null);
      document.getElementById("photo-input").value = "";
      setTimeout(() => setStatus(null), 4000);
    } catch (err) {
      setStatus("error"); setMessage(err.message || "Something went wrong.");
    }
  };
 
  return (
    <div className="admin-tab-content">
      <div className="admin-section-header">
        <h2>Add New Product</h2>
        <p>Fill in all fields to list a new frame on the OptiLux store.</p>
      </div>
 
      {status === "success" && <div className="admin-alert success">✓ {message}</div>}
      {status === "error"   && <div className="admin-alert error">✕ {message}</div>}
 
      <form className="admin-product-form" onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Product Name *</label>
            <input type="text" name="product_name" placeholder="e.g. Ray-Ban Aviator Classic"
              value={form.product_name} onChange={handleChange}/>
          </div>
          <div className="admin-form-group">
            <label>Price (Kes) *</label>
            <input type="number" name="product_cost" placeholder="e.g. 8500" min="0"
              value={form.product_cost} onChange={handleChange}/>
          </div>
        </div>
 
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Category *</label>
            <select name="category_id" value={form.category_id} onChange={handleChange}>
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
              ))}
            </select>
          </div>
          <div className="admin-form-group">
            <label>Product Photo *</label>
            <input id="photo-input" type="file" accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])} className="admin-file-input"/>
            {photo && <p className="admin-file-name">📎 {photo.name}</p>}
          </div>
        </div>
 
        <div className="admin-form-group full">
          <label>Description *</label>
          <textarea name="product_description" rows="4"
            placeholder="Describe the product — brand, lens type, frame material, style..."
            value={form.product_description} onChange={handleChange}></textarea>
        </div>
 
        {photo && (
          <div className="admin-photo-preview">
            <img src={URL.createObjectURL(photo)} alt="preview"/>
            <button type="button" className="admin-photo-remove"
              onClick={() => { setPhoto(null); document.getElementById("photo-input").value = ""; }}>
              ✕ Remove
            </button>
          </div>
        )}
 
        <button type="submit" className="admin-submit-btn" disabled={status === "loading"}>
          {status === "loading" ? "Adding Product..." : "Add Product to Store →"}
        </button>
      </form>
    </div>
  );
};
 
// ══════════════════════════════════════════════════════════════════════════════
// TAB 2 — MANAGE PRODUCTS (view + delete)
// ══════════════════════════════════════════════════════════════════════════════
const ManageProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [deleting, setDeleting] = useState(null);
  const [alert,    setAlert]    = useState(null);
 
  const IMG = "https://jeremiahprince.alwaysdata.net/static/images/";
 
  const load = () => {
    setLoading(true);
    axios.get(`${API}/get_products`)
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };
 
  useEffect(() => { load(); }, []);
 
  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.product_name}"? This cannot be undone.`)) return;
    setDeleting(product.product_id);
    try {
      await axios.delete(`${API}/delete_product/${product.product_id}`);
      setAlert({ type: "success", msg: `"${product.product_name}" deleted successfully.` });
      load();
    } catch {
      setAlert({ type: "error", msg: "Delete failed. Please try again." });
    } finally {
      setDeleting(null);
      setTimeout(() => setAlert(null), 4000);
    }
  };
 
  const filtered = products.filter(p =>
    p.product_name?.toLowerCase().includes(search.toLowerCase())
  );
 
  return (
    <div className="admin-tab-content">
      <div className="admin-section-header">
        <h2>Manage Products</h2>
        <p>{products.length} products currently in the store</p>
      </div>
 
      {alert && (
        <div className={`admin-alert ${alert.type}`}>
          {alert.type === "success" ? "✓" : "✕"} {alert.msg}
        </div>
      )}
 
      <input className="admin-search" type="text" placeholder="🔍  Search products..."
        value={search} onChange={(e) => setSearch(e.target.value)}/>
 
      {loading ? (
        <div className="admin-loading">Loading products...</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">No products found.</div>
      ) : (
        <div className="admin-products-grid">
          {filtered.map((p, i) => (
            <div key={i} className="admin-product-card">
              <div className="admin-product-img">
                <img src={IMG + p.product_photo} alt={p.product_name}
                  onError={(e) => { e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80'%3E%3Crect width='120' height='80' fill='%23111827'/%3E%3Ctext x='50%25' y='50%25' fill='%23374151' font-size='10' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E"; }}
                />
              </div>
              <div className="admin-product-info">
                <span className="admin-product-cat">{p.category_name || "Uncategorised"}</span>
                <h4>{p.product_name}</h4>
                <p>{p.product_description?.slice(0, 80)}...</p>
                <strong className="admin-product-price">Kes {Number(p.product_cost).toLocaleString()}</strong>
              </div>
              <button className="admin-delete-btn" onClick={() => handleDelete(p)}
                disabled={deleting === p.product_id}>
                {deleting === p.product_id ? "Deleting..." : "🗑 Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
// ══════════════════════════════════════════════════════════════════════════════
// TAB 3 — SUBSCRIBERS
// ══════════════════════════════════════════════════════════════════════════════
const SubscribersTab = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [search,      setSearch]      = useState("");
 
  useEffect(() => {
    axios.get(`${API}/admin/subscribers`, {
      headers: { "x-admin-password": ADMIN_PASSWORD }
    })
      .then(res => { setSubscribers(res.data); setLoading(false); })
      .catch(() => { setError("Could not load subscribers."); setLoading(false); });
  }, []);
 
  const filtered = subscribers.filter(s =>
    s.email?.toLowerCase().includes(search.toLowerCase())
  );
 
  return (
    <div className="admin-tab-content">
      <div className="admin-section-header">
        <h2>Newsletter Subscribers</h2>
        <p>{subscribers.length} total subscribers</p>
      </div>
 
      <input className="admin-search" type="text" placeholder="🔍  Search by email..."
        value={search} onChange={(e) => setSearch(e.target.value)}/>
 
      {loading && <div className="admin-loading">Loading subscribers...</div>}
      {error   && <div className="admin-alert error">✕ {error}</div>}
 
      {!loading && !error && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr><th>#</th><th>Email Address</th><th>Subscribed On</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="3" className="admin-table-empty">No subscribers found.</td></tr>
              ) : (
                filtered.map((s, i) => (
                  <tr key={i}>
                    <td className="admin-table-num">{i + 1}</td>
                    <td><a href={`mailto:${s.email}`} className="admin-email-link">{s.email}</a></td>
                    <td className="admin-table-date">
                      {s.subscribed_at
                        ? new Date(s.subscribed_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
 
// ══════════════════════════════════════════════════════════════════════════════
// TAB 4 — CONTACT MESSAGES
// ══════════════════════════════════════════════════════════════════════════════
const MessagesTab = () => {
  const [messages, setMessages] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [open,     setOpen]     = useState(null);
 
  useEffect(() => {
    axios.get(`${API}/admin/messages`, {
      headers: { "x-admin-password": ADMIN_PASSWORD }
    })
      .then(res => { setMessages(res.data); setLoading(false); })
      .catch(() => { setError("Could not load messages."); setLoading(false); });
  }, []);
 
  return (
    <div className="admin-tab-content">
      <div className="admin-section-header">
        <h2>Contact Messages</h2>
        <p>{messages.length} messages received</p>
      </div>
 
      {loading && <div className="admin-loading">Loading messages...</div>}
      {error   && <div className="admin-alert error">✕ {error}</div>}
      {!loading && !error && messages.length === 0 && (
        <div className="admin-empty">No contact messages yet.</div>
      )}
 
      {!loading && !error && messages.map((msg, i) => (
        <div key={i} className={`admin-message-card ${open === i ? "expanded" : ""}`}>
          <div className="admin-message-header" onClick={() => setOpen(open === i ? null : i)}>
            <div className="admin-message-meta">
              <span className="admin-message-subject">{msg.subject}</span>
              <span className="admin-message-from">{msg.name} · {msg.email}</span>
            </div>
            <div className="admin-message-right">
              <span className="admin-message-date">
                {msg.sent_at
                  ? new Date(msg.sent_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })
                  : "—"}
              </span>
              <span className="admin-message-chevron">{open === i ? "▴" : "▾"}</span>
            </div>
          </div>
          {open === i && (
            <div className="admin-message-body">
              <div className="admin-message-details">
                <span>📞 {msg.phone}</span>
                <a href={`mailto:${msg.email}?subject=Re: ${msg.subject} — OptiLux`}
                  className="admin-reply-btn">Reply →</a>
              </div>
              <p className="admin-message-text">{msg.message}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
 
// ══════════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD SHELL
// ══════════════════════════════════════════════════════════════════════════════
const AdminDashboard = () => {
  const [loggedIn,  setLoggedIn]  = useState(sessionStorage.getItem("optilux_admin") === "true");
  const [activeTab, setActiveTab] = useState("add");
 
  const handleLogout = () => { sessionStorage.removeItem("optilux_admin"); setLoggedIn(false); };
 
  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;
 
  const tabs = [
    { id: "add",      label: "➕  Add Product"     },
    { id: "products", label: "📦  Manage Products" },
    { id: "subs",     label: "📧  Subscribers"      },
    { id: "messages", label: "💬  Messages"         },
  ];
 
  return (
    <div className="admin-dashboard">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <div className="admin-sidebar-logo">
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
            <div>
              <span className="admin-sidebar-name">OptiLux</span>
              <span className="admin-sidebar-role">Admin Panel</span>
            </div>
          </div>
 
          <nav className="admin-nav">
            {tabs.map(tab => (
              <button key={tab.id}
                className={`admin-nav-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
 
        <div className="admin-sidebar-bottom">
          <a href="/" className="admin-nav-item view-site" target="_blank" rel="noreferrer">
            🌐  View Live Site
          </a>
          <button className="admin-logout-btn" onClick={handleLogout}>
            🔒  Log Out
          </button>
        </div>
      </aside>
 
      {/* MAIN */}
      <main className="admin-main">
        <div className="admin-topbar">
          <h1 className="admin-topbar-title">{tabs.find(t => t.id === activeTab)?.label}</h1>
          <span className="admin-topbar-badge">● Live</span>
        </div>
        <div className="admin-content">
          {activeTab === "add"      && <AddProductTab     />}
          {activeTab === "products" && <ManageProductsTab />}
          {activeTab === "subs"     && <SubscribersTab    />}
          {activeTab === "messages" && <MessagesTab       />}
        </div>
      </main>
    </div>
  );
};
 
export default AdminDashboard;