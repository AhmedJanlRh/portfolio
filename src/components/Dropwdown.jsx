import React, { useState } from "react";
import "../styles/Dropdown.css";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({ symbol }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    console.log(`Selected item: ${item}`);
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
        <div className={`dropdown-container ${isOpen ? "open" : ""}`}>
          <button className="dropdown-button" onClick={toggleDropdown}>
            <FaChevronDown
              className={`chevron-icon ${isOpen ? "rotate" : ""}`}
              size={30}
              style={{ marginRight: "10px", marginTop: "10px" }}
            />
          </button>
          <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
            <NavLink
              to="/about"
              style={{ textDecoration: "none" }}
              onClick={() => handleItemClick("About")}
            >
              <h1 className="dropdown-item">About</h1>
            </NavLink>
            <NavLink
              to="/contact"
              style={{ textDecoration: "none" }}
              onClick={() => handleItemClick("Contact")}
            >
              <h1 className="dropdown-item">Contact</h1>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
