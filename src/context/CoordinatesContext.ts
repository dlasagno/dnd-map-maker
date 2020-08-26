import React, { useContext } from 'react'

export type CoordinatesValue = [number[], (texture: number[]) => void]

const CoordinatesContext = React.createContext<CoordinatesValue | null>(null)

export function useCoordinates(): CoordinatesValue | null {
  return useContext(CoordinatesContext)
}

export default CoordinatesContext
