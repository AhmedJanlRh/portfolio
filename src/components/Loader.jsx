import React from "react";
import { Html } from "@react-three/drei";

const Loader = () => {
  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "8px",
    color: "#333",
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "16px",
  };

  return (
    <Html>
      <div style={loaderStyle}>Loading...</div>
    </Html>
  );
};

export default Loader;
