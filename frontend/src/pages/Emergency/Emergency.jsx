import React, { useState, useEffect } from 'react';
import EmergencyRequestForm from '../../components/emergency/EmergencyRequestForm';
import EmergencyRequestList from '../../components/emergency/EmergencyRequestList';
import './Emergency.css';

const Emergency = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRequestCreated = () => {
    console.log('🔄 Triggering refresh after new request...');
    setRefreshTrigger(prev => prev + 1);
    setActiveTab('requests');
  };

  // Auto-refresh when switching to requests tab
  useEffect(() => {
    if (activeTab === 'requests') {
      console.log('🔄 Auto-refreshing emergency requests...');
      setRefreshTrigger(prev => prev + 1);
    }
  }, [activeTab]);

  return (
    <div className="emergency-page">
      <div className="container">
        <div className="emergency-header">
          <h1>Emergency Blood Requests</h1>
        </div>

        <div className="emergency-tabs">
          <button 
            className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            📋 Active Requests
          </button>
          <button 
            className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            🆕 Create Request
          </button>
        </div>

        <div className="emergency-content">
          {activeTab === 'requests' ? (
            <EmergencyRequestList refreshTrigger={refreshTrigger} />
          ) : (
            <EmergencyRequestForm onEmergencyCreated={handleRequestCreated} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Emergency;