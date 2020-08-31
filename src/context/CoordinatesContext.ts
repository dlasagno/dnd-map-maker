import React, { useContext } from 'react'

export type CoordinatesValue = [
  number[],
  React.Dispatch<React.SetStateAction<number[]>>,
]

const CoordinatesContext = React.createContext<CoordinatesValue | null>(null)

export function useCoordinates(): CoordinatesValue | null {
  return useContext(CoordinatesContext)
}

export default CoordinatesContext
