import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          Indecis<span>¿</span>ve
        </div>
        
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/partners">Couples Quiz</Link>
          <Link to="/random">Random</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/restaurants">Restaurants</Link>
        </div>
        
        <div className="footer-copyright">
          &copy; {currentYear} Indecisive. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;