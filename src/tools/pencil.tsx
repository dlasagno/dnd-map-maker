import Tool, { ToolComponent, Drawing } from '../common/tool';
import icon from './pencil.svg';
import React from 'react';
import '../common/tool.css';
import { useTexture } from '../context/TextureContext';
import Texture from '../common/texture';
import { useCoordinates } from '../context/CoordinatesContext';


const Pencil: ToolComponent = ({
  width,
  height,
  cellSize,
  onDrawMap,
  onDrawPreview
}) => {
  const [selectedTexture] = useTexture();
  const [currentCoordinates] = useCoordinates();


  const handleClick = () => {
    const drawing: Drawing = [];
    const [x, y] = currentCoordinates;

    drawing.push({x, y, cell: {texture: selectedTexture as Texture} })
    
    onDrawMap(drawing);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const [x, y] = currentCoordinates;

    onDrawPreview([{ x, y, cell: { texture: selectedTexture as Texture }}]);

    if ((e as React.MouseEvent).buttons === 1)
      onDrawMap([{ x, y, cell: { texture: selectedTexture as Texture }}]);
  };
  
  const handleMouseOut = () => {
    onDrawPreview([]);
  };


  return (
    <div
      className='Tool'
      style={{
        width: width * cellSize,
        height: height * cellSize
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    />
  );
}

const pencil: Tool = {
  name: 'pencil',
  icon,
  Component: Pencil
};

export default pencil;
