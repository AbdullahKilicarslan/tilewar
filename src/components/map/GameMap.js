import React, { useMemo, useState, useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { useTexture } from '@react-three/drei'
import { Sky, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

import { useAppContext } from '../../contexts/AppContext';
import { useGameContext } from '../../contexts/GameContext';


/* HUD Imports */
import { HudContainer } from './hud/HudContainer';


/* */
import Hexagon from './subComponents/Hexagon';




export default function GameMap() {

  const { data, trigger } = useAppContext();
  const { strongholdPositions,setStrongholdPositions } = useGameContext();


  // Yardımcı fonksiyon: Rengi rastgele küçük bir oranda değiştirir
  const getVariantColor = (hex, amount = 10) => {
    // HEX'i RGB'ye çevir
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Rastgele bir sapma ekle (-amount ile +amount arası)
    const offset = () => Math.floor(Math.random() * amount * 2) - amount;

    r = Math.min(255, Math.max(0, r + offset()));
    g = Math.min(255, Math.max(0, g + offset()));
    b = Math.min(255, Math.max(0, b + offset()));

    // Tekrar HEX'e çevir
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const myFunction = () => {
    // console.log('Component2 fonksiyonu çalıştı!');
  };
  useEffect(() => {

    myFunction();

  }, [trigger]);



  const hexSize = 1;
  const xSpacing = Math.sqrt(3) * hexSize;
  const zSpacing = 1.5 * hexSize;

  const cells = useMemo(() => {
    let strongholds = [];
    const temp = [];
    const mapRadius = 6;
    const centerRow = 6;


    for (let r = 0; r <= 12; r++) {
      const rowWidth = 18 - Math.abs(centerRow - r);
      for (let c = 0; c < rowWidth; c++) {
        const x = (c + Math.abs(r - centerRow) / 2) * xSpacing;
        const z = r * zSpacing;

        let height = Math.random() > 0.7 ? (1 + Math.random()) : 1; // Dağlar biraz daha yüksek
        let type = 'normal';

        // KONSEPT RENKLERİ
        // Çimen: Koyu orman yeşili/zeytin tonları
        // Dağ: Koyu taş grisi/kahve
        // Kenarlar/Kaleler: Altın/Bronz vurgular
        let cc = height > 1 ? '#7f550d' : '#274619';
        cc = getVariantColor(cc, 15);
        // Köşe ve Stratejik Noktalar (Kırmızıyı "Kraliyet Kırmızısı"na çekiyoruz)
        if ((c === 0 && r === 0) || (c === rowWidth - 1 && r === 12) ||
          (c === 0 && r === 12) || (c === rowWidth - 1 && r === 0) ||
          (c === 0 && r === 6) || (c >= rowWidth - 1 && r === 6)) {
          cc = '#8b0000'; // Koyu Bordo (Kraliyet kırmızısı)
          height = 1.5;
          type = 'stronghold';
        }

        if (cc == '#8b0000')
          strongholds.push({ r, c });

        // Altın Madeni
        const rand = Math.random();
        if (rand > 0.95) {
          cc = '#d4af37'; // HUD'daki Altın Rengi
          type = 'gold';
        } else if (rand > 0.92) {
          cc = '#236cb6'; // Safir Mavisi (Su veya Mana kaynağı)
          type = 'mana';
          height = height - (1 - rand) * 4;
        }

        temp.push({
          id: `hex-${r}-${c}`,
          position: [x, height / 2, z],
          height: height,
          color: cc,
          emissive: cc,
          emissiveIntensity: type === 'gold' || type === 'stronghold' ? 0.4 : 0.1,
          type: type
        });
      }
    }
    setStrongholdPositions(strongholds);
    return temp;
  }, [xSpacing, zSpacing]);


  const center = useMemo(() => {
    if (cells.length === 0) return [0, 0, 0];

    const xs = cells.map(c => c.position[0]);
    const zs = cells.map(c => c.position[2]);

    const centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
    const centerZ = (Math.min(...zs) + Math.max(...zs)) / 2;

    return [centerX, 0, centerZ];
  }, [cells]);

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

        {cells.map((cell) => (
          <Hexagon key={cell.id} type={cell.type} position={cell.position} texturePath={cell.tex} height={cell.height} color={cell.color} emissiveIntensity={cell.emissiveIntensity} />
        ))}

        <OrbitControls target={center} makeDefault enablePan={false} maxPolarAngle={Math.PI / 2.1} maxDistance={50} minDistance={5} />
      </Canvas>


    </div>
  )
}