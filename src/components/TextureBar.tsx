import React from 'react';
import './TextureBar.css';
import TexturePicker from './TexturePicker';

const TextureBar: React.FC = () => {
  return (
    <div className="TextureBar">
      <TexturePicker />
    </div>
  );
}

export default TextureBar;
