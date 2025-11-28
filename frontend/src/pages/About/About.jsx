import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>About Blood Donation System</h1>
          <p>Connecting donors with those in need - saving lives together</p>
        </div>

        <div className="about-content">
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To create a reliable network of blood donors and ensure timely access to safe blood for everyone in need.</p>
            </div>

            <div className="about-card">
              <div className="about-icon">👥</div>
              <h3>Our Community</h3>
              <p>Join thousands of registered donors who are ready to save lives in their local communities.</p>
            </div>

            <div className="about-card">
              <div className="about-icon">⚡</div>
              <h3>Quick Response</h3>
              <p>Emergency blood requests get immediate attention and reach potential donors within minutes.</p>
            </div>

            <div className="about-card">
              <div className="about-icon">🛡️</div>
              <h3>Safe & Secure</h3>
              <p>We maintain strict privacy standards and ensure all donor information is securely protected.</p>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat">
              <h3>1000+</h3>
              <p>Lives Saved</p>
            </div>
            <div className="stat">
              <h3>500+</h3>
              <p>Active Donors</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Partner Hospitals</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Emergency Service</p>
            </div>
          </div>

          <div className="about-cta">
            <h2>Ready to Make a Difference?</h2>
            <p>Your single donation can save up to 3 lives. Join our life-saving community today.</p>
            <a href="/register" className="btn btn-primary">Become a Donor</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;