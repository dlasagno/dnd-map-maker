import React from 'react';
import './TexturePicker.css';
import { useTexture, TextureValue } from '../context/TextureContext';

import textures from '../textures';

function TexturePicker() {
  const [, setSelectedTexture] = useTexture() as TextureValue;

  return (
    <div className='TexturePicker'>
      {textures.map((texture: any) => (
        <img key={texture.name} src={texture.path} alt='' onClick={() => setSelectedTexture(texture)}></img>
      ))}
    </div>
  );
}

export default TexturePicker;
