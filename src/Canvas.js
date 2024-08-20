import { AccumulativeShadows, Center, Environment, RandomizedLight } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'
import { useSnapshot } from 'valtio'
import { Background } from './Background'
import { Shirt } from './Shirt'
import { Shoes } from './Shoes'
import { TShirt } from './TShirt'
import { state } from './store'

export const App = ({ position = [0, 0, 2.5], fov = 25 }) => {
  const snap = useSnapshot(state)

  return (
    <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
      <Background />
      <ambientLight intensity={0.6} />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      
      <CameraRig>
        <Center>
          {(snap.model === 1 || snap.intro) && <Shirt />}
          {(snap.model === 2 || snap.intro) && <TShirt />}
          {(snap.model === 3 || snap.intro) && <Shoes />}
        </Center>
      </CameraRig>
    </Canvas>
  )
}

function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={5} intensity={1} ambient={10} position={[5, 5, -10]} />

    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const targetPosition = snap.intro
      ? [0.002, 0, 2]
      : snap.model === 1
      ? [0.4, -0.05, 2]
      : snap.model === 2
      ? [-0.18, 0.26, 2]
      : [0.8, 0, 2];

    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta);
  });

  return <group ref={group}>{children}</group>;
}
