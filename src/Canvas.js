import { Center, Environment, useProgress } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import React, { useEffect, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'
import { Background } from './Background'
import { Preloader } from './Preloader'
import { Shirt } from './Shirt'
import { Shoes } from './Shoes'
import { state } from './store'
import { TShirt } from './TShirt'

export const App = ({ position = [0, 0, 2.5], fov = 25 }) => {
  const [loading, setLoading] = useState(true)
  const snap = useSnapshot(state)
  const { progress } = useProgress()

  useEffect(() => {
    const checkIfMobile = () => {
      state.isMobile = window.innerWidth < 768
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [state, snap])

  useEffect(() => {
    if (progress === 100) {
      setLoading(false)
    }
  }, [progress])

  return (
    <>
      {loading && <Preloader />}
      <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
        <Background />
        <ambientLight intensity={0.6} />
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />

        <CameraRig>
          <Center>
            {!snap.isMobile && (
              <>
                {(snap.model === 1 || snap.intro) && <Shirt isMobile={snap.isMobile} />}
                {(snap.model === 2 || snap.intro) && <TShirt isMobile={snap.isMobile} />}
                {(snap.model === 3 || snap.intro) && <Shoes isMobile={snap.isMobile} />}
              </>
            )}
            {snap.isMobile && (
              <>
                {snap.model === 1 && <Shirt isMobile={snap.isMobile} />}
                {snap.model === 2 && <TShirt isMobile={snap.isMobile} />}
                {snap.model === 3 && <Shoes isMobile={snap.isMobile} />}
              </>
            )}
          </Center>
        </CameraRig>
      </Canvas>
    </>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    const targetPosition = snap.intro ? [0.002, 0, 2] : snap.model === 1 ? [0.4, -0.05, 2] : snap.model === 2 ? [-0.18, 0.26, 2] : [0.8, 0, 2]

    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })

  return <group ref={group}>{children}</group>
}
