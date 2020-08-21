import React, { useContext } from 'react';

export type ToolValue = [any, (texture: any) => void];

const ToolContext = React.createContext<ToolValue | string>('selectedTool');

export function useTool() {
  return useContext(ToolContext);
}

export default ToolContext;
