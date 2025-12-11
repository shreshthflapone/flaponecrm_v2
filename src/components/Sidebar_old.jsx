import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, CircleAlert, Bell, Settings, X, Map  } from 'lucide-react';
import './Sidebar.css';
import Logo from "../assets/logo.png";
const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Visitors', path: '/users' },
    { icon: CircleAlert, label: 'Issues', path: '/queries' },
    { icon: Bell, label: 'Alerts', path: '/notification' },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} style={{ textDecoration: 'none' }} />}
      
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-close">
          <div className="brands">
            <div className="sidebar-brand-logo">
              <img src={Logo} />
            </div>
          </div>
          <button onClick={onClose} className="close-button">
            <X className="close-icon" />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'nav-item-active' : ''}`
                }
                onClick={onClose}
              >
                <Icon className={`nav-icon`} />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="footer-text">© 2025 Simhastha Tech Hackathon</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
