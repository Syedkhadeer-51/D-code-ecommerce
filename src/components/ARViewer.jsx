import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import ProductMesh from '../scene/ProductMesh';

function ARStarter({ start, sessionInit, onStarted, onError }) {
  const { gl } = useThree();
  useEffect(() => {
    if (!start) return;
    if (!('xr' in navigator)) {
      onError && onError(new Error('WebXR not supported on this device/browser'));
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        gl.xr.enabled = true;
        const session = await navigator.xr.requestSession('immersive-ar', sessionInit || {});
        if (cancelled) return;
        await gl.xr.setSession(session);
        onStarted && onStarted(session);
      } catch (e) {
        onError && onError(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [start, sessionInit, gl, onStarted, onError]);
  return null;
}

export default function ARViewer({ modelUrl, position = [0, 0, 0], rotation = [0, 0, 0], fov = 60, onClose }) {
  const [startAR, setStartAR] = React.useState(false);
  const sessionInit = { requiredFeatures: ['hit-test', 'dom-overlay'], domOverlay: { root: document.body } };
  return (
    <div className="fixed inset-0 z-50 bg-black/95">
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-3">
        <button onClick={() => setStartAR(true)} className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold">Start AR</button>
        <button onClick={onClose} className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold">Close</button>
      </div>
      <div className="absolute inset-0">
        <Canvas camera={{ fov }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} />
          <ProductMesh modelUrl={modelUrl} position={position} rotation={rotation} />
          <ARStarter 
            start={startAR}
            sessionInit={sessionInit}
            onStarted={() => {}}
            onError={() => {}}
          />
        </Canvas>
      </div>
    </div>
  );
}


