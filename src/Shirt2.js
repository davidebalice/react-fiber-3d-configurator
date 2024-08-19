import { Box, Decal, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from './store'

export function Shirt2(props) {
    const snap = useSnapshot(state)
    console.log(snap.decal);
    const texture = useTexture(`/${snap.decal}.png`)

    const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')

    const material = materials['lambert1']

    useFrame((state, delta) => easing.dampC(material.color, snap.color, 0.25, delta))

    console.log(Object.keys(nodes))
    console.log('Nodes:', nodes)
    console.log('Materials:', materials)

    return (
    <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={material}
        material-roughness={1}
        {...props}
        dispose={null}
        position={[-0.5, 0, 0]}
        rotation={[5, 0, 0]}
        scale={[1, 1, 1]}>
        <Box args={[20, 20, 20]} position={[-2.5, 6.4, -12]}>
            <meshStandardMaterial attach="material" color="white" transparent opacity={0} />
            <Decal position={[2, 3.4, 1]} rotation={[4.8, 0, 0]} scale={15} map={texture} map-anisotropy={16} />
            </Box>
        </mesh>
    )
}

useGLTF.preload('/shirt_baked_collapsed.glb')
;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
