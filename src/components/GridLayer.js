import React, { useEffect, useRef } from 'react';
import './MapLayer.css';

function GridLayer(props) {
  const gridCanvasRef = useRef(null);

  useEffect(() => {
    const ctx = gridCanvasRef.current.getContext('2d');
    ctx.lineWidth = 1;
    ctx.strokeStyle = props.gridColor ? props.gridColor : 'rgba(255, 255, 255, 0.35)';

    ctx.clearRect(0, 0, gridCanvasRef.current.width, gridCanvasRef.current.height);
    ctx.beginPath();
    for (let x = 1; x < props.width; x++) {
        ctx.moveTo(x*props.cellSize + 0.5, 0)
        ctx.lineTo(x*props.cellSize + 0.5, gridCanvasRef.current.height)
    }
    for (let y = 1; y < props.height; y++) {
        ctx.moveTo(0, y*props.cellSize + 0.5)
        ctx.lineTo(gridCanvasRef.current.width, y*props.cellSize + 0.5)
    }
    ctx.stroke()
  });

  return (
    <canvas className='MapLayer' ref={gridCanvasRef} width={props.width*props.cellSize} height={props.height*props.cellSize} />
  );
}

export default React.memo(GridLayer);
