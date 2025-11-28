import React, { useState, useEffect } from 'react';
import DonorList from '../../../components/donor/DonorList';
import './DonorDashboard.css';

const DonorDashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDonorAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="donor-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2>Blood Donor Management</h2>
          <div className="dashboard-actions">
            
          </div>
        </div>
        
        <div className="dashboard-content">
          <DonorList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;