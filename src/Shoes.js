import { animated, useSpring } from '@react-spring/three'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import React, { useRef } from 'react'
import { useSnapshot } from 'valtio'
import { state } from './store'

export function Shoes(props) {
  const snap = useSnapshot(state)

  const { nodes, materials } = useGLTF('/leather-shoes.gltf')

  const material = materials['chose']
  const material2 = materials['material']

  material.map = null

  useFrame((state, delta) => easing.dampC(material.color, snap.color_shoes, 0.25, delta))

  const { scale } = useSpring({
    scale: snap.intro ? [1, 1, 1] : [2, 2, 2],
    config: { mass: 1, tension: 170, friction: 26 }
  })

  console.log(Object.keys(nodes))
  console.log('Nodes:', nodes)
  console.log('Materials:', materials)

  const meshRef = useRef()
  const scaleMesh = [-0.00055, -0.00055, -0.00055]
  const rotation = [3, 0.1, 0]
  const position = [-0.02, 0.47, 0]
  const position2 = [-0.077, 0.08, 0.11]
  const positionGroup = [0, 0, 0]
  const rotationGroup = [0, snap.rotation_shoes, 0]

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
          {...props}
          dispose={null}
          rotation={rotation}
          position={position}
          scale={scaleMesh}></mesh>
        <mesh
          castShadow
          geometry={nodes['choose001_chose_0'].geometry}
          material={material}
          material-roughness={1}
          {...props}
          dispose={null}
          rotation={rotation}
          position={position}
          scale={scaleMesh}></mesh>

        <mesh
          castShadow
          geometry={nodes['Daygiayb_day_0'].geometry}
          material={material2}
          material-roughness={1}
          {...props}
          dispose={null}
          rotation={rotation}
          position={position2}
          scale={scaleMesh}></mesh>
      </animated.group>
    </>
  )
}

useGLTF.preload('/leather-shoes.gltf')
;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
