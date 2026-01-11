import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Soldier2(props) {
  const { nodes, materials } = useGLTF('/assets/3d/soldier2.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[27.723, -1.193, -7.511]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.IKLegPoleL} />
        <primitive object={nodes.IKTargetL} />
        <primitive object={nodes.IKLegPoleR} />
        <primitive object={nodes.IKTargetR} />
      </group>
      <skinnedMesh
        geometry={nodes.Knight.geometry}
        material={materials.Knight}
        skeleton={nodes.Knight.skeleton}
        position={[27.723, -3.43, -7.511]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={38.575}
      />
    </group>
  )
}

useGLTF.preload('/assets/3d/soldier2.glb')