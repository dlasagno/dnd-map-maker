import Tool, { ToolComponent, Drawing } from '../common/tool';
import icon from './square.svg';
import React, { useState, useEffect } from 'react';
import '../common/tool.css';
import { useTexture } from '../context/TextureContext';
import Texture from '../common/texture';
import { useCoordinates } from '../context/CoordinatesContext';
import { Cell } from '../common/mapMatrix';


const Rectangle: ToolComponent = ({
  width,
  height,
  cellSize,
  onDrawMap,
  onDrawPreview
}) => {
  const [firstCoordinate, setFirstCoordinate] = useState<number[] | null>(null);
  
  const [selectedTexture] = useTexture();
  const [currentCoordinates] = useCoordinates();


  const handleMouseDown: React.EventHandler<React.MouseEvent<HTMLDivElement>> = () => {
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

      onDrawMap(drawRectangle(x0, y0, x1, y1, { texture: selectedTexture as Texture }));

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

      onDrawPreview(drawRectangle(x0, y0, x1, y1, { texture: selectedTexture as Texture }));
    }
  };
  
  const handleMouseOut = () => {
    setFirstCoordinate(null);
    onDrawPreview([]);
  }


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
  
        onDrawPreview(drawRectangle(x0, y0, x1, y1, { texture: selectedTexture as Texture }));
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
        height: height * cellSize,
        width: width * cellSize
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    />
  );
}

const rectangle: Tool = {
  name: 'rectangle',
  icon,
  Component: Rectangle
};

export default rectangle;


function drawRectangle(x0: number, y0: number, x1: number, y1: number, cell: Cell) {
  const drawing: Drawing = [];

  for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
    drawing.push({ x, y: y0, cell});
    drawing.push({ x, y: y1, cell});
  }
  for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
    drawing.push({ x: x0, y, cell});
    drawing.push({ x: x1, y, cell});
  }

  return drawing;
}
