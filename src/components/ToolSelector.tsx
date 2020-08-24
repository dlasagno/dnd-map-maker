import React from 'react';
import './ToolSelector.css';
import { useTool, ToolValue } from '../context/ToolContext';

import tools from '../tools';

const ToolSelector: React.FC = () => {
  const [selectedTool, setSelectedTool] = useTool() as ToolValue;

  return (
    <div className="ToolSelector">
      {tools.map(tool => (
        <img
          key={tool.name}
          className={'tool-icon' + (selectedTool === tool ? ' active' : '')}
          src={tool.icon}
          alt=""
          onClick={() => setSelectedTool(tool)}
        />
      ))}
    </div>
  );
}

export default ToolSelector;
