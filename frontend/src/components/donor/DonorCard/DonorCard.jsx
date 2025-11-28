import React from 'react';
import './DonorCard.css';

const DonorCard = ({ donor }) => {
  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': '#dc3545',
      'A-': '#e83e8c',
      'B+': '#fd7e14',
      'B-': '#ffc107',
      'AB+': '#20c997',
      'AB-': '#0dcaf0',
      'O+': '#6f42c1',
      'O-': '#6610f2'
    };
    return colors[bloodGroup] || '#6c757d';
  };

  return (
    <div className="donor-card">
      <div className="card-header">
        <div 
          className="blood-badge"
          style={{ backgroundColor: getBloodGroupColor(donor.bloodGroup) }}
        >
          {donor.bloodGroup}
        </div>
        <div className="donor-status">
          <span className={`status ${donor.isAvailable ? 'available' : 'unavailable'}`}>
            {donor.isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>

      <div className="card-body">
        <h4>{donor.name}</h4>
        <p className="email">{donor.email}</p>
        <p className="phone">📞 {donor.phone}</p>
        
        <div className="donor-info">
          <div className="info-item">
            <span className="label">Age:</span>
            <span className="value">{donor.age} years</span>
          </div>
          <div className="info-item">
            <span className="label">Gender:</span>
            <span className="value">{donor.gender}</span>
          </div>
          {donor.healthInfo?.weight && (
            <div className="info-item">
              <span className="label">Weight:</span>
              <span className="value">{donor.healthInfo.weight} kg</span>
            </div>
          )}
        </div>

        {donor.address?.city && (
          <div className="address">
            <span className="label">Location:</span>
            <span className="value">
              {donor.address.city}, {donor.address.state}
            </span>
          </div>
        )}

        {donor.lastDonationDate && (
          <div className="last-donation">
            <span className="label">Last Donation:</span>
            <span className="value">
              {new Date(donor.lastDonationDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorCard;