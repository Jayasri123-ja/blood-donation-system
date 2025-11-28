import React, { useState, useEffect } from 'react';
import DonorCard from '../DonorCard';
import './DonorList.css';

const DonorList = ({ refreshTrigger }) => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodFilter, setBloodFilter] = useState('');

  useEffect(() => {
    fetchDonors();
  }, [refreshTrigger]); // Add refreshTrigger as dependency

  const fetchDonors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/donors');
      const data = await response.json();
      setDonors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching donors:', error);
      setLoading(false);
    }
  };
  // ... rest of the code

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.phone.includes(searchTerm);
    
    const matchesBlood = bloodFilter === '' || donor.bloodGroup === bloodFilter;
    
    return matchesSearch && matchesBlood;
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  if (loading) {
    return <div className="loading">Loading donors...</div>;
  }

  return (
    <div className="donor-list">
      <div className="list-header">
        <h3>Registered Donors ({filteredDonors.length})</h3>
        
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="blood-filter">
            <select
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
            >
              <option value="">All Blood Groups</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="donors-grid">
        {filteredDonors.length === 0 ? (
          <div className="no-donors">
            <p>No donors found. {donors.length === 0 ? 'Be the first to register!' : 'Try changing your filters.'}</p>
          </div>
        ) : (
          filteredDonors.map(donor => (
            <DonorCard key={donor._id} donor={donor} />
          ))
        )}
      </div>
    </div>
  );
};

export default DonorList;