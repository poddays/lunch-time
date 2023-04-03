import { Canvas } from "@react-three/fiber";
import Experience from "../Experience.jsx";

import React, { useState } from "react";

export default function Content() {
  return (
    <>
     <Canvas
      className="products"
      flat
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [0, 0, 8],
      }}
    >
      <Experience />
    </Canvas>
   
    </>
   
  );
}
