import { useState, useRef, useEffect } from "react";
import {
  useGLTF,
  Float,
  useCursor,
  OrbitControls,
  Stats,
} from "@react-three/drei";
import { events, useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import * as THREE from "three";

export default function Model(props) {
  let { name, positionX, currentPosition } = props;
  const { nodes } = useGLTF(`./assets/models/${name}.glb`);
  const model = nodes.baked;
  const modelRef = useRef();
  const groupRef = useRef();
  const transparentPlastic = new THREE.MeshPhysicalMaterial({
    roughness: 0,
    transmission: 0.98,
    thickness: 0.01,
  
  });

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(false);

  const { scale } = useSpring({ scale: active ? 1.1 : 1 });
  const { position } = useSpring({
    position: selected ? [-1.2, 0, 3] : [positionX, 0.3, 1.2],
  });
  const { rotation } = useSpring({
    rotation: selected ? [Math.PI / 2 - 0.2, 0, -0.5] : [Math.PI / 2, 0, 0],
  });


  useFrame(() => {
    if (
      currentPosition - modelRef.current.position.x >= 0 &&
      currentPosition - modelRef.current.position.x <= 2.3
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <Stats />
      <mesh
        onPointerOver={() => setHover(true) } onPointerOut={() => setHover(false)}
        
      />
    
      {model.children.map((child) => (
        <animated.mesh
          castShadow
          key={child.uuid}
          ref={modelRef}
          scale={scale}
          onPointerOver={(event) => setHover(true)}
          onPointerOut={(event) => setHover(false)}
          onClick={(event) => setSelected(!selected)}
          position={position}
          rotation={rotation}
          geometry={child.geometry}
          material={
            child.material.name != "transparentPlastic"
              ? child.material
              : transparentPlastic
          }
        />
       
      ))}
       
    </>
  );
}
