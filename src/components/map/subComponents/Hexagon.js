
import React from 'react'
import * as THREE from 'three'

/* Model Imports */
import { CoinPouch } from '../../model/coinpouch';
import { Castle } from './../../model/castle';
import { Fish } from './../../model/fish';
import { Tree1 } from './../../model/tree1';
import { Cave } from '../../model/cave';
import { MineGate } from '../../model/mineGate';

import { useGameContext } from '../../../contexts/GameContext';




const Hexagon = ({ hexKey, position, color, height, emissiveIntensity, type }) => {

    const { strongholdPositions } = useGameContext();



    const [hovered, setHovered] = React.useState(false);

    const baseColor = color === 'gold' ? '#d4af37' : color;
    const isSpecial = type === 'gold' || type === 'stronghold'; 

    const stronghold = strongholdPositions?.find(x => hexKey === `hex-${x.r}-${x.c}`);
    const strongcolor = stronghold?.color || 'white';
    if (type === 'mana')
        console.log("balık")
    return (
        <group position={position}>
            {/* Altın kesesi varsa, etkileşimi engellememesi için mesh dışında tutuyoruz */}
            {type === 'gold' && (
                <MineGate position={[-0, height-0.45 ,-.5]} scale={0.5} speed={2} />
            )}

            {stronghold && <Castle position={[0, height / 2, 0]} scale={0.7} speed={2} customColor={strongcolor} />}
            {type === 'mana' && <Fish position={[0, height / 2, 0]} scale={0.1} />}
            {type === 'grass' && <Tree1 position={[0.5, height / 2, 0]} scale={0.1} customColor={color} />}
            {type === 'grass' && <Tree1 position={[0.5, height / 2, 0.5]} scale={0.1} customColor={color} />}

            <mesh rotation={[Math.PI, 0, 0]} castShadow receiveShadow
                onPointerEnter={(e) => {
                    e.stopPropagation();
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
                <edgesGeometry args={[new THREE.CylinderGeometry(1, 1, height, 6)]} />
                <lineBasicMaterial color="#8b8b1c" transparent opacity={0.4} linewidth={0.01} />
            </lineSegments>


            {/* Işıklar */}
            {isSpecial && (
                <pointLight position={[0, height / 2 + 0.5, 0]} intensity={hovered ? 3 : 1.5} color={baseColor} />
            )}
        </group>
    )
}

export default Hexagon;