import React, { useState } from 'react';
import './EmergencyRequestForm.css';

const EmergencyRequestForm = ({ onEmergencyCreated }) => {
  const [formData, setFormData] = useState({
    // Patient Information
    patientName: '',
    patientAge: '',
    reason: '',
    
    // Blood Requirements
    bloodGroup: '',
    unitsRequired: 1,
    requiredBy: '',
    
    // Hospital Details
    hospital: '',
    department: '',
    
    // Contact Information
    contactPerson: '',
    contactNumber: '',

    
    // Status
    urgencyLevel: 'High',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = [
    { value: 'Low', label: 'Low', color: '#20c997' },
    { value: 'Medium', label: 'Medium', color: '#ffc107' },
    { value: 'High', label: 'High', color: '#fd7e14' },
    { value: 'Critical', label: 'Critical', color: '#dc3545' }
  ];

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
      const requestData = {
        ...formData,
        requiredBy: formData.requiredBy || new Date().toISOString().split('T')[0],
        patientAge: formData.patientAge ? parseInt(formData.patientAge) : undefined
      };

      const response = await fetch('http://localhost:5000/api/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        setMessage('Emergency request created successfully!');
        
        // Reset form
        setFormData({
          patientName: '',
          patientAge: '',
          reason: '',
          bloodGroup: '',
          unitsRequired: 1,
          requiredBy: '',
          hospital: '',
          department: '',
          contactPerson: '',
          contactNumber: '',
          relationToPatient: '',
          urgencyLevel: 'High',
          description: ''
        });

        // Notify parent
        if (onEmergencyCreated) {
          onEmergencyCreated();
        }
      } else {
        setMessage('Error creating emergency request');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="emergency-form-container">
      <h3>🆕 Create Emergency Blood Request</h3>
      
      <form onSubmit={handleSubmit} className="emergency-form">
        {/* Patient Information */}
        <div className="form-section">
          <h4>👤 Patient Information</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Patient Age</label>
              <input
                type="number"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleChange}
  
                min="1"
                max="120"
                disabled={loading}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Reason for Request </label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Blood Requirements */}
        <div className="form-section">
          <h4>🩸 Blood Requirements</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Blood Group Needed </label>
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
              <label>Units Required </label>
              <input
                type="number"
                name="unitsRequired"
                value={formData.unitsRequired}
                onChange={handleChange}
                min="1"
                max="10"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Urgency Level </label>
              <select
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
                required
                disabled={loading}
              >
                {urgencyLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Required By </label>
            <input
              type="datetime-local"
              name="requiredBy"
              value={formData.requiredBy}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 16)}
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Hospital Details */}
        <div className="form-section">
          <h4>🏥 Hospital Details</h4>
          <div className="form-group">
            <label>Hospital Name </label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-row">
            
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Location/City </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
          
                required
                disabled={loading}
              />
            </div>
  
          </div>
        </div>

        {/* Contact Information */}
        <div className="form-section">
          <h4>📞 Contact Information</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Contact Person </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
      
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Relation to Patient</label>
              <input
                type="text"
                name="relationToPatient"
                value={formData.relationToPatient}
                onChange={handleChange}
            
                disabled={loading}
              />
            </div>
          </div>
          <div className="form-row">
  
            <div className="form-group">
              
            </div>
          </div>
        </div>

        {message && (
          <div className={`form-message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-emergency"
          disabled={loading}
        >
          {loading ? 'Creating Request...' : ' Create Emergency Request'}
        </button>
      </form>
    </div>
  );
};

export default EmergencyRequestForm;