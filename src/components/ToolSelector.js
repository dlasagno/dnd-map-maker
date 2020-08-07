import React from 'react';
import './ToolSelector.css';
import { useTool } from '../App';

import tools from '../tools';

function ToolSelector(props) {
  const selectedTool = useTool();

  return (
    <div className="ToolSelector">
      {tools.map(tool => (
        <img
          key={tool.name}
          className={'tool-icon' + (selectedTool === tool ? ' active' : '')}
          src={tool.icon}
          alt=""
          onClick={() => props.onToolSelection(tool)}
        />
      ))}
    </div>
  );
}

export default ToolSelector;
