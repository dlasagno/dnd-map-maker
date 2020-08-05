import React, { useState } from 'react';
import './MapView.css'
import GridLayer from './MapGrid';
import MapLayer from './MapLayer';

import textures from '../textures'

function MapView(props) {
  let [cells, setCells] = useState([]);

  function handleClick(e) {
    const x = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x) / props.cellSize);
      const y = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y) / props.cellSize);

      if (!cells[x])
        cells[x] = [];
      if (!cells[x][y])
        cells[x][y] = {};
      
      setCells(cells.map((row, i) => i !== x ? row :
        row.map((cell, j) => j !== y ? cell :
          { ...cell, texture: textures[0]})));
  }

  return (
    <div className="MapView" onClick={handleClick} onMouseMove={e => {
      if (e.buttons === 1)
        handleClick(e);
    }}>
      <MapLayer width={props.width} height={props.height} cellSize={props.cellSize} cells={cells} />
      <GridLayer width={props.width} height={props.height} cellSize={props.cellSize} />
    </div>
  );
}

export default MapView;
