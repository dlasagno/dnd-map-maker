import { MapMatrix, Cell } from "../components/MapView";

class Painter {

  constructor(readonly cells: MapMatrix, readonly cellSize: number) {
  }

  getCell(x: number, y: number) {
    if (this.cells[x] && this.cells[x][y]) {
      return this.cells[x][y];
    }
    return undefined;
  }

  paintAt(x: number, y: number, cell: Cell) {
    
  }

}

export default Painter;
