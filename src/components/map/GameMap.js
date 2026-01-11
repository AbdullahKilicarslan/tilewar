import React, { useMemo, useState, useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { useTexture } from '@react-three/drei'
import { Sky, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

import { useGameContext } from '../../contexts/GameContext';


/* HUD Imports */
import { HudContainer } from './hud/HudContainer';


/* */
import Hexagon from './subComponents/Hexagon';




export default function GameMap() {

  const { mapData } = useGameContext();

  const center = useMemo(() => {
    if (!mapData || mapData.length === 0) return [0, 0, 0];

    const xs = mapData.map(c => c.position[0]);
    const zs = mapData.map(c => c.position[2]);

    const centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
    const centerZ = (Math.min(...zs) + Math.max(...zs)) / 2;

    return [centerX, 0, centerZ];
  }, [mapData]);


  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* HUD Bileşeni */}
      <HudContainer></HudContainer>
      <Canvas shadows
        camera={{ position: [10, 10, 40], fov: 60, far: 1000 }}
        raycaster={{ params: { Line: { threshold: 0.15 } } }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[20, 50, 20]} intensity={1} castShadow shadow-mapSize={[2048, 2048]} />
        <Sky sunPosition={[-100, 10, -100]} distance={450000} inclination={0.6} azimuth={0.1} />

        {mapData && mapData.map((cell) => (
          <Hexagon key={cell.id} hexKey={cell.id} type={cell.type} position={cell.position} texturePath={cell.tex} height={cell.height} color={cell.color} emissiveIntensity={cell.emissiveIntensity} />
        ))}

        <OrbitControls target={center} makeDefault enablePan={false} maxPolarAngle={Math.PI / 2.1} maxDistance={50} minDistance={5} />
      </Canvas>


    </div>
  )
}