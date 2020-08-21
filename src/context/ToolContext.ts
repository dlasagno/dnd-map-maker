import React, { useContext } from 'react';
import Tool from '../tools/tool';

export type ToolValue = [Tool, (tool: Tool) => void];

const ToolContext = React.createContext<ToolValue | string>('selectedTool');

export function useTool() {
  return useContext(ToolContext);
}

export default ToolContext;
