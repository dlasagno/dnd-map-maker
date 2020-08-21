import React, { useContext } from 'react';

export type TextureValue = [any, (texture: any) => void];

const TextureContext = React.createContext<TextureValue | string>('selectedTexture');

export function useTexture() {
  return useContext(TextureContext);
}

export default TextureContext;
