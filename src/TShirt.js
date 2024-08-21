import { animated, useSpring } from '@react-spring/three'
import { Box, Decal, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { useSnapshot } from 'valtio'
import CONFIG from './config'
import { state } from './store'

export function TShirt({ isMobile }) {
  const snap = useSnapshot(state)
  const texture = useTexture(`${CONFIG.BASE_URL}assets/${snap.decal_tshirt}.png`)

  const { nodes, materials } = useGLTF(`${CONFIG.BASE_URL}assets/tshirt.gltf`)

  const material = materials['Body_FRONT_2664']
  const material2 = materials['Sleeves_FRONT_2669']

  material.side = THREE.DoubleSide

  useFrame((state, delta) => easing.dampC(material.color, snap.color_tshirt1, 0.25, delta))
  useFrame((state, delta) => easing.dampC(material2.color, snap.color_tshirt2, 0.25, delta))

  //console.log(Object.keys(nodes))
  //console.log('Nodes:', nodes)
  //console.log('Materials:', materials)

  const meshRef = useRef()

  let rotation = [3.3, 0, 0]
  let rotationGroup = [-0.1, snap.rotation_tshirt, 0]
  let position = [0, 0, 0]
  let positionGroup = [-1.06, -0.2, 0]
  let zoom1 = [0.26, 0.26, 0.26]
  let zoom2 = [0.48, 0.48, 0.48]

  if (isMobile) {
    rotation = [3.3, 0, 0]
    rotationGroup = [-0.1, snap.rotation_tshirt, 0]
    position = [0, 0, 0]
    positionGroup = [0, -0.62, 0]
    zoom1 = [0.32, 0.32, 0.32]
    zoom2 = [0.48, 0.48, 0.48]
  } else {
    rotation = [3.3, 0, 0]
    rotationGroup = [-0.1, snap.rotation_tshirt, 0]
    position = [0, 0, 0]
    positionGroup = [-1.06, -0.23, 0]
    zoom1 = [0.28, 0.28, 0.28]
    zoom2 = [0.48, 0.48, 0.48]
  }

  const handlePointerOver = (event) => {
    if (meshRef.current && snap.intro === true) {
      meshRef.current.scale.set(0.267, 0.267, 0.267)
      document.body.style.cursor = 'pointer'
    }
  }

  const handlePointerOut = (event) => {
    if (meshRef.current && snap.intro === true) {
      meshRef.current.scale.set(0.26, 0.26, 0.26)
      document.body.style.cursor = 'auto'
    }
  }

  const { scale } = useSpring({
    scale: snap.intro ? zoom1 : zoom2,
    config: { mass: 1, tension: 170, friction: 26 }
  })

  const customize = () => {
    state.intro = false
    state.model = 2
  }

  return (
    <>
      <animated.group
        ref={meshRef}
        scale={scale}
        position={positionGroup}
        rotation={rotationGroup}
        onPointerOver={() => handlePointerOver(true)}
        onPointerOut={() => handlePointerOut(false)}>
        <mesh
          castShadow
          geometry={nodes.Object_10.geometry}
          material={material}
          material-roughness={1}
          dispose={null}
          rotation={rotation}
          position={position}
          scale={[-1, -1, -1]}
          onClick={() => customize()}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}>
          <Box args={[0.4, 0.4, 0.4]} position={[0, 1.28, -0.08]} rotation={[-0.129, 0, 0]}>
            <meshStandardMaterial attach="material" color="white" transparent opacity={0} />
            <Decal position={[0.005, 0.1, 0.14]} rotation={[3, 0, 3.13]} scale={0.18} map={texture} map-anisotropy={16} />
          </Box>
        </mesh>
        <mesh
          castShadow
          geometry={nodes.Object_0.geometry}
          material={material2}
          material-roughness={1}
          dispose={null}
          position={position}
          rotation={rotation}
          scale={[-1, -1, -1]}></mesh>

        <mesh
          castShadow
          geometry={nodes.Object_0_1.geometry}
          material={material2}
          material-roughness={1}
          dispose={null}
          position={position}
          rotation={rotation}
          scale={[-1, -1, -1]}></mesh>
      </animated.group>
    </>
  )
}
