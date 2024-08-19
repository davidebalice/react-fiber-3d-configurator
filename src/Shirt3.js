import { Box, Decal, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from './store'
import { useSpring, animated } from '@react-spring/three';


export function Shirt3(props) {
  //const model = "shirt-hoodie.gltf";
  //const model = 'shirt_baked_collapsed.glb'
  const snap = useSnapshot(state)
  console.log(snap.decal)
  const texture = useTexture(`/${snap.decal}.png`)

  const { nodes, materials } = useGLTF('/shirt-hoodie.gltf')

  const material = materials['Material.001']

  useFrame((state, delta) => easing.dampC(material.color, snap.color, 0.25, delta))

  const { scale } = useSpring({
    scale: snap.intro ? [-0.003, -0.003, -0.003] : [-0.005, -0.005, -0.005],
    config: { mass: 1, tension: 170, friction: 26 },
  });


  //console.log(Object.keys(nodes))
  // console.log('Nodes:', nodes)
  //console.log('Materials:', materials)

  return (
    <animated.mesh
      castShadow
      geometry={nodes.Object_6.geometry}
      material={material}
      material-roughness={1}
      {...props}
      dispose={null}
      rotation={[5, 0, 0]}
      position={[-0.7, 0, 0]}
      scale={scale}>
      <Box args={[20, 20, 20]} position={[-2.5, 6.4, -12]}>
        <meshStandardMaterial attach="material" color="white" transparent opacity={0} />
        <Decal position={[2, 3.4, 1]} rotation={[4.8, 0, 0]} scale={15} map={texture} map-anisotropy={16} />
      </Box>
    </animated.mesh>
  )
}

useGLTF.preload('/shirt-hoodie.gltf')
;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
