import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../contexts/AppContext';
import './DonorRegistration.css';

const DonorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    age: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    healthInfo: {
      weight: '',
      height: '',
      hasDiseases: false,
      diseaseDetails: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { triggerRefresh } = useApp();
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
        age: parseInt(formData.age),
        gender: formData.gender,
        address: formData.address.street ? formData.address : undefined,
        healthInfo: formData.healthInfo.weight ? formData.healthInfo : undefined
      };

      const response = await fetch('http://localhost:5000/api/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const responseData = await response.json();

      if (response.ok) {
        alert('Donor registered successfully!');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          bloodGroup: '',
          age: '',
          gender: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
          },
          healthInfo: {
            weight: '',
            height: '',
            hasDiseases: false,
            diseaseDetails: ''
          }
        });

        // 🔥 TRIGGER GLOBAL REFRESH
        triggerRefresh();
        
        // Redirect to donors page
        setTimeout(() => {
          navigate('/donors');
        }, 1000);
      } else {
        const errorMsg = responseData.message || 'Error registering donor';
        setError(errorMsg);
        alert(`Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error: Could not connect to server');
      alert('Network error: Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donor-registration">
      <h3>Register as Blood Donor</h3>
      
      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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

        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Blood Group *</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="65"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
                required
                disabled={loading}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
                disabled={loading}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={handleChange}
                disabled={loading}
              />
              Other
            </label>
          </div>
        </div>

        {/* Address Section */}
        <div className="form-group">
          <label>Address</label>
          <div className="form-row">
            <input
              type="text"
              name="address.city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
              disabled={loading}
            />
            <input
              type="text"
              name="address.state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* Health Information Section */}
        <div className="form-group">
          <label>Health Information</label>
          <div className="form-row">
            <input
              type="number"
              name="healthInfo.weight"
              placeholder="Weight (kg)"
              value={formData.healthInfo.weight}
              onChange={handleChange}
              disabled={loading}
            />
            <input
              type="text"
              name="healthInfo.height"
              placeholder="Height"
              value={formData.healthInfo.height}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register as Donor'}
        </button>
      </form>
    </div>
  );
};

export default DonorRegistration;