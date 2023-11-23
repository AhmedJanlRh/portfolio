import React from "react";
import styles from "../styles/Header.module.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  const headerHeading = styles.headerHeading;
  return (
    <>
      <div className={styles.container}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <h1
            className={headerHeading}
            style={{ fontFamily: "Allura", fontSize: "50px" }}
          >
            A.J
          </h1>
        </NavLink>
        <NavLink
          to="/about"
          style={{ marginLeft: "auto", textDecoration: "none" }}
        >
          <h1 className={headerHeading} style={{ marginLeft: "auto" }}>
            About
          </h1>
        </NavLink>
        <NavLink to="/contact" style={{ textDecoration: "none" }}>
          <h1 className={headerHeading}>Contact</h1>
        </NavLink>
      </div>
    </>
  );
};

export default Header;
