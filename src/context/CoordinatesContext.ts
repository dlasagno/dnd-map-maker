import React, { useContext } from 'react'

export type CoordinateValue = [number[], (texture: number[]) => void]

const CoordinatesContext = React.createContext<CoordinateValue | null>(null)

export function useCoordinates() {
  return useContext(CoordinatesContext)
}

export default CoordinatesContext
