import React, { useMemo, useState, useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { useTexture } from '@react-three/drei'
import { Sky, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

import { useAppContext } from '../../contexts/AppContext';
import { CoinPouch } from '../model/coinpouch';


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
  let metalness = 1;
  let roughness = 0.05;
  let envMapIntensity = 2;

  const { nodes, materials } = useGLTF("/assets/3d/coin-3098.glb")


  return (
    <>
      {type === 'gold' &&
        <CoinPouch position={[position[0],position[1]+1,position[2]]} scale={0.2} speed={2} />
      }
      <group position={position}>

        <mesh rotation={[Math.PI, 0, 0]}>
          <cylinderGeometry args={[1, 1, height, 6]} />
          <meshStandardMaterial attach="material-0" color={color} height={height} emissiveIntensity={emissiveIntensity} roughness={roughness} envMapIntensity={envMapIntensity} />
          <meshStandardMaterial attach="material-1" color={color} height={height} emissiveIntensity={emissiveIntensity} roughness={roughness} envMapIntensity={envMapIntensity} />
          <meshStandardMaterial attach="material-2" color={color} height={height} emissiveIntensity={emissiveIntensity} roughness={roughness} envMapIntensity={envMapIntensity} />
        </mesh>


        <lineSegments rotation={[Math.PI, 0, 0]}>
          <edgesGeometry args={[new THREE.CylinderGeometry(1, 1, height, 6), 1]} />
          <lineBasicMaterial color="#251e2d" linewidth={2} />
        </lineSegments>
      </group>
    </>



  )
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

export default function HexMap() {

  const { data, trigger } = useAppContext();

  const myFunction = () => {
    console.log('Component2 fonksiyonu çalıştı!');
    // moveUnit();
  };
  useEffect(() => {

    myFunction();

  }, [trigger]);

  const unitRef = useRef()
  const [mapData, setMapData] = useState([])

  // --- YENİ: Kart Verileri ---
  const [hand, setHand] = useState([
    { id: 1, title: 'Hücum', type: 'Saldırı', cost: 1, desc: 'Rastgele bir düşmana vur.', img: '/assets/card/card-attack.png' },
    { id: 2, title: 'Savunma', type: 'Defans', cost: 1, desc: '5 Zırh kazan.', img: '/assets/card/card-defence.png' },
    { id: 3, title: 'Işınlan', type: 'Büyü', cost: 2, desc: 'Rastgele bir kareye git.', img: '/assets/card/card-magic2.png' },
    { id: 4, title: 'Vergi', type: 'Eşya', cost: 0, desc: '10 altın kazan.', img: '/assets/card/card-gold.png' },
  ]);

  // Harita verisini bir kez oluştur
  const hexSize = 1;
  const xSpacing = Math.sqrt(3) * hexSize;
  const zSpacing = 1.5 * hexSize;

  const cells = useMemo(() => {
    const temp = [];
    const mapRadius = 6; // 12'den 18'e çıkış farkı yaklaşık bu çapı verir
    const centerRow = 6; // 0'dan 12'ye giden sistemde orta nokta

    // r: satır (0'dan 12'ye, toplam 13 satır)
    for (let r = 0; r <= 12; r++) {
      // r=0 (en üst) için 12 hücre, r=6 (orta) için 18 hücre olması için:
      // Her satırın genişliğini ve o satırın başlaması gereken ofseti hesaplıyoruz
      const rowWidth = 18 - Math.abs(centerRow - r);
      const startCol = Math.max(0, centerRow - r) / 2; // Görsel denge için kaydırma

      for (let c = 0; c < rowWidth; c++) {
        // Standart 6gen dizilim matematiği
        // (c + Math.abs(r - centerRow) / 2) kısmı haritayı merkeze toplar
        const x = (c + Math.abs(r - centerRow) / 2) * xSpacing;
        const z = r * zSpacing;

        let height = Math.random() > 0.7 ? 1 : 0.5;
        let p = height === 1 ? 'mountain-tile.png' : 'grass-tile.png';
        let cc = height === 1 ? '#9b89b3' : '#00c9a7';

        if ((c == 0 && r == 0) || (c == rowWidth - 1 && r == 12) || (c == 0 && r == 12) || (c == rowWidth - 1 && r == 0) || (c == 0 && r == 6) || (c >= rowWidth - 1 && r == 6)) {
          cc = '#ff5f5f';
          height = 1.3;
        }
        if (Math.random() > 0.95) cc = 'gold';

        if (Math.random() > 0.95) cc = '#0c6c85';

        temp.push({
          id: `hex-${r}-${c}`,
          position: [x, 0, z],
          tex: '/assets/tile/' + p,
          height: height,
          color: cc,
          emissive: cc, // Parıltı efekti için
          emissiveIntensity: 0.2,
          type: cc === 'gold' ? 'gold' : 'normal'
        });


      }
    }

    setMapData(temp);
    return temp;
  }, [xSpacing, zSpacing]);


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


  // --- Tasarım Objeleri ---
  const handContainerStyle = {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '20px',
    pointerEvents: 'none' // Arkadaki canvasa tıklamayı engellememesi için (kartlar hariç)
  };

  const cardsWrapperStyle = {
    display: 'flex',
    gap: '10px',
    pointerEvents: 'auto'
  };

  const cardStyle = {
    width: '180px', // Biraz daha genişleterek Slay the Spire oranına yaklaştırdık
    height: '260px',
    borderRadius: '12px',
    color: 'white',
    position: 'relative',
    userSelect: 'none',
    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
    cursor: 'pointer',
    overflow: 'hidden', // Resmin dışarı taşmasını engeller

    // Resim Ayarları
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    transition: 'transform 0.2s ease-out',
  };

  const costCircleStyle = {
    position: 'absolute',

    width: '30px',
    height: '30px',
    background: '#3498db',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    border: '2px solid white'
  };

  const buttonStyle = {
    padding: '12px 24px', fontSize: '18px', cursor: 'pointer',
    backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '8px'
  };

  const overlayStyle = {
    height: '100%',
    width: '100%',
    borderRadius: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  };

  const titleStyle = {
    margin: '45px 0 5px 0',
    fontSize: '1.5rem',
    textShadow: '2px 2px 4px rgba(0,0,0,1)', // Metni öne çıkarır
    textAlign: 'center'
  };

  const descStyle = {
    marginTop: '10px',
    marginLeft: '30px',
    width: '50%',
    padding: '8px',
    fontSize: '13px',
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '500',

    // --- Holo & Okunabilirlik Ayarları ---
    borderRadius: '6px',
    // Yarı şeffaf koyu zemin (metni okutur) + Holo renk geçişi
    background: 'linear-gradient(135deg, rgba(30,30,30,0.85) 0%, rgba(60,60,80,0.85) 25%, rgba(100,100,150,0.6) 50%, rgba(60,60,80,0.85) 75%, rgba(30,30,30,0.85) 100%)',
    backgroundSize: '400% 400%',
    animation: 'holo-shine 5s ease infinite',

    // Cam efekti
    backdropFilter: 'blur(3px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',

    textShadow: '1px 1px 2px rgba(0,0,0,1)' // Metin gölgesi
  };

  const typeStyle =
  {
    fontSize: '1rem',
    marginTop: '42px',
    marginLeft: '34px',
    fontWeight: 'bold'
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* Üst Arayüz (Enerji Barı vb.) */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, display: 'flex', gap: '10px' }}>
        <button onClick={moveUnit} style={buttonStyle}>Zar At</button>
      </div>


      {/* --- YENİ: Alt Kart Alanı --- */}
      <div className="hand-container" style={handContainerStyle}>
        <div style={cardsWrapperStyle}>
          {hand.map((card, index) => (
            <div
              key={card.id}
              className="card"
              style={{
                ...cardStyle,
                backgroundImage: `url(${card.img})`,
                border: card.type === 'Saldırı' ? '2px solid #ff4757' : '2px solid #8e44ad' // Tipine göre çerçeve rengi
              }}
              onClick={() => {
                if (card.id === 3) moveUnit(); // Işınlan kartı örneği
                // Kartı elden çıkar (opsiyonel)
                // setHand(prev => prev.filter(c => c.id !== card.id));
              }}
            >

              <div style={overlayStyle}>
                <div style={costCircleStyle}>{card.cost}</div>
                <h4 style={titleStyle}>{card.title}</h4>
                <div className="card-description" style={descStyle}>  {card.desc}</div>

              </div>


            </div>
          ))}
        </div>
      </div>



      <Canvas camera={{ position: [10, 10, 40], fov: 60,  far: 1000 }}>
        <color attach="background" args={['#a2d2ff']} />
        {/* <fog attach="fog" args={['#f0f0f0', 10, 50]} /> */}
        <ambientLight intensity={1} />



        <Sky sunPosition={[100, 20, 100]} distance={450000} />


        {/* Haritayı Çiz */}
        {cells.map((cell) => (
          <Hexagon type={cell.type} key={cell.id} position={cell.position} texturePath={cell.tex} height={cell.height} color={cell.color} emissive={cell.color} emissiveIntensity={cell.emissiveIntensity} />
        ))}






        {/* Birimi Çiz */}
        <Unit unitRef={unitRef} />

        <OrbitControls
          onChange={(e) => {
            const { x, y, z } = e.target.object.position;
            //console.log(`Kamera Pozisyonu: x: ${x.toFixed(2)}, y: ${y.toFixed(2)}, z: ${z.toFixed(2)}`);
          }}
        />
      </Canvas>
    </div>
  )
}