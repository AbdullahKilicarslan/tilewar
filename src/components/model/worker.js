import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Worker(props) {
  const group = useRef()
  // Modeli ve animasyonları yükle
  const { scene, animations } = useGLTF('/assets/3d/worker.glb')
  
  // Çoklu kullanımda karakterlerin birbirine karışmaması için modeli klonluyoruz
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  
  // Animasyonları kontrol etmek için names ve actions'ı alıyoruz
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    // Konsolda mevcut animasyon isimlerini görmek için:
    console.log("İşçi Animasyonları:", names);

    /* Genellikle yürüme animasyonu ismi 'Walk', 'Walking' veya 'Run' olur.
       Eğer animasyon ismi bunlardan biriyse aşağıyı ona göre düzenle.
       Şu an listedeki ilk animasyonu veya varsa 'Walk' animasyonunu dener:
    */
    const animationName = names.find(n => n.toLowerCase().includes('walk')) || names[0];

    if (animationName && actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play();
    }

    return () => {
      if (animationName) actions[animationName]?.fadeOut(0.5);
    }
  }, [actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Klonlanmış iskelet yapısını sahneye ekliyoruz */}
      <primitive object={clone} />
    </group>
  )
}

useGLTF.preload('/assets/3d/worker.glb')