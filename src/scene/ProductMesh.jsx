import React from 'react'

import { useGLTF } from '@react-three/drei';

export default function ProductMesh({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={1} />;
}
