import React, { useState, useContext } from 'react';
import './App.css';

import textures from './textures';
import TextureBar from './components/TextureBar';
import MapView from './components/MapView';

const TextureContext = React.createContext('selectedTexture');

export function useTexture() {
  return useContext(TextureContext);
}

function App() {
  const [selectedTexture, setSelectedTexture] = useState(textures[0]);

  return (
    <TextureContext.Provider value={selectedTexture}>

    <div className="App">
      <img className="App-selected-texture" src={selectedTexture.path} alt=""></img>
      <TextureBar onTexturePick={setSelectedTexture} />
      <div id="tool-bar">
          <div id="tool-selector"></div>
          <div id="x-coordinate">14</div>
          <div id="y-coordinate">17</div>
      </div>
      <MapView width={100} height={100} cellSize={32} />
    </div>

    </TextureContext.Provider>
  );
}

export default App;
