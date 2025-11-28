import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Header from './components/common/Header';
import Home from './pages/Home/Home';
import DonorDashboard from './pages/Donor/DonorDashboard/DonorDashboard';
import Register from './pages/Register/Register';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Emergency from './pages/Emergency/Emergency';
import './styles/globals.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/donors" element={<DonorDashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/emergency" element={<Emergency />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;