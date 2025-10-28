import React from 'react'

import { useGLTF } from '@react-three/drei';

export default function ProductMesh({ modelUrl, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={1} position={position} rotation={rotation} />;
}
