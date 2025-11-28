import React, { useState, useEffect } from 'react';
import './EmergencyRequestList.css';

const EmergencyRequestList = ({ refreshTrigger }) => {
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

  const handleCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleShare = (emergency) => {
    const message = `🚨 URGENT BLOOD NEEDED\n\nBlood Type: ${emergency.bloodGroup}\nUnits Needed: ${emergency.unitsRequired}\nHospital: ${emergency.hospital}\nLocation: ${emergency.location}\nContact: ${emergency.contactPerson} - ${emergency.contactNumber}\n\nPlease help if you can!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Emergency Blood Request',
        text: message
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(message);
      alert('Emergency details copied to clipboard!');
    }
  };

  if (loading) {
    return <div className="emergency-loading">Loading emergency requests...</div>;
  }

  if (emergencies.length === 0) {
    return (
      <div className="no-emergencies">
        <div className="no-emergencies-icon">🩸</div>
        <h3>No Active Emergency Requests</h3>
        <p>There are no urgent blood requests at the moment.</p>
        <p>All blood types are currently available.</p>
      </div>
    );
  }

  return (
    <div className="emergency-list-container">
      <h3>Active Emergency Requests ({emergencies.length})</h3>
      
      <div className="emergency-list">
        {emergencies.map(emergency => (
          <div 
            key={emergency._id} 
            className="emergency-card"
            style={{ borderLeft: `5px solid ${getUrgencyColor(emergency.urgencyLevel)}` }}
          >
            <div className="emergency-header">
              <div className="urgency-badge" style={{ backgroundColor: getUrgencyColor(emergency.urgencyLevel) }}>
                {emergency.urgencyLevel}
              </div>
              <div className="blood-requirement">
                <span className="blood-type">{emergency.bloodGroup}</span>
                <span className="units">({emergency.unitsRequired} units needed)</span>
              </div>
            </div>

            <div className="emergency-details">
              {/* Patient Info */}
              {(emergency.patientName || emergency.reason) && (
                <div className="detail-section">
                  <h4>👤 Patient Information</h4>
                  <div className="detail-grid">
                    {emergency.patientName && (
                      <div className="detail-item">
                        <span className="label">Name:</span>
                        <span className="value">{emergency.patientName}</span>
                      </div>
                    )}
                    {emergency.patientAge && (
                      <div className="detail-item">
                        <span className="label">Age:</span>
                        <span className="value">{emergency.patientAge} years</span>
                      </div>
                    )}
                    {emergency.reason && (
                      <div className="detail-item full-width">
                        <span className="label">Reason:</span>
                        <span className="value">{emergency.reason}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Hospital Info */}
              <div className="detail-section">
                <h4>🏥 Hospital Details</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Hospital:</span>
                    <span className="value">{emergency.hospital}</span>
                  </div>
                  {emergency.department && (
                    <div className="detail-item">
                      <span className="label">Department:</span>
                      <span className="value">{emergency.department}</span>
                    </div>
                  )}
                  {emergency.bedNumber && (
                    <div className="detail-item">
                      <span className="label">Bed No:</span>
                      <span className="value">{emergency.bedNumber}</span>
                    </div>
                  )}
                  <div className="detail-item full-width">
                    <span className="label">Location:</span>
                    <span className="value">{emergency.location}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="detail-section">
                <h4>📞 Contact Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Contact:</span>
                    <span className="value">{emergency.contactPerson}</span>
                  </div>
                  {emergency.relationToPatient && (
                    <div className="detail-item">
                      <span className="label">Relation:</span>
                      <span className="value">{emergency.relationToPatient}</span>
                    </div>
                  )}
                  <div className="detail-item full-width">
                    <span className="label">Phone:</span>
                    <span className="value phone-number">{emergency.contactNumber}</span>
                  </div>
                  {emergency.alternateNumber && (
                    <div className="detail-item full-width">
                      <span className="label">Alternate:</span>
                      <span className="value phone-number">{emergency.alternateNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="detail-section">
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">⏰ Required By:</span>
                    <span className="value urgent">
                      {new Date(emergency.requiredBy).toLocaleString()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">🔄 Status:</span>
                    <span className="value">{emergency.donorsResponded} donors responded</span>
                  </div>
                </div>
              </div>

              {emergency.description && (
                <div className="detail-section">
                  <h4>📝 Additional Information</h4>
                  <p className="description">{emergency.description}</p>
                </div>
              )}
            </div>

            <div className="emergency-actions">
              <button 
                className="btn-call"
                onClick={() => handleCall(emergency.contactNumber)}
              >
                📞 Call Now
              </button>
              <button 
                className="btn-share"
                onClick={() => handleShare(emergency)}
              >
                📤 Share
              </button>
              <button className="btn-donate">
                💝 I Can Help
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyRequestList;