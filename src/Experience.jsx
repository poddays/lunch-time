import { useState, useEffect,useRef } from "react";
import { Canvas, useLoader, useFrame, events } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useDrag } from "react-use-gesture";
import Carousel from "react-elastic-carousel";
import {
  PresentationControls,
  Float,
  Environment,
  useTexture,
  useGLTF,
  OrbitControls,
  TransformControls,
  Scroll,
  ScrollControls,
  PivotControls,
  useHelper,
} from "@react-three/drei";

import Model from "./Model";
import * as THREE from "three";

export default function Experience() {
  const models = [
    { name: "chickenLunch" },
    { name: "pastaLunch" },
    { name: "chickenLunch" },
  ];

  const modelRef = useRef();
  const zoomArea = useRef()
  const scrollRef = useRef()

  const [currentPosition, setCurrentPosition] = useState(0);
  const [zPos, setZpos] = useState(0.2); 
  const [firstPosition, setFirstPosition] = useState(-0.2);
 
  useFrame((state, delta) => {
    setCurrentPosition(-scrollRef.current.position.x) 
  });
  return (
    <>
    
      <mesh
        position-y={0.5}
        scale={[window.innerWidth, 2.4, 0]}
        castShadow
        receiveShadow
       
      >
        <planeGeometry />

        <meshBasicMaterial color="#FFD97D" />
      </mesh>
      <ScrollControls  horizontal pages={3} infinite={false} maxSpeed={0.8} damping={0.5}>
        <Scroll ref={scrollRef}>
        {models.map((model, index) => {
          let xPos 
            xPos = (index * 2.3) + currentPosition* 0.2;
          if (index === 0) {
            xPos = currentPosition * 0.2
           
          }
        
          return <Model key={index} name={model.name} positionX={xPos} currentPosition={currentPosition} />;
        })}
       
        </Scroll>
      </ScrollControls>


      <Environment preset="city" />
        <directionalLight intensity={0.3} position-z={2} />
    </>
  );
}
