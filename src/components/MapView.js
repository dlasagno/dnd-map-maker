import React from 'react';
import './MapView.css'
import MapGrid from './MapGrid';

function MapView(props) {
  return (
    <div className="MapView">
      <MapGrid width={props.width} height={props.height} cellSize={props.cellSize} />
    </div>
  );
}

export default MapView;
