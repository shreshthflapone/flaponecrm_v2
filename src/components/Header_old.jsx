import React, { useState, useRef, useEffect } from 'react';
import { Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from "../assets/logo.png";

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userName, setUserName] = useState("");

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleClickOutside = e => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const loginData = localStorage.getItem("imcloginDetails");
    if (loginData) {
      try {
        const parsedData = JSON.parse(loginData);
        if (parsedData.name) {
          setUserName(parsedData.name);
        }
      } catch (e) {
        console.error("Invalid JSON in localStorage:", e);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("imcloginDetails");
    navigate(`/login`);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button
          onClick={onToggleSidebar}
          className="menu-button"
          aria-label="Toggle sidebar"
        >
          <Menu className="menu-icon" />
        </button>
        <div className="brands">
          <div className="brand-logo">
            <img src={Logo} />
          </div>
        </div>
      </div>

      <div className="header-right" ref={dropdownRef}>
        <button className="user-button" onClick={handleDropdownToggle}>
          <div className="user-avatar">
            <User className="user-icon" />
          </div>
          <span className="user-name">{userName || "Guest"}</span>
        </button>

        {isDropdownOpen && (
          <div className="dropdown">
            <button onClick={handleLogout} className="dropdown-item">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
