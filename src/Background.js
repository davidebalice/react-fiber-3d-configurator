import { CanvasTexture } from 'three'

export const Background = () => {
  const gradientCanvas = document.createElement('canvas')
  gradientCanvas.width = 512
  gradientCanvas.height = 512
  const context = gradientCanvas.getContext('2d')
  const gradient = context.createLinearGradient(0, 0, 0, 512)
  gradient.addColorStop(0, '#ffffff')
  gradient.addColorStop(1, '#626262')
  context.fillStyle = gradient
  context.fillRect(0, 0, 512, 512)
  const gradientTexture = new CanvasTexture(gradientCanvas)

  return (
    <>
      <mesh position={[0, 0, -10]} scale={[20, 20, 1]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial map={gradientTexture} />
      </mesh>
    </>
  )
}
