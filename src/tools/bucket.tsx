import Tool, { ToolComponent, Drawing } from '../common/tool';
import icon from './bucket.svg';
import React from 'react';
import '../common/tool.css';
import { useTexture } from '../context/TextureContext';
import Texture from '../common/texture';
import { useCoordinates } from '../context/CoordinatesContext';


const Bucket: ToolComponent = ({
  width,
  height,
  cellSize,
  cells,
  onDrawMap,
  onDrawPreview
}) => {
  const [selectedTexture] = useTexture();
  const [currentCoordinates] = useCoordinates();


  const handleClick = () => {
    const drawing: Drawing = [];
    const [x0, y0] = currentCoordinates;
    const oldTexture = cells[x0]?.[y0]?.texture;

    function floodFill() {

    }
    const queue: number[][] = [];

    queue.push([x0, y0]);
    while (queue.length > 0) {
      const [x, y] = queue.pop();
      let xWest = x;
      let xEst = x;

      const yNorth = y > 0 ? y - 1 : -1;
      const ySouth = y < height - 1 ? y + 1 : -1;

      while (xEst < width - 1 && cells[xEst+1]?.[y]?.texture === oldTexture) xEst++;
      while (xWest > 0 && cells[xWest-1]?.[y]?.texture === oldTexture) xWest--;

      for (let x = xWest; x <= xEst; x++) {
        drawing.push({x, y, cell: {texture: selectedTexture as Texture} });
        if (yNorth >= 0 && cells[x]?.[yNorth]?.texture === oldTexture && drawing.every(({ x: X, y: Y }) => x !== X || yNorth !== Y)) queue.push([x, yNorth]);
        if (ySouth >= 0 && cells[x]?.[ySouth]?.texture === oldTexture && drawing.every(({ x: X, y: Y }) => x !== X || ySouth !== Y)) queue.push([x, ySouth]);
      }
    }



    // drawing.push({x, y, cell: {texture: selectedTexture as Texture} })
    
    onDrawMap(drawing);
  };


  return (
    <div
      className='Tool'
      style={{
        width: width * cellSize,
        height: height * cellSize
      }}
      onClick={handleClick}
    />
  );
}

const bucket: Tool = {
  name: 'bucket',
  icon,
  Component: Bucket
};

export default bucket;
