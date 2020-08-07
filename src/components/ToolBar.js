import React from 'react';
import './ToolBar.css';
import ToolSelector from './ToolSelector';

function ToolBar() {
  return (
    <div className="ToolBar">
      <ToolSelector />
      <div id="x-coordinate">14</div>
      <div id="y-coordinate">17</div>
    </div>
  );
}

export default ToolBar;
