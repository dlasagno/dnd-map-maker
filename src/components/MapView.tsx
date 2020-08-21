import React, { useState } from 'react';
import { useTexture, TextureValue } from '../context/TextureContext';
import { useTool, ToolValue } from '../context/ToolContext';
import { useCoordinates, CoordinateValue } from '../context/CoordinatesContext';
import './MapView.css'

import GridLayer from './GridLayer';
import MapLayer from './MapLayer';

import Texture from '../common/texture';

export interface Cell {
  texture?: Texture
}

export type MapMatrix = Array<Array<Cell>>;

interface Props {
  width: number,
  height: number,
  cellSize: number
}

const MapView: React.FC<Props> = (props) => {
  const [mapCells, setMapCells] = useState<MapMatrix>([]);
  const [previewCells, setPreviewCells] = useState<MapMatrix>([]);

  const [selectedTexture] = useTexture() as TextureValue;
  const [selectedTool] = useTool() as ToolValue;
  const [, setCurrentCoordinates] = useCoordinates() as CoordinateValue;

  const toolEventHandlers = selectedTool.getEventHandlers({ drawMap, drawPreview, clearPreview, cellSize: props.cellSize });

  function drawMap(x: number, y: number) {
    draw(setMapCells, x, y, { texture: selectedTexture });
  }

  function drawPreview(x: number, y: number) {
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
