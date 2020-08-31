import React, { useContext } from 'react'
import Texture from '../common/texture'

export type TextureValue = [
  Texture,
  React.Dispatch<React.SetStateAction<Texture>>,
]

const TextureContext = React.createContext<TextureValue | null>(null)

export function useTexture(): TextureValue | null {
  return useContext(TextureContext)
}

export default TextureContext
