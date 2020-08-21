import React, { useContext } from 'react';
import Texture from '../common/texture';

export type TextureValue = [Texture, (texture: Texture) => void];

const TextureContext = React.createContext<TextureValue | string>('selectedTexture');

export function useTexture() {
  return useContext(TextureContext);
}

export default TextureContext;
