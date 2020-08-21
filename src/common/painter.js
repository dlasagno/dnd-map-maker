class Painter {

  constructor(cells, cellSize) {
    this.cells = cells;
    this.cellSize = cellSize;
  }

  getCell(x, y) {
    if (this.cells[x] && this.cells[x][y]) {
      return this.cells[x][y];
    }
    return undefined;
  }

  paintAt(x, y, cell) {
    
  }

}

export default Painter;
