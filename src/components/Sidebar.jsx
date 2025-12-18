// Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, Home, CircleUser, Users, CircleAlert, Hotel, HatGlasses } from 'lucide-react';
import { FaUsers } from "react-icons/fa6";
import './Sidebar.css';
import Logo from "../assets/logo.png";

const menuStructure = [
  {
    mainHeading: 'MAIN',
    sections: [
      {
        heading: 'Dashboard',
        path: '/',
        items: [],
        icon: Home,
      },
      {
        heading: 'Hotel Management',
        icon: Hotel,
        items: [
          { icon: Users, label: 'Hotel Listing', path: '/customers' },
          { icon: CircleAlert, label: 'Add New Hotel', path: '/add-hotel' },
          { icon: Users, label: 'Hotel Categories', path: '/hotel-categories' },
          { icon: CircleAlert, label: 'Hotel Brands', path: '/hotel-brands' },
          { icon: Users, label: 'Cities', path: '/locations-list' },
          { icon: CircleAlert, label: 'Hotel Activities', path: '/activities-list' },
        ],
      },
      {
        heading: 'Distributors',
        icon: HatGlasses,
        items: [
          { icon: CircleUser, label: 'Distributors List', path: '/distributor-list' },
          { icon: Users, label: 'Add Distributor', path: '/distributor-form' },
        ],
      },
      {
        heading: 'Agents',
        icon: HatGlasses,
        items: [
          { icon: CircleUser, label: 'Manage Agent', path: '/agent-list' },
          { icon: Users, label: 'Add Agent', path: '/agent-form' },
        ],
      },
      {
        heading: 'Teams',
        path: '/my-team',
        items: [],
        icon: Users,
      },
    ]
  },
  {
    mainHeading: 'SETTINGS',
    sections: [
      {
        heading: 'My Account',
        path: '/my-account',
        items: [],
        icon: CircleUser,
      },
    ]
  }
];

const Sidebar = ({ isOpen, onClose }) => {
    const [openSection, setOpenSection] = useState(null);
    const location = useLocation();

    const toggleSection = (sectionKey) => {
        setOpenSection(prev => (prev === sectionKey ? null : sectionKey));
    };

    const isPathActive = (path) => {
        if (!path) return false;
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    useEffect(() => {
        menuStructure.forEach((block, i) => {
            block.sections.forEach((section, j) => {
                if (section.items && section.items.length > 0) {
                    section.items.forEach(item => {
                        if (item.path === location.pathname) {
                            setOpenSection(`${i}-${j}`);
                        }
                    });
                }
            });
        });
    }, [location.pathname]);

  return (
    <>
        {isOpen && <div className="sidebar-overlay" onClick={onClose} style={{ textDecoration: 'none' }} />}
        <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
            <nav className="sidebar-nav">
                {menuStructure.map((block, i) => (
                    <div className="mb16" key={i}>
                        <div className="sidebar-main-heading">{block.mainHeading}</div>
                        {block.sections.map((section, j) => {
                            const sectionKey = `${i}-${j}`;
                            const hasSubItems = section.items && section.items.length > 0;
                            const isParentActive = hasSubItems
                            ? section.items.some(item => isPathActive(item.path))
                            : isPathActive(section.path);

                            return (
                            <div key={j} className="menu-section">
                                {hasSubItems ? (
                                <>
                                    <div
                                    className={`menu-heading ${isParentActive ? 'heading-active' : ''}`}
                                    onClick={() => toggleSection(sectionKey)}
                                    >
                                    <div>
                                        {section.icon && typeof section.icon !== 'string' && (
                                            <section.icon className="icon-16 mr4" />
                                        )}
                                        <span className="menu-heading-label">{section.heading}</span>
                                    </div>
                                    <span className="chevron">
                                        {openSection === sectionKey ? <ChevronUp className='icon-16' /> : <ChevronDown className="icon-16"/>}
                                    </span>
                                    </div>

                                    {openSection === sectionKey && (
                                    <div className="submenu">
                                        {section.items.map((item, subIndex) => {
                                        const Icon = item.icon;
                                        return (
                                            <NavLink
                                            key={subIndex}
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `nav-item ${isActive ? 'nav-item-active' : ''}`
                                            }
                                            onClick={onClose}
                                            >
                                            {Icon && <Icon className="nav-icon" />}
                                            <span className="nav-label">{item.label}</span>
                                            </NavLink>
                                        );
                                        })}
                                    </div>
                                    )}
                                </>
                                ) : (
                                <NavLink
                                    to={section.path || '#'}
                                    className={({ isActive }) =>
                                    `menu-heading nav-item ${isActive ? 'nav-item-active' : ''}`
                                    }
                                    onClick={onClose}
                                >
                                    {section.icon && typeof section.icon !== 'string' && (
                                    <section.icon className="icon-16 mr4" />
                                    )}
                                    <span className="nav-label">{section.heading}</span>
                                </NavLink>
                                )}
                            </div>
                            );
                        })}
                    </div>
                ))}
            </nav>
        </aside>
    </>
  );
};

export default Sidebar;