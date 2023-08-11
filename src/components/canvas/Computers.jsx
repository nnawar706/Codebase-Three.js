import { React, Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Computers = () => {
  
  const computer = useGLTF("./desktop_pc/scene.glb");
  
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <primitive object={computer.scene}/>
    </mesh>
  )
}

const ComputerCanvas = () => {
  return (
    <Canvas frameloop="demand" shadows 
    camera={{ position: [20, 3, 5], fov: 25 }}
    gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader/>}></Suspense>
    </Canvas>
  )
}

export default Computers