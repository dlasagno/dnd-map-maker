import React, { useContext } from 'react';

const TextureContext = React.createContext('selectedTexture');

export function useTexture() {
  return useContext(TextureContext);
}

export default TextureContext;
