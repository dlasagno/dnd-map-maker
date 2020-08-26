import React from 'react'
import './ToolSelector.css'
import { useTool, ToolValue } from '../context/ToolContext'

import tools from '../tools'

const ToolSelector: React.FC = () => {
  const [selectedTool, setSelectedTool] = useTool() as ToolValue

  return (
    <div className="ToolSelector">
      {tools.map((tool) => (
        <button
          className={`tool-icon ${selectedTool === tool ? 'active' : ''}`}
          type="button"
          onClick={() => setSelectedTool(tool)}
        >
          <img key={tool.name} className="tool-icon" src={tool.icon} alt="" />
        </button>
      ))}
    </div>
  )
}

export default ToolSelector
