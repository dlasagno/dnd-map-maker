import React from 'react'
import './TexturePicker.css'
import { useTexture, TextureValue } from '../context/TextureContext'

import textures from '../textures'

const TexturePicker: React.FC = () => {
  const [, setSelectedTexture] = useTexture() as TextureValue

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
