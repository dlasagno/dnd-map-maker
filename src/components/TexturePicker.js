import React from 'react';
import './TexturePicker.css';
import { useTexture } from '../App'

import textures from '../textures';

function TexturePicker() {
  const [, setSelectedTexture] = useTexture();

  return (
    <div className='TexturePicker'>
      {textures.map(texture => (
        <img key={texture.name} src={texture.path} alt='' onClick={() => setSelectedTexture(texture)}></img>
      ))}
    </div>
  );
}

export default TexturePicker;
