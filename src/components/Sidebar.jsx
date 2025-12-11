import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronUp, Home, CircleUser, Users, CircleAlert, Bell, X } from 'lucide-react';
import './Sidebar.css';
import Logo from "../assets/logo.png";

const Sidebar = ({ isOpen, onClose }) => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const menuStructure = [
        {
            mainHeading: 'MAIN',
            sections: [
            {
                heading: 'Dashboards',
                items: [
                { icon: Home, label: 'Dashboard', path: '/' },
                ],
            },
            {
                heading: 'Pages',
                path: '/pages',
                items: []
            },
            {
                heading: 'CRM',
                items: [
                { icon: Users, label: 'Customers', path: '/customers' },
                { icon: CircleAlert, label: 'Issues', path: '/issues' },
                ],
            },
            ]
        },
        {
            mainHeading: 'SETTINGS',
            sections: [
                {
                    heading: 'Profile',
                    items: [
                        { icon: CircleUser, label: 'My Account', path: '/my-account' },
                        { icon: Users, label: 'My Team', path: '/my-team' },
                    ],
                },
                {
                    heading: 'Distributors',
                    items: [
                        { icon: CircleUser, label: 'Distributors List', path: '/distributor-list' },
                        { icon: Users, label: 'Add Distributor', path: '/distributor-form' },
                    ],
                },
            ]
        }
    ];



  return (
    <>
        {isOpen && <div className="sidebar-overlay" onClick={onClose} style={{ textDecoration: 'none' }} />}
        <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
            <nav className="sidebar-nav">
                {menuStructure.map((block, i) => (
                    <div key={i}>
                        <div className="sidebar-main-heading">{block.mainHeading}</div>
                        {block.sections.map((section, j) => (
                            <div key={j} className="menu-section">
                                {section.items && section.items.length > 0 ? (
                                    <>
                                        <div className="menu-heading" onClick={() => toggleSection(`${i}-${j}`)}>
                                        <span>{section.heading}</span>
                                        {openSection === `${i}-${j}` ? <ChevronUp /> : <ChevronDown />}
                                        </div>

                                        {openSection === `${i}-${j}` && (
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
                                                <Icon className="nav-icon" />
                                                <span className="nav-label">{item.label}</span>
                                                </NavLink>
                                            );
                                            })}
                                        </div>
                                        )}
                                    </>
                                ) : (
                                    <NavLink
                                        to={section.path}
                                        className={({ isActive }) =>
                                        `menu-heading nav-item ${isActive ? 'nav-item-active' : ''}`
                                        }
                                        onClick={onClose}
                                    >
                                        <span>{section.heading}</span>
                                    </NavLink>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </nav>
        </aside>
    </>
  );
};

export default Sidebar;