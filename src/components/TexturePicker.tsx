import React from 'react'
import './TexturePicker.css'
import { useTexture, TextureValue } from '../context/TextureContext'

import textures from '../textures'

const TexturePicker: React.FC = () => {
  const [, setSelectedTexture] = useTexture() as TextureValue

  return (
    <div className="TexturePicker">
      {textures.map((texture) => (
        <button type="button" onClick={() => setSelectedTexture(texture)}>
          <img key={texture.name} src={texture.path} alt="" />
        </button>
      ))}
    </div>
  )
}

export default TexturePicker
