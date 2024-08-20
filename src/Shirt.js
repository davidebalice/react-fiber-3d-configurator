import { animated, useSpring } from '@react-spring/three'
import { Box, Decal, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import React, { useRef } from 'react'
import { useSnapshot } from 'valtio'
import { state } from './store'

export function Shirt(props) {
  const snap = useSnapshot(state)
  console.log(snap.decal_shirt)
  const texture = useTexture(`/${snap.decal_shirt}.png`)
  const { nodes, materials } = useGLTF('/shirt-hoodie.gltf')
  const material = materials['Material.001']
  useFrame((state, delta) => easing.dampC(material.color, snap.color_shirt, 0.25, delta))

  const meshRef = useRef()

  const position = [-0.56, 0.11, 0]
  const zoom1 = [-0.003, -0.003, -0.003];
  const zoom2 = [-0.005, -0.005, -0.005];

  const handlePointerOver = (event) => {
    if (meshRef.current && state.intro === true) {
      meshRef.current.scale.set(-0.0032, -0.0032, -0.0032)
      document.body.style.cursor = 'pointer'
    }
  }

  const handlePointerOut = (event) => {
    if (meshRef.current && state.intro === true) {
      meshRef.current.scale.set(-0.003, -0.003, -0.003)
      document.body.style.cursor = 'auto'
    }
  }

  const customize = () => {
    state.intro = false
    state.model = 1
  }

  const { scale } = useSpring({
    scale: snap.intro ? zoom1 : zoom2,
    config: { mass: 1, tension: 170, friction: 26 }
  })

  return (
    <>
      <animated.mesh
        ref={meshRef}
        castShadow
        geometry={nodes.Object_6.geometry}
        material={material}
        material-roughness={1}
        position={position}
        {...props}
        dispose={null}
        rotation={[5, 0, snap.rotation_shirt]}
        onClick={() => customize()}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={scale}>
        <Box args={[20, 20, 20]} position={[0.5, 6.2, -14]} rotation={[-0.25, 0.08, 0.1]}>
          <meshStandardMaterial attach="material" color="white" transparent opacity={0} />
          <Decal position={[1.2, 3.4, 1.5]} rotation={[4.7, 0, 3.08]} scale={17} map={texture} map-anisotropy={16} />
        </Box>
      </animated.mesh>
    </>
  )
}

useGLTF.preload('/shirt-hoodie.gltf')
;['/db.png', '/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)

/*
  <Box args={[20, 20, 20]} position={[-2.9, 7.8, -14]} rotation={[-0.2, 0, -0.25]}>
        <meshStandardMaterial attach="material" color="white" transparent opacity={0} />
        <Decal position={[1.2, 3.4, 1.5]} rotation={[4.7, 0, 3.1]} scale={18} map={texture} map-anisotropy={16} />
      </Box>
*/
