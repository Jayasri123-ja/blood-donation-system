import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h1>🩸 Blood Donation System</h1>
            </Link>
          </div>
          <nav className="nav">
            <ul>
              <li>
                <Link 
                  to="/" 
                  className={location.pathname === '/' ? 'active' : ''}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/donors" 
                  className={location.pathname === '/donors' ? 'active' : ''}
                >
                  Donors
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className={location.pathname === '/register' ? 'active' : ''}
                >
                  Register
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={location.pathname === '/about' ? 'active' : ''}
                >
                  About
                </Link>
              
  <Link 
    to="/emergency" 
    className={location.pathname === '/emergency' ? 'active' : ''}
  >
     Emergency
  </Link>
</li>
              <li>
                <Link 
                  to="/contact" 
                  className={location.pathname === '/contact' ? 'active' : ''}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;