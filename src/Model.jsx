import { useState,useRef,useEffect} from "react";
import {
  useGLTF,
  Environment,
  useTexture,
  Float,
  Html,
  PresentationControls,
  Bounds,
} from "@react-three/drei";
import { events, useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from '@react-spring/three'
import * as THREE from "three";



export default function Model(props) {
 let { name, positionX, currentPosition} = props;
  const { nodes } = useGLTF(`./assets/models/${name}.glb`);
  const model = nodes.baked;
  const modelRef = useRef();
  const transparentPlastic = new THREE.MeshPhysicalMaterial({
    roughness: 0,
    transmission: 0.98,
    thickness: 0.01,
  });
 /*  const [positionZ, setPositionZ] = useState(0); */
 
  const [active, setActive] = useState(0);
  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

   const scale = spring.to([2, 1], [1, 5]);
   const positionZ = spring.to([1.2], [1.8])
  return (
    <>
      <Float 
        rotationIntensity={0.5} 
        onPointerEnter = {()=>{document.body.style.cursor = 'pointer'}}
        onPointerLeave = {()=>{document.body.style.cursor = 'default'}}  
       
      >
        
        {model.children.map((child) => (
          <mesh 
            castShadow
            ref={modelRef}
            key={child.uuid}
            position-x ={positionX}  
            rotation-x={Math.PI / 2}
            position-y={0.3}
            position-z = { Math.round(positionX)-Math.round(currentPosition) == 0? 1.5: 1.1}
            geometry={child.geometry}
            material={
              child.material.name != "transparentPlastic"
                ? child.material
                : transparentPlastic
            }
          />
        ))}
     
      </Float>
      
    </>
  );
}
