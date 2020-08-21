import React, { useContext } from 'react';

const TextureContext = React.createContext<[any, (texture: any) => void] | string>('selectedTexture');

export function useTexture() {
  return useContext(TextureContext);
}

export default TextureContext;
