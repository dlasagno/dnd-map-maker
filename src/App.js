import React, { useState } from 'react';
import './App.css';

import textures from './textures';
import TextureBar from './components/TextureBar';
import MapView from './components/MapView';

function App() {
  const [selectedTexture, setSelectedTexture] = useState(textures[0]);

  return (
    <div className="App">
      <img className="App-selected-texture" src={selectedTexture.path} alt=""></img>
      <TextureBar onTexturePick={(texture) => setSelectedTexture(texture)} />
      <div id="tool-bar">
          <div id="tool-selector"></div>
          <div id="x-coordinate">14</div>
          <div id="y-coordinate">17</div>
      </div>
      <MapView width={20} height={20} cellSize={32} />
    </div>
  );
}

export default App;
