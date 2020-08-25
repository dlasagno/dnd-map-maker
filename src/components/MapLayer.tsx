import React, { useEffect, useRef } from 'react';
import './MapLayer.css';

import Texture from '../common/texture';
import MapMatrix from '../common/mapMatrix';

type Props = {
  width: number,
  height: number,
  cellSize: number,
  cells: MapMatrix
}

const MapLayer: React.FC<Props> = (props) => {
  const layerCanvasRef = useRef<HTMLCanvasElement>(null!);
  const previousCells = useRef<MapMatrix>([]);

  useEffect(() => {
    const ctx = layerCanvasRef.current.getContext('2d');
    
    if (ctx !== null) {
      if (props.cells.length > 0) {
        for (
          let x = 0; 
          x < Math.min(Math.max(props.cells.length, previousCells.current.length), props.width);
          x++
        ) {
          if (props.cells[x]) {
            for (
              let y = 0;
              y < Math.min(Math.max(props.cells[x].length, previousCells.current[x] ? previousCells.current[x].length : 0),
              props.height); y++
            ) {
              if (props.cells[x][y]?.texture) {
                if (!previousCells.current[x]?.[y] || props.cells[x][y] !== previousCells.current[x][y]) {
                  ctx.drawImage((props.cells[x][y].texture as Texture).image, x * props.cellSize, y * props.cellSize);
                }
              }
              else {
                ctx.clearRect(x * props.cellSize, y * props.cellSize, props.cellSize, props.cellSize);
              }
            }
          }
          else {
            ctx.clearRect(x * props.cellSize, 0, props.cellSize, props.height * props.cellSize);
          }
        }
      }
      else {
        ctx.clearRect(0, 0, layerCanvasRef.current.width, layerCanvasRef.current.height);
      }
    }

    previousCells.current = props.cells
  }, [props.cells, props.width, props.height, props.cellSize]);

  useEffect(() => {
    const ctx = layerCanvasRef.current.getContext('2d');
    
    if (ctx !== null) {
      for (
        let x = 0; 
        x < Math.min(Math.max(props.cells.length, previousCells.current.length), props.width);
        x++
      ) {
        if (props.cells[x]) {
          for (
            let y = 0;
            y < Math.min(Math.max(props.cells[x].length, previousCells.current[x] ? previousCells.current[x].length : 0),
            props.height); y++
          ) {
            if (props.cells[x][y]?.texture) {
                ctx.drawImage((props.cells[x][y].texture as Texture).image, x * props.cellSize, y * props.cellSize);
            }
          }
        }
      }
    }

    previousCells.current = props.cells
  }, [props.width, props.height, props.cellSize]);
  
  return (
    <canvas className='MapLayer' ref={layerCanvasRef} width={props.width*props.cellSize} height={props.height*props.cellSize} />
  );
}

export default MapLayer;
