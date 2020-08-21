import React, { useContext } from 'react';

const CoordinatesContext = React.createContext<[any, (texture: any) => void] | string>('currentCoordinates');

export function useCoordinates() {
  return useContext(CoordinatesContext);
}

export default CoordinatesContext;
