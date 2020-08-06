import React, { useState } from 'react';
import { useTexture } from '../App';
import './MapView.css'

import GridLayer from './MapGrid';
import MapLayer from './MapLayer';

function MapView(props) {
  const [mapCells, setMapCells] = useState([]);
  const [previewCells, setPreviewCells] = useState([]);

  const selectedTexture = useTexture();

  function handleClick(e) {
    const x = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x) / props.cellSize);
    const y = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y) / props.cellSize);

    drawMap(x, y, { texture: selectedTexture });
  }

  function drawMap(x, y, { texture }) {
    draw(setMapCells, x, y, { texture });
  }

  function drawPreview(x, y, { texture }) {
    draw(setPreviewCells, x, y, { texture });
  }

  function clearPreview() {
    setPreviewCells([]);
  }

  return (
    <div
      className="MapView"
      onClick={handleClick}
      onMouseOut={clearPreview}
      onMouseMove={e => {
        const x = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x) / props.cellSize);
        const y = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y) / props.cellSize);

        if (e.buttons === 1)
          drawMap(x, y, { texture: selectedTexture });
        else {
          clearPreview();
          drawPreview(x, y, { texture: selectedTexture });
        }
      }
    }>
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
