import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

export function Fish(props) {
  const group = useRef()
  const { scene, animations } = useGLTF('/assets/3d/fish.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions, names } = useAnimations(animations, group)

  // Yörünge ayarları
  const radius = .2; // Dairenin genişliği (Bunu artırarak daha geniş döndürebilirsin)
  const speed = 0.3;  // Dönüş hızı

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime() * speed;
      
      // 1. Daire çizme hesaplaması (X ve Z düzleminde)
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;

      // 2. Pozisyonu güncelle
      // (props.position'dan gelen başlangıç noktasına ekliyoruz ki haritadaki yeri bozulmasın)
      group.current.position.x = (props.position?.[0] || 0) + x;
      group.current.position.y = (props.position?.[2] || 0) + z;

      // 3. Balığın baktığı yönü gitmekte olduğu yöne çevir (Önemli!)
      // Balığın burnu her zaman dairenin bir sonraki adımına bakmalı
      group.current.rotation.y = -t + Math.PI / 2;

      // 4. Hafif dalgalanma efekti (Y ekseni)
      group.current.position.y = (props.position?.[1] || 0) + Math.sin(t * 2) * 0.2;
    }
  })

  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().fadeIn(0.5).play();
      return () => actions[names[0]]?.fadeOut(0.5);
    }
  }, [actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  )
}

useGLTF.preload('/assets/3d/fish.glb')