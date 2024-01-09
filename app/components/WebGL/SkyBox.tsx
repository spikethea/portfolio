'use client'

// Loads the skybox texture and applies it to the scene.

import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";


export default function SkyBox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    const texture = loader.load([
      "assets/textures/skybox/Daylight Box_Right.jpg",
      "assets/textures/skybox/Daylight Box_Left.jpg",
      "assets/textures/skybox/Daylight Box_Top.jpg",
      "assets/textures/skybox/Daylight Box_Bottom.jpg",
      "assets/textures/skybox/Daylight Box_Front.jpg",
      "assets/textures/skybox/Daylight Box_Back.jpg"
    ]);
  
    // Set the scene background property to the resulting texture.
    scene.background = texture;
    return null;
  }