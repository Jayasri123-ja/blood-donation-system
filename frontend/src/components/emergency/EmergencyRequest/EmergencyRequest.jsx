import React, { useState, useEffect } from 'react';
import './EmergencyRequest.css';

const EmergencyRequest = ({ refreshTrigger }) => {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmergencies();
  }, [refreshTrigger]);

  const fetchEmergencies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/emergency');
      const data = await response.json();
      setEmergencies(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching emergencies:', error);
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical': return '#dc3545';
      case 'High': return '#fd7e14';
      case 'Medium': return '#ffc107';
      case 'Low': return '#20c997';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <div className="emergency-loading">Loading emergency requests...</div>;
  }

  if (emergencies.length === 0) {
    return (
      <div className="emergency-section">
        <div className="emergency-header">
          <div className="emergency-icon">🩸</div>
          <h3>Blood Availability</h3>
        </div>
        <div className="no-emergencies">
          <p>No urgent blood requests at the moment.</p>
          <p>All blood types are currently available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="emergency-section">
      <div className="emergency-header">
        <div className="emergency-icon">🚨</div>
        <h3>URGENT BLOOD NEEDED</h3>
      </div>
      
      <div className="emergency-list">
        {emergencies.map(emergency => (
          <div 
            key={emergency._id} 
            className="emergency-card"
            style={{ borderLeft: `4px solid ${getUrgencyColor(emergency.urgencyLevel)}` }}
          >
            <div className="emergency-urgency">
              <span 
                className="urgency-badge"
                style={{ backgroundColor: getUrgencyColor(emergency.urgencyLevel) }}
              >
                {emergency.urgencyLevel}
              </span>
            </div>
            
            <div className="emergency-details">
              <div className="blood-group">
                <span className="blood-type">{emergency.bloodGroup}</span>
                <span className="units">({emergency.unitsRequired} units needed)</span>
              </div>
              
              <div className="emergency-info">
                <div className="info-item">
                  <span className="label">🏥 Hospital:</span>
                  <span className="value">{emergency.hospital}</span>
                </div>
                
                <div className="info-item">
                  <span className="label">📍 Location:</span>
                  <span className="value">{emergency.location}</span>
                </div>
                
                <div className="info-item">
                  <span className="label">⏰ Required By:</span>
                  <span className="value">
                    {new Date(emergency.requiredBy).toLocaleDateString()}
                  </span>
                </div>
                
                {emergency.contactPerson && (
                  <div className="info-item">
                    <span className="label">📞 Contact:</span>
                    <span className="value">
                      {emergency.contactPerson} - {emergency.contactNumber}
                    </span>
                  </div>
                )}
              </div>
              
              {emergency.description && (
                <div className="emergency-description">
                  <p>{emergency.description}</p>
                </div>
              )}
            </div>
            
            <div className="emergency-actions">
              <button className="btn-help">I Can Help</button>
              <button className="btn-share">Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyRequest;