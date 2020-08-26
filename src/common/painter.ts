import { Cell } from './mapMatrix'
import { Drawing } from './tool'

class Painter {
  cell: Cell
  private cursor: number[]
  private internalDrawing: Drawing

  constructor(cell: Cell, x = 0, y = 0) {
    this.cell = cell
    this.cursor = [x, y]
    this.internalDrawing = []
  }

  get drawing(): Drawing {
    return this.internalDrawing
  }

  moveTo(x: number, y: number): Painter {
    this.cursor = [x, y]

    return this
  }

  lineTo(x: number, y: number): Painter {
    const [x0, y0] = this.cursor

    this.drawLine(x0, y0, x, y)
    this.moveTo(x, y)

    return this
  }

  drawLine(x0: number, y0: number, x1: number, y1: number): Painter {
    // Bresenham line drawing algorithm
    let DX = x1 - x0
    let DY = y1 - y0
    const swap = Math.abs(DX) < Math.abs(DY)

    if (swap) [DX, DY] = [DY, DX]

    const a = Math.abs(DY)
    const b = -Math.abs(DX)

    let x = x0
    let y = y0

    let d = 2 * a + b

    const q = x0 > x1 ? -1 : 1
    const s = y0 > y1 ? -1 : 1

    this.internalDrawing.push({ x, y, cell: this.cell })
    for (let k = 0; k < -b; k += 1) {
      if (d > 0) {
        x += q
        y += s
        d += 2 * (a + b)
      } else {
        x += q
        if (swap === true) {
          y += s
          x -= q
        }
        d += 2 * a
      }
      this.internalDrawing.push({ x, y, cell: this.cell })
    }
    this.internalDrawing.push({ x: x1, y: y1, cell: this.cell })

    return this
  }
}

export default Painter
