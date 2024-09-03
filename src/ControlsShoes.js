import { AiFillCamera, AiOutlineArrowLeft } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from './store'

export function ControlsShoes() {
  const snap = useSnapshot(state)

  const handleRotationChange = (event) => {
    const newRotation = parseFloat(event.target.value)
    state.rotation_shoes = newRotation
  }

  return (
    <div className="customizer">
      <div className="controls">
        <div className="controls-header">
          <button onClick={() => (state.intro = true)}>
            <AiOutlineArrowLeft size="1.3em" /> Back
          </button>

          <button
            onClick={() => {
              const link = document.createElement('a')
              link.setAttribute('download', 'canvas.png')
              link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
              link.click()
            }}>
            <AiFillCamera size="1.3em" /> Download
          </button>
        </div>
        <p>Rotation</p>
        <input
          type="range"
          min="-Math.PI"
          max={2 * Math.PI}
          step="0.01"
          value={snap.rotation_shoes || 0}
          onChange={handleRotationChange}
          className="rotation"
        />
        <br />
        <br />
        <p>Primary colors</p>
        <div className="color-options">
          {snap.colors_shoes1.map((color) => (
            <div key={color} className={`color`} style={{ background: color }} onClick={() => (state.color_shoes1 = color)}></div>
          ))}
        </div>
        <br />
        <br />
        <p>Secondary colors</p>
        <div className="color-options">
          {snap.colors_shoes2.map((color) => (
            <div key={color} className={`color`} style={{ background: color }} onClick={() => (state.color_shoes2 = color)}></div>
          ))}
        </div>
        <br />
      </div>
    </div>
  )
}
