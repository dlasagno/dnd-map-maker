import React, { useContext } from 'react';

const CoordinatesContext = React.createContext('currentCoordinates');

export function useCoordinates() {
  return useContext(CoordinatesContext);
}

export default CoordinatesContext;
