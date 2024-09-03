import { AiFillCamera, AiOutlineArrowLeft } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import CONFIG from './config'
import { state } from './store'

export function ControlsTShirt() {
  const snap = useSnapshot(state)

  const handleRotationChange = (event) => {
    const newRotation = parseFloat(event.target.value)
    state.rotation_tshirt = newRotation
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
          value={snap.rotation_tshirt || 0}
          onChange={handleRotationChange}
          className="rotation"
        />
        <br />
        <br />
        <p>Primary colors</p>
        <div className="color-options">
          {snap.colors.map((color) => (
            <div key={color} className={`color`} style={{ background: color }} onClick={() => (state.color_tshirt1 = color)}></div>
          ))}
        </div>
        <br />
        <br />
        <p>Secondary colors</p>
        <div className="color-options">
          {snap.colors.map((color) => (
            <div key={color} className={`color`} style={{ background: color }} onClick={() => (state.color_tshirt2 = color)}></div>
          ))}
        </div>
        <br />
        <br />
        <p>Decals</p>
        <div className="decals">
          <div className="decals--container">
            {snap.decals.map((decal) => (
              <div key={decal} className={`decal`} onClick={() => (state.decal_tshirt = decal)}>
                <img src={`${CONFIG.BASE_URL}assets/${decal}_thumb.png`} alt="brand" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
