import { proxy } from 'valtio'

const state = proxy({
  isMobile: false,
  intro: true,
  model: 1,
  colors: ['#353934', '#ffffff', '#cccccc', '#999999', '#EFBD4E', '#1f8e13', '#80C670', '#146197', '#49aad7', '#726DE8', '#EF674E', '#ff0000'],
  colors_shoes1: ['#633f11',  '#846e38', '#353934'],
  colors_shoes2: ['#353934', '#633f11', '#999999', '#ffffff'],
  decals: ['db', 'db2', 'react', 'react2', 'three2'],
  color_shirt: '#353934',
  color_shirt: '#353934',
  color_tshirt1: '#ffffff',
  color_tshirt2: '#999999',
  color_shoes1: '#633f11',
  color_shoes2: '#353934',
  decal_shirt: 'db2',
  decal_tshirt: 'db',
  rotation_shirt: 0,
  rotation_tshirt: 0,
  rotation_shoes: 0
})

export { state }
