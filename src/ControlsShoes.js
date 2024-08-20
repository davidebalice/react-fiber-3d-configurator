import { AiFillCamera, AiOutlineArrowLeft } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from './store'

export function ControlsShoes() {
  const snap = useSnapshot(state)

  const handleRotationChange = (event) => {
    const newRotation = parseFloat(event.target.value)
    state.rotation_tshirt = newRotation
  }

  return (
    <div className="customizer">
      <input
        type="range"
        min="-Math.PI"
        max={Math.PI}
        step="0.01"
        value={snap.rotation_tshirt || 0}
        onChange={handleRotationChange}
        style={{ position: 'absolute', top: '20px', left: '20px' }}
      />

      <div className="color-options">
        {snap.colors.map((color) => (
          <div key={color} className={`circle`} style={{ background: color }} onClick={() => (state.color = color)}></div>
        ))}
      </div>
      <div className="decals">
        <div className="decals--container">
          {snap.decals.map((decal) => (
            <div key={decal} className={`decal`} onClick={() => (state.decal_shirt = decal)}>
              <img src={decal + '_thumb.png'} alt="brand" />
            </div>
          ))}
        </div>
      </div>

      <button
        className="share"
        style={{ background: snap.color }}
        onClick={() => {
          const link = document.createElement('a')
          link.setAttribute('download', 'canvas.png')
          link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
          link.click()
        }}>
        DOWNLOAD
        <AiFillCamera size="1.3em" />
      </button>
      <button className="exit" style={{ background: snap.color }} onClick={() => (state.intro = true)}>
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
      </button>
    </div>
  )
}
