import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalDonations: 0,
    activeDrives: 0
  });
  const [loading, setLoading] = useState(true);
  const { donorCount, updateDonorCount, refreshTrigger } = useApp();

  const fetchRealStats = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/donors');
    
    if (response.ok) {
      const donorsData = await response.json();
      const currentCount = donorsData.length;
      
      // Only log when count actually changes
      if (currentCount !== stats.totalDonors) {
        console.log('🔄 Home page updated: ${currentCount} donors');
      }
      
      setStats({
        totalDonors: currentCount,
        totalDonations: currentCount * 3,
        activeDrives: Math.max(1, Math.floor(currentCount / 5))
      });
      
      updateDonorCount(currentCount);
      
      setLoading(false);
    }
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    setLoading(false);
  }
};

  // Fetch data on component mount and when refreshTrigger changes
  useEffect(() => {
    fetchRealStats();
  }, [refreshTrigger]);

  // Auto-refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchRealStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="home">
        <div className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="loading-spinner"></div>
              <p>Loading latest statistics...</p>
              <button onClick={fetchRealStats} className="btn btn-secondary">
                🔄 Refresh Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Save Lives, Donate Blood</h1>
            <p>Join our community of blood donors and help save lives in your community</p>
            
            <div className="hero-stats">
              <div className="stat">
                <h3>{stats.totalDonors}+</h3>
                <p>Registered Donors</p>
                <small>🔄 Live updating</small>
              </div>
              <div className="stat">
                <h3>{stats.totalDonations}+</h3>
                <p>Lives Saved</p>
                <small>Each donor saves 3 lives</small>
              </div>
              <div className="stat">
                <h3>{stats.activeDrives}+</h3>
                <p>Blood Drives</p>
                <small>Active in your area</small>
              </div>
            </div>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.2)', 
              padding: '1rem', 
              borderRadius: '8px', 
              margin: '1rem 0',
              fontSize: '0.9rem'
            }}>
              <strong>🎯 Real-time Stats</strong> 
              <br />
              Last updated: {new Date().toLocaleTimeString()}
              <br />
              Auto-refresh: Every 5 seconds
            </div>
            
            <div className="hero-actions">
              <a href="/register" className="btn btn-primary">
                Become a Donor
              </a>
              <a href="/donors" className="btn btn-secondary">
                Find {stats.totalDonors} Donors
              </a>
              <button onClick={fetchRealStats} className="btn btn-secondary">
                🔄 Refresh Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;