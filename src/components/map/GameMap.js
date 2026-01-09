import React, { useMemo, useState, useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { useTexture } from '@react-three/drei'
import { Sky, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

import { useAppContext } from '../../contexts/AppContext';
import { CoinPouch } from '../model/coinpouch';
import BottomBar from './hud/BottomBar'
import TopBar from './hud/TopBar'
import TurnControl from './hud/TurnControl'
import PlayerList from './hud/PlayerList'
import RecruitmentPanel from './hud/RecruitmentPanel'

import { Castle } from './../model/castle';


// Altıgen Bileşeni (Görsel Harita)
function HexagonTexture({ position, texturePath, height }) {

  const texture = useTexture(texturePath)

  const [sideTex] = useTexture([
    '/assets/tile/side.png'
  ])
  const adjustedPosition = [
    position[0],
    position[1] + height / 2, // Alt tabanı sıfıra sabitleyen sihirli dokunuş
    position[2]
  ];
  return (
    <mesh position={adjustedPosition} rotation={[Math.PI, 0, 0]}>
      <cylinderGeometry args={[1, 1, height, 6]} />

      <meshStandardMaterial attach="material-0" map={sideTex} color="white" />
      <meshStandardMaterial attach="material-1" map={texture} flatShading />
      <meshStandardMaterial attach="material-2" map={texture} color="white" />
    </mesh>
  )
}

function Hexagon({ position, color, height, emissiveIntensity, type }) {
  const [hovered, setHovered] = React.useState(false);

  const baseColor = color === 'gold' ? '#d4af37' : color;
  const isSpecial = type === 'gold' || type === 'stronghold';

  return (
    <group position={position}>
      {/* Altın kesesi varsa, etkileşimi engellememesi için mesh dışında tutuyoruz */}
      {type === 'gold' && (
        <CoinPouch
          position={[0, height / 2 + 0.5, 0]}
          scale={0.2}
          speed={2}
        />
      )}

      {type === 'stronghold' && (
        <Castle
          position={[0, height / 2, 0]}
          scale={0.7}
          speed={2}
        />
      )}
      <mesh
        rotation={[Math.PI, 0, 0]}
        castShadow
        receiveShadow
        // Hover olaylarını mesh üzerine aldık
        onPointerEnter={(e) => {
          e.stopPropagation(); // Diğer objelerin tetiklenmesini durdur
          setHovered(true);
        }}
        onPointerLeave={(e) => {
          setHovered(false);
        }}
      >
        <cylinderGeometry args={[1, 1, height, 6]} />

        {/* Yanlar */}
        <meshStandardMaterial attach="material-0" color={baseColor} metalness={0.5} roughness={0.7} />

        {/* Alt */}
        <meshStandardMaterial attach="material-1" color="#050505" />

        {/* ÜST KAPAK - Hover burada işlenir */}
        <meshStandardMaterial
          attach="material-2"
          color={hovered ? "#ffffff" : baseColor}
          metalness={isSpecial ? 1 : 0.3}
          roughness={isSpecial ? 0.1 : 0.4}
          emissive={hovered ? "#ffffff" : baseColor}
          emissiveIntensity={hovered ? 0.5 : (isSpecial ? 0.8 : 0.1)}
        />
      </mesh>

      {/* Görsel Seçim Çerçevesi (Opsiyonel ama kararlılık sağlar) */}

      <lineSegments rotation={[Math.PI, 0, 0]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(1, 1, height + 0.1, 6)]} />
        <lineBasicMaterial color="#74746f" transparent opacity={0.5} linewidth={0.1} />
      </lineSegments>


      {/* Işıklar */}
      {isSpecial && (
        <pointLight position={[0, height / 2 + 0.5, 0]} intensity={hovered ? 3 : 1.5} color={baseColor} />
      )}
    </group>
  );
}
// Hareket Eden Küp (Birim)
function Unit({ unitRef }) {
  return (
    <mesh ref={unitRef} position={[0, 0.5, 0]}> {/* Y ekseni 0.5: Altıgenin üzerinde durması için */}
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}

export default function GameMap() {

  const { data, trigger } = useAppContext();
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
    console.log('Component2 fonksiyonu çalıştı!');
    // moveUnit();
  };
  useEffect(() => {

    myFunction();

  }, [trigger]);

  const unitRef = useRef()
  const [mapData, setMapData] = useState([])



  // Harita verisini bir kez oluştur
  const hexSize = 1;
  const xSpacing = Math.sqrt(3) * hexSize;
  const zSpacing = 1.5 * hexSize;

  const cells = useMemo(() => {
    const temp = [];
    const mapRadius = 6;
    const centerRow = 6;

    for (let r = 0; r <= 12; r++) {
      const rowWidth = 18 - Math.abs(centerRow - r);
      for (let c = 0; c < rowWidth; c++) {
        const x = (c + Math.abs(r - centerRow) / 2) * xSpacing;
        const z = r * zSpacing;

        let height = Math.random() > 0.7 ? (1 + Math.random()) : 0.6; // Dağlar biraz daha yüksek
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

        // Altın Madeni
        const rand = Math.random();
        if (rand > 0.95) {
          cc = '#d4af37'; // HUD'daki Altın Rengi
          type = 'gold';
        } else if (rand > 0.92) {
          cc = '#236cb6'; // Safir Mavisi (Su veya Mana kaynağı)
          type = 'mana';
          height = height - rand;
        }

        temp.push({
          id: `hex-${r}-${c}`,
          position: [x, 0, z],
          height: height,
          color: cc,
          emissive: cc,
          emissiveIntensity: type === 'gold' || type === 'stronghold' ? 0.4 : 0.1,
          type: type
        });
      }
    }
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

  // Rastgele Hücreye Gitme Fonksiyonu
  const moveUnit = () => {
    if (mapData.length === 0) return;

    // Rastgele bir hücre seç
    const randomCell = mapData[Math.floor(Math.random() * mapData.length)];
    const [targetX, targetY, targetZ] = randomCell.position;

    // GSAP ile animasyon
    gsap.to(unitRef.current.position, {
      x: targetX,
      z: targetZ,
      y: 1.5, // Giderken biraz havaya kalksın (yaylanma efekti)
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // Hedefe vardığında tam üzerine kon
        gsap.to(unitRef.current.position, { y: 0.5, duration: 0.2 });
      }
    });
  };


  const buttonStyle = {
    padding: '12px 24px', fontSize: '18px', cursor: 'pointer',
    backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '8px'
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* Üst Arayüz (Enerji Barı vb.) */}
      <div style={{ position: 'absolute', top: '160px', left: '20px', zIndex: 100, display: 'flex', gap: '10px' }}>
        <button onClick={moveUnit} style={buttonStyle}>Zar At</button>
      </div>



      <TopBar></TopBar>
      <TurnControl></TurnControl>
      <PlayerList></PlayerList>
      <RecruitmentPanel></RecruitmentPanel>
      <Canvas shadows
        camera={{ position: [10, 10, 40], fov: 60, far: 1000 }}
        raycaster={{ params: { Line: { threshold: 0.15 } } }}>
        {/* Arka planı HUD ile uyumlu çok koyu lacivert/siyah yapıyoruz */}
        <color attach="background" args={['#050505']} />

        <ambientLight intensity={0.4} /> {/* Genel aydınlatmayı biraz kıstık ki parlamalar belli olsun */}

        {/* Işığın açısını ve gücünü artırarak siyahlığı engelliyoruz */}
        <directionalLight
          position={[20, 50, 20]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        {/* Gökyüzünü daha dramatik, akşamüstü/gece moduna alıyoruz */}
        <Sky sunPosition={[-100, 10, -100]} distance={450000} inclination={0.6} azimuth={0.1} />

        {cells.map((cell) => (
          <Hexagon
            key={cell.id}
            type={cell.type}
            position={cell.position}
            texturePath={cell.tex}
            height={cell.height}
            color={cell.color}
            emissiveIntensity={cell.emissiveIntensity}
          />
        ))}

        <Unit unitRef={unitRef} />
        <OrbitControls
          target={center}
          makeDefault
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          maxDistance={50}
          minDistance={5}
        />
      </Canvas>

      <BottomBar></BottomBar>
    </div>
  )
}