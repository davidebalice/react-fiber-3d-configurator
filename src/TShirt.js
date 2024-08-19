import { animated, useSpring } from '@react-spring/three'
import { Box, Decal, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import * as THREE from 'three' // Importa THREE
import { useSnapshot } from 'valtio'
import { state } from './store'

export function TShirt(props) {
  const snap = useSnapshot(state)
  console.log(snap.decal_tshirt)
  const texture = useTexture(`/${snap.decal_tshirt}.png`)

  const { nodes, materials } = useGLTF('/tshirt.gltf')

  const material = materials['Body_FRONT_2664']
  const material2 = materials['Sleeves_FRONT_2669']

  material.side = THREE.DoubleSide

  useFrame((state, delta) => easing.dampC(material.color, snap.color_tshirt1, 0.25, delta))
  useFrame((state, delta) => easing.dampC(material2.color, snap.color_tshirt2, 0.25, delta))

  //console.log(Object.keys(nodes))
  //console.log('Nodes:', nodes)
  //console.log('Materials:', materials)

  const { scale } = useSpring({
    scale: snap.intro ? [-0.26, -0.26, -0.26] : [-0.005, -0.005, -0.005],
    config: { mass: 1, tension: 170, friction: 26 }
  })

  const rotation = [3.4, 0, 0]
  const position = [-1.05, -0.2, 0]
  const position2 = [-0.6, -0.01, 0.11]

  return (
    <>
      <animated.mesh
        castShadow
        geometry={nodes.Object_10.geometry}
        material={material}
        material-roughness={1}
        {...props}
        dispose={null}
        rotation={rotation}
        position={position}
        scale={scale}>
        <Box args={[0.4, 0.4, 0.4]} position={[0, 1.28, -0.08]} rotation={[-0.129,0,0]}>
          <meshStandardMaterial attach="material" color="white" transparent opacity={0} />
          <Decal position={[0.005,0.10, 0.14]} rotation={[3, 0, 3.13]} scale={0.18} map={texture} map-anisotropy={16} />
        </Box>
      </animated.mesh>
      <animated.mesh
        castShadow
        geometry={nodes.Object_0.geometry}
        material={material2}
        material-roughness={1}
        {...props}
        dispose={null}
        position={position}
        rotation={rotation}
        scale={scale}></animated.mesh>

      <animated.mesh
        castShadow
        geometry={nodes.Object_0_1.geometry}
        material={material2}
        material-roughness={1}
        {...props}
        dispose={null}
        position={position}
        rotation={rotation}
        scale={scale}></animated.mesh>
    </>
  )
}

useGLTF.preload('/tshirt.gltf')
;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
