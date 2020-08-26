import React, { useState } from 'react'
import './App.css'
import TextureContext from './context/TextureContext'
import ToolContext from './context/ToolContext'
import CoordinatesContext from './context/CoordinatesContext'
import TextureBar from './components/TextureBar'
import ToolBar from './components/ToolBar'
import MapView from './components/MapView'

import textures from './textures'
import tools from './tools'

const App: React.FC = () => {
  const [selectedTexture, setSelectedTexture] = useState(textures[0])
  const [selectedTool, setSelectedTool] = useState(tools[0])
  const [currentCoordinates, setCurrentCoordinates] = useState([0, 0])

  return (
    // prettier-ignore
    <TextureContext.Provider value={[selectedTexture, setSelectedTexture]}>
    <ToolContext.Provider value={[selectedTool, setSelectedTool]}>
    <CoordinatesContext.Provider value={[currentCoordinates, setCurrentCoordinates]}>


    <div className="App">
      <img
        className="App-selected-texture"
        src={selectedTexture.path}
        alt=""
      />
      <TextureBar />
      <ToolBar />
      <MapView width={100} height={100} cellSize={32} />
    </div>

    
    </CoordinatesContext.Provider>
    </ToolContext.Provider>
    </TextureContext.Provider>
  )
}

export default App
