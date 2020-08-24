import MapMatrix, { Cell } from "./mapMatrix";


export type Drawing = {
  x: number,
  y: number,
  cell: Cell
}[];

export type ToolProps = {
  height: number,
  width: number,
  cellSize: number,
  cells: MapMatrix,
  onDrawMap: (drawnCells: Drawing) => void,
  onDrawPreview: (drawnCells: Drawing) => void
};

export type ToolComponent = React.FC<ToolProps>;


interface Tool {
  name: string,
  icon: string,
  Component: ToolComponent
}

export default Tool;
