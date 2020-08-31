import React, { useContext } from 'react'
import Coordinates2D from '../common/coordinates'

export type CoordinatesValue = [
  Coordinates2D,
  React.Dispatch<React.SetStateAction<Coordinates2D>>,
]

const CoordinatesContext = React.createContext<CoordinatesValue | null>(null)

export function useCoordinates(): CoordinatesValue | null {
  return useContext(CoordinatesContext)
}

export default CoordinatesContext
