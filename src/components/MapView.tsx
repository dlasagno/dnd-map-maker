import React, { useState } from 'react';
import { useTool, ToolValue } from '../context/ToolContext';
import { useCoordinates, CoordinateValue } from '../context/CoordinatesContext';
import './MapView.css'

import GridLayer from './GridLayer';
import MapLayer from './MapLayer';

import MapMatrix, { Cell } from '../common/mapMatrix';
import { Drawing } from '../common/tool';


type Props = {
  width: number,
  height: number,
  cellSize: number
}

const MapView: React.FC<Props> = (props) => {
  const [mapCells, setMapCells] = useState<MapMatrix>([]);
  const [previewCells, setPreviewCells] = useState<MapMatrix>([]);

  const [selectedTool] = useTool() as ToolValue;
  const [, setCurrentCoordinates] = useCoordinates() as CoordinateValue;


  const clearPreview =() => {
    setPreviewCells([]);
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x + e.currentTarget.scrollLeft) / props.cellSize);
    const y = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y + e.currentTarget.scrollTop) / props.cellSize);
    
    setCurrentCoordinates([x, y]);
  }

  const handleDrawMap = (drawing: Drawing) => {
    for (const {x, y, cell} of drawing) {
      if (x < props.width && y < props.height) {
        draw(setMapCells, x, y, cell);
      }
    }
  };

  const handleDrawPreview = (drawing: Drawing) => {
    clearPreview();
    for (const {x, y, cell} of drawing) {
      if (x < props.width && y < props.height) {
        draw(setPreviewCells, x, y, cell);
      }
    }
  };


  return (
    <div
      className="MapView"
      onMouseMove={handleMouseMove}
    >
      <MapLayer width={props.width} height={props.height} cellSize={props.cellSize} cells={mapCells} />
      <MapLayer width={props.width} height={props.height} cellSize={props.cellSize} cells={previewCells} />
      <GridLayer width={props.width} height={props.height} cellSize={props.cellSize} />

      <selectedTool.Component width={props.width} height={props.height} cellSize={props.cellSize} cells={mapCells}
        onDrawMap={handleDrawMap}
        onDrawPreview={handleDrawPreview}
      />
    </div>
  );
}

export default MapView;


function draw(setCells: React.Dispatch<React.SetStateAction<MapMatrix>>, x: number, y: number, { texture }: Cell) {
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
