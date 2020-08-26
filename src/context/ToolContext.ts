import React, { useContext } from 'react'
import Tool from '../common/tool'

export type ToolValue = [Tool, (tool: Tool) => void]

const ToolContext = React.createContext<ToolValue | null>(null)

export function useTool(): ToolValue | null {
  return useContext(ToolContext)
}

export default ToolContext
