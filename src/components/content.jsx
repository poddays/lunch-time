import { Canvas } from "@react-three/fiber";
import Experience from "../Experience.jsx";

import React, { useState } from "react";
import { Suspense } from "react";
import { useScroll, animated } from '@react-spring/web'
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
        <Suspense fallback={null}>
            <Experience />
        </Suspense>
      </Canvas>
    </>
  );
}
