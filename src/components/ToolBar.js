import React from 'react';
import './ToolBar.css';
import { useCoordinates } from '../context/CoordinatesContext'
import ToolSelector from './ToolSelector';

function ToolBar() {
  const [[x, y]] = useCoordinates();

  return (
    <div className="ToolBar">
      <ToolSelector />
      <div id="x-coordinate">{x}</div>
      <div id="y-coordinate">{y}</div>
    </div>
  );
}

export default ToolBar;
