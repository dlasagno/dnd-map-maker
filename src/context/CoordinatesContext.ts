import React, { useContext } from 'react';

export type CoordinateValue = [number[], (texture: number[]) => void];

const CoordinatesContext = React.createContext<CoordinateValue | string>('currentCoordinates');

export function useCoordinates() {
  return useContext(CoordinatesContext);
}

export default CoordinatesContext;
