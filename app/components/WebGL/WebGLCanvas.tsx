'use client'
import '../../globals.scss';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useGraph, useLoader, useThree } from '@react-three/fiber'
import { Html, Loader, useProgress } from '@react-three/drei';
import tunnel from 'tunnel-rat';

import SkyBox from './SkyBox';
import Screen from './Screen';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "three";
import '../../globals.scss';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';


function Floor (props: any) {

  const texture = useLoader(THREE.TextureLoader, 'assets/textures/floor_texture.jpg');
  texture.repeat = new THREE.Vector2(10, 10);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  const ref = useRef(null as any);

  return (
    <mesh
    {...props}
    
    scale={[200, 200, 200]}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, -4, 0]}
    receiveShadow
    castShadow
    >
      <planeGeometry/>
      <meshLambertMaterial 
        map={texture}
        ref={ref}
      />
    </mesh>
  )
}

function Building (props: any) {

  const gltf = useLoader(GLTFLoader, 'assets/barcelona_building.glb');
  const ref = useRef(null as any)

  const clone = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])
  const { nodes } = useGraph(clone);
 
  useEffect(() => {

    gltf.scene.traverse( function( node: any ) {

      if ( node.isMesh ) { 
        node.material.transparent = true;
        node.castShadow = true;
        node.receiveShadow = true;
        node.needsUpdate = true;
      }

  } );
  }, []);

  return (
    <primitive
      ref={ref}
      {...props}
      object={nodes.Scene}
    />
  )
}

function PalmTree (props: any) {

  const gltf = useLoader(GLTFLoader, 'assets/palm_tree.glb');
  const ref = useRef(null as any);

  const clone = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])
  const { nodes } = useGraph(clone);
  
  useEffect(() => {
    ref.current.children[0].material.transparent = true;
    ref.current.children[0].castShadow = true;
    ref.current.children[0].receiveShadow = true;
    ref.current.children[0].needsUpdate = true;
  }, []);

  return (
    <primitive
      ref={ref}
      {...props}
      object={nodes.Scene}
    />
  )
}

function Camera() {

  const { camera } = useThree();
  const lerpVector = new THREE.Vector3(0, 3, 10);
  const rotationFactor = 2;

  lerpVector.y = 3 -( window.scrollY / window.innerHeight)* 8;

  useFrame((state, delta) => {
      if ((window.scrollY / window.innerHeight)*rotationFactor < Math.PI/4) {
        camera.rotation.x =  (window.scrollY / window.innerHeight)*rotationFactor;
      } else {
        camera.rotation.x = Math.PI/4;
      }
      
      camera.position.lerp(lerpVector, 0.09)
  });

  return (
    <perspectiveCamera ></perspectiveCamera>
  )
}

const ui = tunnel();

function SplashScreen({ui}: {ui: any}) {
  
  const { active, progress, errors, item, loaded, total } = useProgress()

  return <ui.In>
    <div className={`splash-screen ${progress === Math.floor(100) ? 'hidden': null}`}>
      <progress id="loading-bar" value={Number(progress)} max={100}></progress>
      <p>{Math.floor(progress)}% loaded</p>
  </div>
  </ui.In>
}

export default function WebGLCanvas ({ui}: {ui: any}) {

  // const [ vrControllers, setVrControllers ] = useState(null);
  // const [XRButton, setXRButton] = useState<HTMLElement>();

  // useEffect(() => {
  //   return () => {
  //     XRButton?.remove();
  //   }
  // }, [])

    return (
      <>
      
        {/* <VRButton
         onError={(e) => console.error(e)}
         id='VRButton'
        /> */}
        <SplashScreen ui={ui}/>
        <Suspense>
        <Canvas
        style={{flex: '1'}}
        shadows={'soft'}
        >
            <Camera/>
            {/* <fogExp2 color={0x2d4861} attach="fog" density={2}/> */}
            {/* <fog attach="fog" args={[0x9cdbff, 10, 250]}/> */}
            <SkyBox/>
            <ambientLight color={0xe3d7ba}/>
            <directionalLight
              intensity={5}
             color={0xFFE8B7}
              position={[10, 10, 10]}
              castShadow // highlight-line
              shadow-mapSize-height={512}
              shadow-mapSize-width={512}
              shadow-camera-near={0.1}
              shadow-camera-far={200}
              shadow-camera-left={-100}
              shadow-camera-right={100}
              shadow-camera-top={100}
              shadow-camera-bottom={-100}
            />
            <Floor/>
            <PalmTree position={[20, -4, 0]} />
            <PalmTree position={[5, -4, 0]} />

            <Building rotation={[0, -Math.PI/2, 0]} position={[-40, -5, -80]} />
            <Building rotation={[0, -Math.PI/2, 0]} position={[0, -5, -80]} />
            <Building rotation={[0, -Math.PI/2, 0]} position={[40, -5, -80]} />

            <Screen position={[-13, -4, -16]} rotation={[0, Math.PI*0.2, 0]}/>
          </Canvas>
        </Suspense>
      </>
    )
}
