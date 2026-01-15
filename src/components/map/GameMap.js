import React, { useMemo, useState, useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky, OrbitControls, Cloud, Stars } from '@react-three/drei'
// 
import { useGameContext } from '../../contexts/GameContext';


/* HUD Imports */
import { HudContainer } from './hud/HudContainer';


/* */
import Hexagon from './subComponents/Hexagon';
import Unit from './subComponents/Unit';


export default function GameMap() {

  const { mapData, unitData } = useGameContext();

  const [unitDataLocal, setUnitDataLocal] = useState([]);


  useEffect(() => {
    setUnitDataLocal(unitData);
  }, [unitData]);

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
        camera={{ position: [10, 10, 40], fov: 60, far: 2000 }}
        raycaster={{ params: { Line: { threshold: 0.15 } } }}>



        <ambientLight intensity={1.5} />
        <directionalLight position={[20, 50, 20]} intensity={1} castShadow shadow-mapSize={[2048, 2048]} />

        <Sky sunPosition={[100, 20, 100]} distance={45000} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Bulut Grubu */}
        <group>
          <Cloud
            opacity={0.5}
            speed={0.4} // Dönüş hızı
            width={10} // Bulut kümesinin genişliği
            depth={1.5} // Bulut kümesinin derinliği
            segments={40} // Bulut sayısı
            position={[-10, 15, -10]}
          />
          <Cloud
            opacity={0.8}
            speed={0.4}
            width={20}
            depth={2}
            segments={40}
            position={[10, 20, 15]}
            color="#f0f0f0"
          />
        </group>

        {mapData && mapData.map((cell) => (
          <Hexagon key={cell.id} hexKey={cell.id} {...cell} />
        ))}

        {unitDataLocal && unitDataLocal.map((unit) => (
          <Unit key={unit.id} {...unit} ></Unit>
        ))}
        <OrbitControls target={center} makeDefault enablePan={false} maxPolarAngle={Math.PI / 2.1} maxDistance={50} minDistance={5} />
      </Canvas>


    </div>
  )
}