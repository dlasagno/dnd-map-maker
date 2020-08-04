import React from 'react';
import './TexturePicker.css';

import textures from '../textures';

function TexturePicker(props) {
  return (
    <div className='TexturePicker'>
      {textures.map(texture => (
        <img key={texture.name} src={texture.path} alt='' onClick={() => props.onTexturePick(texture)}></img>
      ))}
    </div>
  );
}

export default TexturePicker;
