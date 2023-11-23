import React from "react";
import styles from "../styles/Header.module.css";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropwdown";
const Header = () => {
  const headerHeading = styles.headerHeading;
  let symbolFontSize;
  if (window.innerWidth < 600) {
    symbolFontSize = "30px";
  } else {
    symbolFontSize = "50px";
  }

  const symbol = () => {
    return (
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <h1
          className={headerHeading}
          style={{ fontSize: symbolFontSize, fontFamily: "Allura" }}
        >
          AJ
        </h1>
      </NavLink>
    );
  };

  const normalHeader = () => {
    return (
      <div className={styles.container}>
        {symbol()}
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
    );
  };

  if (window.innerWidth < 600) {
    return <Dropdown symbol={symbol} />;
  } else {
    return normalHeader();
  }
};

export default Header;
