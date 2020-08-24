import Tool, { ToolComponent, Drawing } from '../common/tool';
import icon from './line.svg';
import React, { useState, useEffect } from 'react';
import '../common/tool.css';
import { useTexture } from '../context/TextureContext';
import Texture from '../common/texture';
import { useCoordinates } from '../context/CoordinatesContext';
import { Cell } from '../common/mapMatrix';


const Line: ToolComponent = ({
  width,
  height,
  cellSize,
  onDrawMap,
  onDrawPreview
}) => {
  const [firstCoordinate, setFirstCoordinate] = useState<number[] | null>(null);

  const [selectedTexture] = useTexture();
  const [currentCoordinates] = useCoordinates();


  const handleMouseDown = () => {
    const [x, y] = currentCoordinates;

    setFirstCoordinate([x, y]);
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (firstCoordinate) {
      let [x0, y0] = firstCoordinate;
      let [x1, y1] = currentCoordinates;

      if (e.shiftKey) {
          x1 = x0 + Math.sign(x1-x0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
          y1 = y0 + Math.sign(y1-y0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
      }
      if (e.altKey) {
          x0 = x0 + x0-x1;
          y0 = y0 + y0-y1;
      }

      onDrawMap(drawLine(x0, y0, x1, y1, { texture: selectedTexture as Texture }));

      setFirstCoordinate(null);
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (firstCoordinate) {
      let [x0, y0] = firstCoordinate;
      let [x1, y1] = currentCoordinates;

      if (e.shiftKey) {
          x1 = x0 + Math.sign(x1-x0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
          y1 = y0 + Math.sign(y1-y0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
      }
      if (e.altKey) {
          x0 = x0 + x0-x1;
          y0 = y0 + y0-y1;
      }

      onDrawPreview(drawLine(x0, y0, x1, y1, { texture: selectedTexture as Texture }));
    }
  };


  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (firstCoordinate) {
        let [x0, y0] = firstCoordinate;
        let [x1, y1] = currentCoordinates;
  
        if (e.shiftKey) {
            x1 = x0 + Math.sign(x1-x0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
            y1 = y0 + Math.sign(y1-y0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
        }
        if (e.altKey) {
            x0 = x0 + x0-x1;
            y0 = y0 + y0-y1;
        }
  
        onDrawPreview(drawLine(x0, y0, x1, y1, { texture: selectedTexture as Texture }));
      }
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('keyup', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('keyup', handleKey);
    }
  }, [firstCoordinate, onDrawPreview, selectedTexture, currentCoordinates]);


  return (
    <div
      className='Tool'
      style={{
        width: width * cellSize,
        height: height * cellSize
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
}

const line: Tool = {
  name: 'line',
  icon,
  Component: Line
}

export default line;


function drawLine(x0: number, y0: number, x1: number, y1: number, cell: Cell) {
  const drawing: Drawing = [];

  // Bresenham line drawing algorithm
  let DX = x1 - x0;
  let DY = y1 - y0;
  const swap = Math.abs(DX) < Math.abs(DY);

  if (swap) [DX, DY] = [DY, DX];

  const a = Math.abs(DY);
  const b = -Math.abs(DX);

  let x = x0;
  let y = y0;

  let d = 2 * a + b;

  let q = x0 > x1 ? -1 : 1;
  let s = y0 > y1 ? -1 : 1;

  drawing.push({ x, y, cell});
  for (let k = 0; k < -b; k++) {
    if (d > 0) {
      x = x + q;
      y = y + s;
      d = d + 2 * (a + b);
    }
    else {
      x = x + q;
      if (swap === true) {
        y = y + s;
        x = x - q;
      }
      d = d + 2 * a;
    }
    drawing.push({ x, y, cell});
  }
  drawing.push({ x: x1, y: y1, cell});

  return drawing;
}
