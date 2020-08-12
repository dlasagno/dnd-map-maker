import React, { useContext } from 'react';

const ToolContext = React.createContext('selectedTool');

export function useTool() {
  return useContext(ToolContext);
}

export default ToolContext;
