import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  model: 1,
  colors: ['#353934', '#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#ff0000'],
  decals: ['react', 'three2', 'pmndrs'],
  color: '#353934',
  decal: 'three2'
})

export { state }
