import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('✅ Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setMessage('❌ There was an error sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Get in touch with us for any queries, feedback, or emergency blood requirements</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Emergency Helpline</h3>
              <p>24/7 Available</p>
              <a href="tel:+911234567890">+91 12345 67890</a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email Us</h3>
              <p>We'll respond quickly</p>
              <a href="mailto:support@blooddonation.com">support@blooddonation.com</a>
            </div>

            

            <div className="contact-card">
              <div className="contact-icon">🕒</div>
              <h3>Working Hours</h3>
              <p>Always Available</p>
              <span>24/7 Emergency Service</span>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="">Select a subject</option>
                    <option value="emergency">🚨 Emergency Blood Request</option>
                    <option value="donor-registration">🩸 Donor Registration Help</option>
                    <option value="general-query">❓ General Query</option>
                    <option value="feedback">💬 Feedback & Suggestions</option>
                    <option value="partnership">🤝 Partnership Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Please describe your query in detail..."
                  rows="4"
                />
              </div>

              {message && (
                <div className={`form-message ${message.includes('✅') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Sending...' : '📤 Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="emergency-notice">
      
          <div className="emergency-content">
            <h3>For Emergency Blood Requirements</h3>
            <p>If you need blood urgently, please use our <strong>Emergency Blood Request</strong> feature for faster response.</p>
            <a href="/emergency" className="btn btn-emergency">Go to Emergency Requests</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;