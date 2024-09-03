import { animated, useSpring } from '@react-spring/three'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import React, { useRef } from 'react'
import { useSnapshot } from 'valtio'
import { state } from './store'
import CONFIG from './config';

export function Shoes({ isMobile }) {
  const snap = useSnapshot(state)

  const { nodes, materials } = useGLTF(`${CONFIG.BASE_URL}assets/leather-shoes.gltf`)

  const material = materials['chose']
  const material2 = materials['material']

  material.map = null
  material2.map = null

  useFrame((state, delta) => easing.dampC(material.color, snap.color_shoes1, 0.25, delta))
  useFrame((state, delta) => easing.dampC(material2.color, snap.color_shoes2, 0.25, delta))

  const { scale } = useSpring({
    scale: snap.intro ? [1, 1, 1] : [2, 2, 2],
    config: { mass: 1, tension: 170, friction: 26 }
  })

  console.log(Object.keys(nodes))
  console.log('Nodes:', nodes)
  console.log('Materials:', materials)

  const meshRef = useRef()

  let scaleMesh = [0, 0, 0]
  let rotation = [0, 0, 0]
  let position = [0, 0, 0]
  let position2 = [0, 0, 0]
  let positionGroup = [0, 0, 0]
  let rotationGroup = [0, 0, 0]

  if (isMobile) {
    scaleMesh = [-0.00055, -0.00055, -0.00055]
    rotation = [3, 0.1, 0]
    position = [0, 0.47, 0]
    position2 = [-0.057, 0.08, 0.11]
    positionGroup = [0.04, -0.24, 0]
    rotationGroup = [0, snap.rotation_shoes, 0]
  } else {
    scaleMesh = [-0.00055, -0.00055, -0.00055]
    rotation = [3, 0, 0]
    position = [0, 0.4, 0]
    position2 = [-0.052, 0.01, 0.114]
    positionGroup = [0, 0.12, 0]
    rotationGroup = [0.1, snap.rotation_shoes, 0]
  }

  const handlePointerOver = (event) => {
    if (meshRef.current && snap.intro === true) {
      meshRef.current.scale.set(1.1, 1.1, 1.1)
      document.body.style.cursor = 'pointer'
    }
  }

  const handlePointerOut = (event) => {
    if (meshRef.current && snap.intro === true) {
      meshRef.current.scale.set(1, 1, 1)
      document.body.style.cursor = 'auto'
    }
  }

  const customize = () => {
    state.intro = false
    state.model = 3
  }

  return (
    <>
      <animated.group
        ref={meshRef}
        scale={scale}
        position={positionGroup}
        rotation={rotationGroup}
        onPointerOver={() => handlePointerOver(true)}
        onPointerOut={() => handlePointerOut(false)}
        onClick={() => customize()}>
        <mesh
          castShadow
          geometry={nodes['choose_chose_0'].geometry}
          material={material}
          material-roughness={1}
          dispose={null}
          rotation={rotation}
          position={position}
          scale={scaleMesh}></mesh>
        <mesh
          castShadow
          geometry={nodes['choose001_chose_0'].geometry}
          material={material}
          material-roughness={1}
          dispose={null}
          rotation={rotation}
          position={position}
          scale={scaleMesh}></mesh>

        <mesh
          castShadow
          geometry={nodes['Daygiayb_day_0'].geometry}
          material={material2}
          material-roughness={1}
          dispose={null}
          rotation={rotation}
          position={position2}
          scale={scaleMesh}></mesh>
      </animated.group>
    </>
  )
}
