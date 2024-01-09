// Loads the skybox texture and applies it to the scene.
import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { Object3D } from "three";



export default function Screen(props: any) {
    const { nodes } = useLoader(GLTFLoader, 'assets/screen.glb');

    useEffect(() => {

          if ( nodes.Screen ) { 
            nodes.Screen.material.transparent = true;
            nodes.Screen.castShadow = true;
            nodes.Screen.receiveShadow = true;
            nodes.Screen.needsUpdate = true;
          }

      }, []);

    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = 'efl.mp4';
        vid.crossOrigin = "Anonymous";
        vid.playsInline = true;
        vid.loop = true;
        vid.muted = true;
        vid.play();
        console.log(vid)
        return vid;
    });

    return (
    <group {...props}>
        <primitive object={nodes.Screen}/>
        <mesh scale={[4.2, 3, 4.2]} rotation={[0, 0, 0]} position={[0, 12.5, 0.5]}>
        <planeGeometry args={[3.2, 1.9]} />
        <meshStandardMaterial emissive={"white"}>
            <videoTexture attach="map" args={[video]} />
            <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
        </mesh>
    </group>
    );
};