'use client'

// Loads the skybox texture and applies it to the scene.

import { useThree } from "@react-three/fiber";
import { useCubeTexture } from "@react-three/drei";


export default function SkyBox() {
    const { scene } = useThree();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    const texture = useCubeTexture([
      "Daylight Box_Right.jpg",
      "Daylight Box_Left.jpg",
      "Daylight Box_Top.jpg",
      "Daylight Box_Bottom.jpg",
      "Daylight Box_Front.jpg",
      "Daylight Box_Back.jpg"
    ], { path: "assets/textures/skybox/" });
  
    // Set the scene background property to the resulting texture.
    scene.background = texture;
    return null;
  }