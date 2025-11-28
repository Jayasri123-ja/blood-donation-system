import React from 'react';
import DonorRegistration from '../../components/donor/DonorRegistration';
import './Register.css';

const Register = () => {
  return (
    <div className="register-page">
      <div className="container">
        <div className="register-header">
          <h1>Become a Blood Donor</h1>
        </div>
        <div className="register-form-container">
          <DonorRegistration />
        </div>
      </div>
    </div>
  );
};

export default Register;