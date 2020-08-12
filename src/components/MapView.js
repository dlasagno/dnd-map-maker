import React, { useState } from 'react';
import { useTexture } from '../context/TextureContext';
import { useTool } from '../context/ToolContext';
import { useCoordinates } from '../context/CoordinatesContext';
import './MapView.css'

import GridLayer from './GridLayer';
import MapLayer from './MapLayer';

function MapView(props) {
  const [mapCells, setMapCells] = useState([]);
  const [previewCells, setPreviewCells] = useState([]);

  const [selectedTexture] = useTexture();
  const [selectedTool] = useTool();
  const [, setCurrentCoordinates] = useCoordinates();

  const toolEventHandlers = selectedTool.getEventHandlers({ drawMap, drawPreview, clearPreview, cellSize: props.cellSize });

  function drawMap(x, y) {
    draw(setMapCells, x, y, { texture: selectedTexture });
  }

  function drawPreview(x, y) {
    draw(setPreviewCells, x, y, { texture: selectedTexture });
  }

  function clearPreview() {
    setPreviewCells([]);
  }

  return (
    <div
      className="MapView"
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'auto'
      }}
      {...toolEventHandlers}
      onMouseMove={e => {
        const x = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x + e.currentTarget.scrollLeft) / props.cellSize);
        const y = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y + e.currentTarget.scrollTop) / props.cellSize);
        
        setCurrentCoordinates([x, y]);

        if (toolEventHandlers.onMouseMove) toolEventHandlers.onMouseMove(e);
      }}
    >
      <MapLayer width={props.width} height={props.height} cellSize={props.cellSize} cells={mapCells} />
      <MapLayer width={props.width} height={props.height} cellSize={props.cellSize} cells={previewCells} />
      <GridLayer width={props.width} height={props.height} cellSize={props.cellSize} />
    </div>
  );
}

export default MapView;


function draw(setCells, x, y, { texture }) {
  setCells(cells => {
    if (!cells[x])
        cells[x] = [];
    if (!cells[x][y])
      cells[x][y] = {};
    
    return cells.map((row, i) => i !== x ? row :
      row.map((cell, j) => j !== y ? cell :
        { ...cell, texture}));
  });
}
