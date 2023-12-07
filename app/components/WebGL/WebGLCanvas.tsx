'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, RootState, ThreeElements, useFrame, useLoader, useThree } from '@react-three/fiber'
import SkyBox from './SkyBox'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import * as THREE from "three";
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
        meshRef.current.rotation.x += delta
    }
})
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


function Plane (props: any) {
  return (
    <mesh
    {...props}
    scale={[200, 200, 200]}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, -4, 0]}
    receiveShadow
    >
      <planeGeometry/>
      <meshLambertMaterial/>
    </mesh>
  )
}

function PalmTree (props: any) {

  const gltf = useLoader(GLTFLoader, 'assets/palm_tree.glb');
  const ref = useRef(null as any)
  
  useEffect(() => {
    ref.current.children[0].material.transparent = true;
    ref.current.children[0].castShadow = true;
    ref.current.children[0].receiveShadow = true;
    ref.current.children[0].needsUpdate = true;
    console.log(ref.current);
  }, [])

  return (
    <primitive
      ref={ref}
      {...props}
      object={gltf.scene}
    />
  )
}

function Camera() {

  const { camera } = useThree();
  const rotationFactor = 0.002

  useFrame((state, delta) => {
      if (window.scrollY*rotationFactor < Math.PI/4) {
        camera.rotation.x =  window.scrollY*rotationFactor;
      } else {
        camera.rotation.x = Math.PI/4;
      }
      
      camera.position.lerp(new THREE.Vector3(0, 4 - window.scrollY* 0.01, 10), 0.02)
  });

  return (
    <perspectiveCamera ></perspectiveCamera>
  )
}

export default function WebGLCanvas () {

  const [ vrControllers, setVrControllers ] = useState(null);
  const [XRButton, setXRButton] = useState<HTMLElement>();

  const onCanvasCreated = (data: RootState) => {
    console.log(data);
    const gl = data.gl;
    const scene = data.scene;

    document.body.appendChild(VRButton.createButton(gl));
    
    // For Future AR Scene
        
    // if (window.innerWidth > 820) {
    //   setXRButton(VRButton.createButton(gl))
    // } else {
    //   setXRButton(ARButton.createButton(gl))
    // }

    // document.body.appendChild(XRButton);
  };

  useEffect(() => {
    return () => {
      XRButton?.remove();
    }
  }, [])

    return (
        <Canvas
        style={{flex: '1'}}
        onCreated={onCanvasCreated}
        >
            <Camera/>
            <SkyBox/>
            <ambientLight />
            <directionalLight
             color={0xFFE8B7}
              position={[-100, 10, 10]}
              castShadow // highlight-line
              shadow-mapSize-height={512}
              shadow-mapSize-width={512}
            />
            <Plane/>
            <PalmTree position={[20, -4, 0]} />
        </Canvas>
    )
}
