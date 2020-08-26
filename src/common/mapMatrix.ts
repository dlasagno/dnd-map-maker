import Texture from './texture'

export interface Cell {
  texture?: Texture
}

type MapMatrix = Array<Array<Cell>>

export default MapMatrix
