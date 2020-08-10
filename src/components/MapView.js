import React, { useState } from 'react';
import { useTexture, useTool } from '../App';
import './MapView.css'

import GridLayer from './GridLayer';
import MapLayer from './MapLayer';

function MapView(props) {
  const [mapCells, setMapCells] = useState([]);
  const [previewCells, setPreviewCells] = useState([]);

  const [selectedTexture] = useTexture();
  const [selectedTool] = useTool();

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
        maxHeight: '100%'
        //overflow: 'auto'
      }}
      {...selectedTool.getEventHandlers({ drawMap, drawPreview, clearPreview, cellSize: props.cellSize })}
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
