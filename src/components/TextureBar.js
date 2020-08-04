import React from 'react';
import './TextureBar.css';
import TexturePicker from './TexturePicker';

function TextureBar(props) {
  return (
    <div className="TextureBar">
      <TexturePicker onTexturePick={props.onTexturePick} />
    </div>
  );
}

export default TextureBar;
