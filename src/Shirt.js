import { animated, useSpring } from '@react-spring/three'
import { Box, Decal, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { easing } from 'maath'
import React, { useRef } from 'react'
import { TextureLoader } from 'three'
import { useSnapshot } from 'valtio'
import CONFIG from './config'
import { state } from './store'

export function Shirt({ isMobile }) {
  const snap = useSnapshot(state)
  console.log(snap.decal_shirt)
  const texture = useTexture(`${CONFIG.BASE_URL}assets/${snap.decal_shirt}.png`)
  const { nodes, materials } = useGLTF(`${CONFIG.BASE_URL}assets/shirt-hoodie.gltf`)
  const material = materials['Material.001']
  useFrame((state, delta) => easing.dampC(material.color, snap.color_shirt, 0.25, delta))

  //preload png
  const texture2 = useLoader(TextureLoader, `${CONFIG.BASE_URL}assets/react.png`)
  const texture3 = useLoader(TextureLoader, `${CONFIG.BASE_URL}assets/react2.png`)
  const texture4 = useLoader(TextureLoader, `${CONFIG.BASE_URL}assets/three2.png`)
  const texture5 = useLoader(TextureLoader, `${CONFIG.BASE_URL}assets/angular.png`)
  const texture6 = useLoader(TextureLoader, `${CONFIG.BASE_URL}assets/angular2.png`)
  //

  const meshRef = useRef()

  let position = [0, 0, 0]
  let zoom1 = [0, 0, 0]
  let zoom2 = [0, 0, 0]

  if (isMobile) {
    position = [0, -0.19, 0]
    zoom1 = [-0.003, -0.003, -0.003]
    zoom2 = [-0.005, -0.005, -0.005]
  } else {
    position = [-0.56, 0.11, 0]
    zoom1 = [-0.003, -0.003, -0.003]
    zoom2 = [-0.005, -0.005, -0.005]
  }

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
        dispose={null}
        rotation={[5, 0, snap.rotation_shirt]}
        onClick={() => customize()}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={scale}>
        <Box args={[20, 20, 20]} position={[-1, 6.2, -14]} rotation={[-0.25, 0.08, 0.1]}>
          <meshStandardMaterial attach="material" color="white" transparent opacity={0} />
          <Decal
            position={[1.2, 3.4, 1.5]}
            rotation={[4.8, 0, -0.053]}
            scale={snap.decal_shirt === 'db' || snap.decal_shirt === 'db2' ? [-17, 17, 17] : [17, 17, 17]}
            map={texture}
            map-anisotropy={16}
          />
        </Box>
      </animated.mesh>
    </>
  )
}
