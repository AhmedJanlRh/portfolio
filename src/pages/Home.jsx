import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import Hologram from "../Models/Hologram";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import model from "../Models/untitled.glb";
import ParticleEffect from "../components/ParticleEffect";
import { useMediaQuery } from "react-responsive";

const spans = [
  "Greetings!",
  "I'm Ahmed Jan, a Full Stack MERN developer.",
  "I build dynamic web applications to bring your ideas to life.",
  "Let's collaborate",
  "for a user-friendly and efficient experience.",
];

const Home = () => {
  const [currentSpanIndex, setCurrentSpanIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // setIsRotating(true);
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAnimationComplete = () => {
    setCurrentSpanIndex((prevIndex) => (prevIndex + 1) % spans.length);
  };
  const isMobile = window.innerWidth < 600;
  const textDisplay = () => {
    return (
      <div className={styles.textContainer}>
        <h1 style={{ color: "white" }}>
          <motion.div
            key={currentSpanIndex}
            initial={{
              opacity: 0,
              x: isMobile ? 0 : 20,
              y: isMobile ? 20 : 0,
            }}
            animate={{ opacity: 0.9, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              x: isMobile ? 0 : 20,
              y: isMobile ? 20 : 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.5,
            }}
            onAnimationComplete={handleAnimationComplete}
          >
            {spans[currentSpanIndex]}
          </motion.div>
        </h1>
      </div>
    );
  };

  const canvasDiv = () => {
    return (
      <motion.div
        className={styles.canvasContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Canvas
          camera={{ near: 0.1, far: 1000 }}
          className={`${isRotating ? styles.Hologram : styles.Holograb} `}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight intensity={0.8} position={[1, 1, 1]} />
            <ambientLight intensity={0.5} />
            <spotLight
              intensity={0.8}
              position={[0, 5, 0]}
              angle={Math.PI / 4}
            />
            <pointLight intensity={23} position={[0, 0, 5]} />
            <hemisphereLight intensity={0.6} color="#fff" />
            <Hologram modelPath={model} />
          </Suspense>
        </Canvas>
      </motion.div>
    );
  };

  const sreen = () => {
    if (window.innerWidth < 600) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Header />
      <div className={styles.gridContainer}>
        {sreen() ? (
          <>
            {textDisplay()}
            {canvasDiv()}
          </>
        ) : (
          <>
            {canvasDiv()}
            {textDisplay()}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
