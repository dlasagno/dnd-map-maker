import React, { useEffect, useRef } from 'react';
import './MapLayer.css';

function MapLayer(props) {
  const layerCanvasRef = useRef(null);

  useEffect(() => {
    const ctx = layerCanvasRef.current.getContext('2d');

    ctx.clearRect(0, 0, layerCanvasRef.current.width, layerCanvasRef.current.height);
    for (const [x, row] of props.cells.entries()) {
      if (x < props.width && row) {
        for (const [y, cell] of row.entries()) {
          if (y < props.height && cell && cell.texture) {
            ctx.drawImage(cell.texture.image, x*props.cellSize, y*props.cellSize);
          }
        }
      }
    }
  })

  return (
    <canvas className='MapLayer' ref={layerCanvasRef} width={props.width*props.cellSize} height={props.height*props.cellSize} />
  );
}

export default MapLayer;
