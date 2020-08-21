import React, { useContext } from 'react';

const ToolContext = React.createContext<[any, (texture: any) => void] | string>('selectedTool');

export function useTool() {
  return useContext(ToolContext);
}

export default ToolContext;
