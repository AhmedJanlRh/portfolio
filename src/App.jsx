import React, { useCallback, useEffect, useState, useRef } from "react";
// import Particles from "react-tsparticles";
import styles from "./styles/App.module.css";
// import { loadFull } from "tsparticles";
import { Routes, Route, NavLink } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ParticleEffect from "./components/ParticleEffect";
const App = () => {
  return (
    <>
      <div className={styles.neonOcean} id="particles-container">
        <ParticleEffect />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
