import React from 'react';
import './MapLayer.css';

function MapLayer(props) {
  return (
    <canvas width={props.width} height={props.height} />
  );
}

export default MapLayer;
