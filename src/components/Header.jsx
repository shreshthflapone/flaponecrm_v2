import React, { useState, useRef, useEffect } from 'react';
import { Menu, User, Users, Search, UserPlus, UserRound, ReceiptText, FileBadge } from 'lucide-react';
import { IoMdMenu } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from "../assets/logo.png";
import MobileLogo from "../assets/mobile-logo.png";

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSignupDropdown, setShowSignupDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const signupRef = useRef(null);

  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleSignupDropdown = () => setShowSignupDropdown(!showSignupDropdown);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }

    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowSearch(false);
    }

    if (signupRef.current && !signupRef.current.contains(e.target)) {
      setShowSignupDropdown(false);
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

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCreateUser = (type) => {
    alert("Create user type: " + type);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-button hamburger-icon"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          <IoMdMenu className="menu-icon" />
        </button>

        <div className="brands">
          <div className="brand-logo">
            <img src={Logo} alt="Logo" className='logo' />
          </div>
          <div className="mobile-logo">
            <img src={MobileLogo} alt="Logo" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="header-right">

        {/* Search */}
        <div className="search-box" ref={searchRef}>
          {showSearch && (
            <div className="placeholderstyle">
              <input
                type="text"
                placeholder="Name, Co.name, Email, Mobile"
                value={searchValue}
                onChange={handleSearchChange}
                className="pr p8 brd1 outn br4 pl12 fs14 slide-inc search-header pr32"
              />
            </div>
          )}
          {!showSearch ? (
            <Search className="icon-18 cp" onClick={toggleSearch} />
          ) : (
            <Search className="icon-18 cp search-icon-manage" onClick={toggleSearch} />
          )}
        </div>

        {/* Signup Dropdown */}
        <div className="signup-box" ref={signupRef}>
          <UserPlus className="icon-18 cp" onClick={toggleSignupDropdown} />

          {showSignupDropdown && (
            <div className="sdropdown">
              <div className="sdropdown-option" onClick={() => handleCreateUser("referral")}>Referral</div>
              <div className="sdropdown-option" onClick={() => handleCreateUser("walk-in")}>Walk-in</div>
              <div className="sdropdown-option" onClick={() => handleCreateUser("pns-call")}>PNS Call</div>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="profile-section" ref={dropdownRef}>
          <button className="user-button" onClick={handleDropdownToggle}>
            <div className="user-avatar">
              <User className="user-icon" />
            </div>
            <span className="user-name fs14">{userName || "Guest"}</span>
          </button>

          {isDropdownOpen && (
            <div className="dropdown">
              <div className="profie-name-email">
                <ul>
                  <li className="fs14">Shreshth Gahlot</li>
                  <li className="fs14 mt4 fc5 ls1">shreshth@flapone.com</li>
                </ul>
              </div>
              <button onClick={handleLogout} className="dropdown-item">
                <UserRound className='icon-16' style={{ marginRight: "6px" }} />
                My Account
              </button>
              <button onClick={handleLogout} className="dropdown-item">
                <Users className='icon-16' style={{ marginRight: "6px" }} />
                My Team
              </button>
              <button onClick={handleLogout} className="dropdown-item">
                <ReceiptText className='icon-16' style={{ marginRight: "6px" }} />
                Term & Conditions
              </button>
              <button onClick={handleLogout} className="dropdown-item">
                <FileBadge className="icon-16" style={{ marginRight: "6px" }} />
                Privacy Policy
              </button>
              <button onClick={handleLogout} className="dropdown-item brd-t2 br0">
                <MdLogout className="icon-16" style={{ marginRight: "6px" }} />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;