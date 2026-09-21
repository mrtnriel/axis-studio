import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { Keyboard3D } from './Keyboard3D';
import { useCustomizer } from '../../context/CustomizerContext';
import type { CameraPreset } from '../../context/CustomizerContext';

interface CameraControllerProps {
  preset: CameraPreset;
  isExploded: boolean;
}

// Camera controller that dynamically frames the keyboard to fill ~82-85% of the viewport stage
const CameraController: React.FC<CameraControllerProps> = ({ preset, isExploded }) => {
  const { camera, size } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const isInteracting = useRef(false);
  const isTransitioning = useRef(true);

  const { config, resetCameraTrigger } = useCustomizer();

  // Responsive stage aspect ratio (width / height)
  const aspect = Math.max(0.35, size.width / Math.max(1, size.height));

  // Base framing distance solver that ensures the keyboard occupies ~85% of width with ample height
  const baseDist = Math.max(21, 33 / aspect);

  const getCameraTarget = (): { position: [number, number, number]; lookAt: [number, number, number] } => {
    if (isExploded || preset === 'exploded') {
      const expDist = Math.max(25, 37 / aspect);
      return {
        position: [expDist * 0.36, expDist * 0.48, expDist * 0.78],
        lookAt: [0, 0.8, 0],
      };
    }

    switch (preset) {
      case 'top': {
        // Direct overhead architectural look
        return {
          position: [0, baseDist * 0.95, 0.01],
          lookAt: [0, 0, 0],
        };
      }
      case 'side': {
        // Ergonomic 7.5° profile view
        return {
          position: [baseDist * 0.85, 2.8, 0],
          lookAt: [0, 0.2, 0],
        };
      }
      case 'front': {
        // Front bezel view
        return {
          position: [0, baseDist * 0.32, baseDist * 0.92],
          lookAt: [0, 0.2, 0],
        };
      }
      case 'iso':
      default: {
        // Bespoke isometric showcase angle (azimuth 27°, elevation 32°)
        return {
          position: [0.38 * baseDist, 0.54 * baseDist, 0.75 * baseDist],
          lookAt: [0, 0.1, 0],
        };
      }
    }
  };

  const { position: targetPos, lookAt: targetLookAt } = getCameraTarget();
  const [posX, posY, posZ] = targetPos;
  const [lookX, lookY, lookZ] = targetLookAt;
  const targetPosVec = useMemo(() => new THREE.Vector3(posX, posY, posZ), [posX, posY, posZ]);
  const targetLookAtVec = useMemo(() => new THREE.Vector3(lookX, lookY, lookZ), [lookX, lookY, lookZ]);

  // Trigger transition when preset, exploded mode, layout, aspect, or reset trigger changes
  useEffect(() => {
    isTransitioning.current = true;
  }, [preset, isExploded, config.layout, aspect, resetCameraTrigger]);

  // Listen to OrbitControls user interaction start/end
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const onStart = () => {
      isInteracting.current = true;
      isTransitioning.current = false;
    };
    const onEnd = () => {
      isInteracting.current = false;
    };

    controls.addEventListener('start', onStart);
    controls.addEventListener('end', onEnd);

    return () => {
      controls.removeEventListener('start', onStart);
      controls.removeEventListener('end', onEnd);
    };
  }, []);

  useFrame((_, delta) => {
    if (!isTransitioning.current || isInteracting.current) {
      return;
    }

    const controls = controlsRef.current;
    const step = Math.min(1, delta * 5.0);

    camera.position.lerp(targetPosVec, step);
    if (controls) {
      controls.target.lerp(targetLookAtVec, step);
      controls.update();
    }

    if (camera.position.distanceTo(targetPosVec) < 0.04) {
      camera.position.copy(targetPosVec);
      if (controls) {
        controls.target.copy(targetLookAtVec);
        controls.update();
      }
      isTransitioning.current = false;
    }
  });

  return (
    <OrbitControls 
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      minDistance={3.5}
      maxDistance={45}
      maxPolarAngle={Math.PI / 2 + 0.05}
      dampingFactor={0.06}
      enableDamping={true}
    />
  );
};

export const KeyboardScene: React.FC = () => {
  const { cameraPreset, isExploded } = useCustomizer();

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [9.5, 13.5, 18.8], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      >
        <color attach="background" args={['#08090d']} />

        {/* Studio Ambient Base */}
        <ambientLight intensity={0.75} />

        {/* Main Studio Key Light */}
        <directionalLight
          position={[7, 12, 9]}
          intensity={2.4}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />

        {/* Cool Rim / Edge Highlight */}
        <directionalLight
          position={[-9, 7, -7]}
          intensity={1.2}
          color="#93c5fd"
        />

        {/* Warm Fill Light */}
        <directionalLight
          position={[0, -5, 7]}
          intensity={0.45}
          color="#fde68a"
        />

        {/* Ground Soft Contact Shadow */}
        <ContactShadows
          position={[0, isExploded ? -3.0 : -0.52, 0]}
          opacity={0.82}
          scale={34}
          blur={2.4}
          far={10}
          resolution={1024}
          color="#000000"
        />

        {/* 3D Keyboard Model */}
        <Keyboard3D />

        {/* Camera Preset & Dynamic Responsive Frame Controller */}
        <CameraController preset={cameraPreset} isExploded={isExploded} />
      </Canvas>
    </div>
  );
};
