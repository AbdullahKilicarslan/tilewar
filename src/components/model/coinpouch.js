import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function CoinPouch(props) {
  const { nodes, materials } = useGLTF('/assets/3d/coin-3098.glb')
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Y ekseninde döndür (kendi ekseni)
      groupRef.current.rotation.y += delta * 0.5 // 0.5 hızı belirler
    }
  })
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={[-0.113, 0.039, -0.127]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone.geometry}
          material={materials.Material}
          position={[-0.024, 0.96, 0.036]}
          rotation={[0, 0, Math.PI]}
          scale={0.844}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus.geometry}
          material={materials['Material.001']}
          position={[0, 0.88, 0]}
          scale={0.326}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus001.geometry}
          material={materials['Material.001']}
          position={[0, 0.995, 0]}
          scale={0.326}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials['Material.002']}
        position={[1.311, -0.025, -0.456]}
        rotation={[2.261, 0.642, 0.25]}
        scale={0.432}   >
        <meshStandardMaterial color={props.customColor || "#e4a921"} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials['Material.002']}
        position={[-2.044, -0.848, 0.189]}
        rotation={[2.261, 0.642, 0.25]}
        scale={0.432}  >
        <meshStandardMaterial color={props.customColor || "#e4a921"} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/assets/3d/coin-3098.glb')
