import React, { useEffect } from 'react'
import './ToolSelector.css'
import { useTool, ToolValue } from '../context/ToolContext'

import tools from '../tools'

const ToolSelector: React.FC = () => {
  const [selectedTool, setSelectedTool] = useTool() as ToolValue

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let tool
      switch (e.key) {
        case 'p':
          tool = tools.find(({ name }) => name === 'pencil')
          break
        case 'b':
          tool = tools.find(({ name }) => name === 'bucket')
          break
        case 'r':
          tool = tools.find(({ name }) => name === 'rectangle')
          break
        case 'e':
          tool = tools.find(({ name }) => name === 'ellipse')
          break
        case 'l':
          tool = tools.find(({ name }) => name === 'line')
          break
        default:
          tool = undefined
      }
      if (tool) setSelectedTool(tool)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [setSelectedTool])

  return (
    <div className="ToolSelector">
      {tools.map((tool) => (
        <button
          key={tool.name}
          className={`tool-icon ${selectedTool === tool ? 'active' : ''}`}
          type="button"
          onClick={() => setSelectedTool(tool)}
        >
          <img className="tool-icon" src={tool.icon} alt="" />
        </button>
      ))}
    </div>
  )
}

export default ToolSelector
