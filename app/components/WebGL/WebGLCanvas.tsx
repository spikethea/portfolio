'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import SkyBox from './SkyBox'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "three";
import { VRButton,  XR } from '@react-three/xr'

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
  const rotationFactor = 2;

  useFrame((state, delta) => {
      if ((window.scrollY / window.innerHeight)*rotationFactor < Math.PI/4) {
        camera.rotation.x =  (window.scrollY / window.innerHeight)*rotationFactor;
      } else {
        camera.rotation.x = Math.PI/4;
      }
      
      camera.position.lerp(new THREE.Vector3(0, 4 -( window.scrollY / window.innerHeight)* 8, 10), 0.09)
  });

  return (
    <perspectiveCamera ></perspectiveCamera>
  )
}

export default function WebGLCanvas () {

  const [ vrControllers, setVrControllers ] = useState(null);
  const [XRButton, setXRButton] = useState<HTMLElement>();


  useEffect(() => {
    return () => {
      XRButton?.remove();
    }
  }, [])

    return (
      <>
        <VRButton
         onError={(e) => console.error(e)}
         id='VRButton'
        />
        <Canvas
        style={{flex: '1'}}
        >
          <XR>
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
            </XR>
        </Canvas>
      </>
    )
}
