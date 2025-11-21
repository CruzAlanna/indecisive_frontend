import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './styles/Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-logo">
          <h1>Indecis<span>¿</span>ve</h1>
        </div>
        
        <nav className={`header-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/partners">Couples Quiz</Link>
          <Link to="/random">Random</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/restaurants">Restaurants</Link>
        </nav>
        
        <div className="header-mobile-menu" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </header>
  );
};

export default Header;