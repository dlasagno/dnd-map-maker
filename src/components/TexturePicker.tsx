import React, { useEffect } from 'react'
import './TexturePicker.css'
import { useTexture, TextureValue } from '../context/TextureContext'

import textures from '../textures'

const TexturePicker: React.FC = () => {
  const [, setSelectedTexture] = useTexture() as TextureValue

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const texture = textures[parseInt(e.key, 10) - 1]

      if (texture) setSelectedTexture(texture)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [setSelectedTexture])

  return (
    <div className="TexturePicker">
      {textures.map((texture) => (
        <button
          key={texture.name}
          type="button"
          onClick={() => setSelectedTexture(texture)}
        >
          <img src={texture.path} alt="" />
        </button>
      ))}
    </div>
  )
}

export default TexturePicker
