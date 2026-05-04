import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Careers.css';
import AboutNav from './AboutNav';

const Careers = () => {
  const navigate = useNavigate();
  const [activeJob, setActiveJob]       = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Technology", "Sales", "Operations", "Design"];

  const jobs = [
    {
      id: 1, title: "Frontend Developer",           department: "Technology", location: "Nairobi, Kenya", type: "Full-time", level: "Mid-level",
      description: "We are looking for a talented Frontend Developer to join our growing tech team. You will be responsible for building and maintaining the OptiLux web platform, ensuring a seamless and luxurious user experience across all devices.",
      responsibilities: ["Build and maintain React-based web interfaces", "Collaborate with the design team to implement pixel-perfect UI", "Optimise application performance and loading speeds", "Integrate REST APIs from our Flask backend", "Participate in code reviews and technical planning"],
      requirements: ["2+ years of experience with React.js", "Strong proficiency in HTML, CSS, and JavaScript", "Experience with REST API integration", "Eye for detail and passion for clean UI", "Familiarity with Git and version control"]
    },
    {
      id: 2, title: "Sales Executive",              department: "Sales",      location: "Nairobi, Kenya", type: "Full-time", level: "Entry-level",
      description: "Join our sales team and help bring premium eyewear to customers across Kenya. You will manage client relationships, drive sales targets, and represent the OptiLux brand with excellence and professionalism.",
      responsibilities: ["Drive sales of OptiLux products across assigned territories", "Build and maintain relationships with opticians and retail partners", "Conduct product demonstrations and consultations", "Meet and exceed monthly sales targets", "Provide market feedback to the product team"],
      requirements: ["1+ years of sales experience", "Excellent communication and interpersonal skills", "Self-motivated with a results-driven attitude", "Knowledge of the Kenyan retail landscape", "Valid driving licence is an advantage"]
    },
    {
      id: 3, title: "Logistics & Delivery Coordinator", department: "Operations", location: "Mombasa, Kenya", type: "Full-time", level: "Mid-level",
      description: "We are expanding our operations team in Mombasa. You will oversee the end-to-end delivery process for coastal Kenya, ensuring every OptiLux order reaches our customers on time and in perfect condition.",
      responsibilities: ["Coordinate daily delivery schedules across coastal Kenya", "Manage relationships with courier and logistics partners", "Track and resolve delivery issues in real time", "Maintain inventory accuracy at the Mombasa warehouse", "Report on delivery KPIs to the operations manager"],
      requirements: ["2+ years in logistics or supply chain", "Strong organisational and problem-solving skills", "Experience with inventory management systems", "Ability to work under pressure in a fast-paced environment", "Fluent in English and Kiswahili"]
    },
    {
      id: 4, title: "UI/UX Designer",               department: "Design",     location: "Nairobi, Kenya", type: "Full-time", level: "Mid-level",
      description: "We are looking for a creative and detail-oriented UI/UX Designer to shape the visual identity and user experience of OptiLux across web and mobile.",
      responsibilities: ["Design elegant, intuitive interfaces for web and mobile", "Create wireframes, prototypes, and high-fidelity mockups", "Conduct user research and usability testing", "Maintain and evolve the OptiLux design system", "Collaborate with developers to ensure faithful implementation"],
      requirements: ["3+ years of UI/UX design experience", "Proficiency in Figma or Adobe XD", "Strong portfolio demonstrating clean, modern design", "Understanding of accessibility and responsive design principles", "Experience designing for e-commerce is a strong advantage"]
    },
    {
      id: 5, title: "Backend Developer",             department: "Technology", location: "Nairobi, Kenya", type: "Full-time", level: "Senior",
      description: "We need an experienced Backend Developer to strengthen and scale our Flask-based API infrastructure. You will architect robust systems that power OptiLux's growing customer base across Kenya.",
      responsibilities: ["Design and maintain Flask REST APIs", "Optimise MySQL database queries and schema", "Implement secure payment integrations including M-Pesa", "Build internal admin tools for the operations team", "Ensure API security, reliability, and uptime"],
      requirements: ["3+ years of backend development experience", "Strong proficiency in Python and Flask", "Deep knowledge of MySQL and database optimisation", "Experience with payment gateway integrations", "Understanding of REST API design best practices"]
    },
    {
      id: 6, title: "Brand & Content Strategist",   department: "Design",     location: "Nairobi, Kenya", type: "Full-time", level: "Mid-level",
      description: "OptiLux is building one of Kenya's most recognisable luxury brands. We need a creative Brand and Content Strategist to lead our storytelling across all channels.",
      responsibilities: ["Develop and execute OptiLux's content strategy", "Write compelling blog articles, product descriptions, and social copy", "Manage the OptiLux social media presence", "Collaborate with the design team on visual campaigns", "Track content performance and optimise based on data"],
      requirements: ["3+ years in content strategy or brand marketing", "Exceptional writing and storytelling skills", "Deep understanding of luxury brand aesthetics", "Experience with social media management tools", "Passion for fashion, eyewear, or lifestyle brands"]
    },
  ];

  const filteredJobs = activeFilter === "All" ? jobs : jobs.filter(j => j.department === activeFilter);

  const perks = [
    { icon: "◈", title: "Competitive Salary",  desc: "Market-leading pay with performance bonuses reviewed annually."         },
    { icon: "◉", title: "Health Cover",         desc: "Comprehensive medical cover for you and your immediate family."          },
    { icon: "◇", title: "Free Eyewear",         desc: "Every OptiLux team member gets a free premium frame every year."        },
    { icon: "◆", title: "Remote Flexibility",   desc: "Hybrid working arrangements for all tech and design roles."             },
    { icon: "◈", title: "Learning Budget",      desc: "Kes 50,000 annual budget for courses, conferences, and books."          },
    { icon: "◉", title: "Growth Path",          desc: "Clear promotion criteria and quarterly career development reviews."      },
  ];

  return (
    <div className="careers-page">
      <AboutNav activeLink="Careers" />

      {/* HERO */}
      <section className="careers-hero">
        <div className="careers-hero-content">
          <p className="about-section-tag">Join Our Team</p>
          <h1>Build the Future of <span className="careers-accent">Luxury Eyewear</span> in Kenya</h1>
          <p className="careers-hero-sub">
            We are a passionate team on a mission to make premium eyewear accessible across Kenya.
            If you are driven, creative, and ready to make an impact — we want to hear from you.
          </p>
          <div className="careers-hero-stats">
            <div className="careers-hero-stat"><h3>48+</h3><p>Team Members</p></div>
            <div className="careers-hero-stat"><h3>3</h3><p>Cities</p></div>
            <div className="careers-hero-stat"><h3>6</h3><p>Open Roles</p></div>
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="careers-perks">
        <div className="careers-perks-inner">
          <p className="about-section-tag center">Why OptiLux</p>
          <h2 className="about-section-title center">Life at OptiLux</h2>
          <div className="careers-perks-grid">
            {perks.map((perk, i) => (
              <div key={i} className="careers-perk-card">
                <div className="careers-perk-icon">{perk.icon}</div>
                <h4>{perk.title}</h4>
                <p>{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section className="careers-jobs">
        <div className="careers-jobs-inner">
          <p className="about-section-tag">Open Positions</p>
          <h2 className="about-section-title">Find Your Role</h2>

          <div className="careers-filters">
            {filters.map((f, i) => (
              <button key={i} className={`careers-filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => { setActiveFilter(f); setActiveJob(null); }}>
                {f}
              </button>
            ))}
          </div>

          <div className="careers-job-list">
            {filteredJobs.map((job) => (
              <div key={job.id} className="careers-job-item">
                <div className="careers-job-summary" onClick={() => setActiveJob(activeJob === job.id ? null : job.id)}>
                  <div className="careers-job-left">
                    <div className="careers-job-dept">{job.department}</div>
                    <h3>{job.title}</h3>
                    <div className="careers-job-tags">
                      <span className="careers-job-tag">📍 {job.location}</span>
                      <span className="careers-job-tag">⏱ {job.type}</span>
                      <span className="careers-job-tag">⭐ {job.level}</span>
                    </div>
                  </div>
                  <div className="careers-job-right">
                    <button className="careers-apply-btn">Apply Now</button>
                    <span className={`careers-chevron ${activeJob === job.id ? "open" : ""}`}>▾</span>
                  </div>
                </div>

                {activeJob === job.id && (
                  <div className="careers-job-details">
                    <p className="careers-job-desc">{job.description}</p>
                    <div className="careers-job-cols">
                      <div>
                        <h4>Responsibilities</h4>
                        <ul>{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
                      </div>
                      <div>
                        <h4>Requirements</h4>
                        <ul>{job.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
                      </div>
                    </div>
                    <button className="careers-apply-full-btn" onClick={() => navigate("/contact")}>Apply for This Role →</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-inner">
          <h2>Don't See Your Role?</h2>
          <p>We are always open to exceptional talent. Send us your CV and a short note about what you can bring to OptiLux.</p>
          <button className="about-cta-btn" onClick={() => navigate("/contact")}>Get in Touch →</button>
        </div>
      </section>

      <div className="about-footer-note">
        <p>© 2026 OptiLux. All rights reserved. — Diani, Kenya</p>
      </div>
    </div>
  );
};

export default Careers;