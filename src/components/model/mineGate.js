import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function MineGate(props) {
  const { nodes, materials } = useGLTF('/assets/3d/base_basic_shaded.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.model.geometry} material={materials.model} />
    </group>
  )
}

useGLTF.preload('/assets/3d/base_basic_shaded.glb')
