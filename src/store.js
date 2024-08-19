import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  model: 1,
  colors: ['#353934', '#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#ff0000'],
  decals: ['db', 'db2', 'react', 'react2', 'three2', 'pmndrs'],
  color_shirt: '#353934',
  color_shirt: '#353934',
  color_tshirt1: '#ffffff',
  color_tshirt2: '#999999',
  color_shoes: '#633f11',
  decal_shirt: 'db2',
  decal_tshirt: 'db',
  rotation_shirt: 0
})

export { state }
