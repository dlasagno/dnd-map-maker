import { Cell } from "./mapMatrix";
import { Drawing } from "./tool";


class Painter {

  cell: Cell;
  private cursor: number[];
  private _drawing: Drawing;

  constructor(cell: Cell, x: number = 0, y: number = 0) {
    this.cell = cell;
    this.cursor = [x, y];
    this._drawing = [];
  }

  get drawing() {
    return this._drawing;
  }

  moveTo(x: number, y: number) {
    this.cursor = [x, y];
    
    return this;
  }

  lineTo(x: number, y: number) {
    const [x0, y0] = this.cursor;

    this.drawLine(x0, y0, x, y);
    this.moveTo(x, y);

    return this;
  }

  drawLine(x0: number, y0: number, x1: number, y1: number) {
    // Bresenham line drawing algorithm
    let DX = x1 - x0;
    let DY = y1 - y0;
    const swap = Math.abs(DX) < Math.abs(DY);
  
    if (swap) [DX, DY] = [DY, DX];
  
    const a = Math.abs(DY);
    const b = -Math.abs(DX);
  
    let x = x0;
    let y = y0;
  
    let d = 2 * a + b;
  
    let q = x0 > x1 ? -1 : 1;
    let s = y0 > y1 ? -1 : 1;
  
    this._drawing.push({ x, y, cell: this.cell});
    for (let k = 0; k < -b; k++) {
      if (d > 0) {
        x = x + q;
        y = y + s;
        d = d + 2 * (a + b);
      }
      else {
        x = x + q;
        if (swap === true) {
          y = y + s;
          x = x - q;
        }
        d = d + 2 * a;
      }
      this._drawing.push({ x, y, cell: this.cell});
    }
    this._drawing.push({ x: x1, y: y1, cell: this.cell});
  
    return this;
  }

}

export default Painter;
