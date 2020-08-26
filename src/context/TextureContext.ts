import React, { useContext } from 'react'
import Texture from '../common/texture'

export type TextureValue = [Texture, (texture: Texture) => void]

const TextureContext = React.createContext<TextureValue | null>(null)

export function useTexture(): TextureValue | null {
  return useContext(TextureContext)
}

export default TextureContext
