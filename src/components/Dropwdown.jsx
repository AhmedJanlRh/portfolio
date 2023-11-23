import React, { useState } from "react";
import "../styles/Dropdown.css";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({ symbol }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        {symbol()}
        <div>
          <div className={`dropdown-container ${isOpen ? "open" : ""}`}>
            <button className="dropdown-button" onClick={toggleDropdown}>
              <FaChevronDown
                className={`chevron-icon ${isOpen ? "rotate" : ""}`}
                size={30}
              />
            </button>
            <br />
            <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
              <NavLink to="/about" style={{ textDecoration: "none" }}>
                <h1 className="dropdown-item">About</h1>
              </NavLink>
              <NavLink to="/contact" style={{ textDecoration: "none" }}>
                <h1 className="dropdown-item">Contact</h1>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
