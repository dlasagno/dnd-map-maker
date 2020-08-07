import React, { useState, useContext } from 'react';
import './App.css';
import TextureBar from './components/TextureBar';
import ToolBar from './components/ToolBar';
import MapView from './components/MapView';

import textures from './textures';
import tools from './tools';

const TextureContext = React.createContext('selectedTexture');
export function useTexture() {
  return useContext(TextureContext);
}

const ToolContext = React.createContext('selectedTool');
export function useTool() {
  return useContext(ToolContext);
}

function App() {
  const [selectedTexture, setSelectedTexture] = useState(textures[0]);
  const [selectedTool, setSelectedTool] = useState(tools[0]);

  return (
    <TextureContext.Provider value={[selectedTexture, setSelectedTexture]}>
    <ToolContext.Provider value={[selectedTool, setSelectedTool]}>

    <div className="App">
      <img className="App-selected-texture" src={selectedTexture.path} alt=""></img>
      <TextureBar />
      <ToolBar />
      <MapView width={100} height={100} cellSize={32} />
    </div>

    </ToolContext.Provider>
    </TextureContext.Provider>
  );
}

export default App;
