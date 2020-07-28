class Cell {
  constructor(textureName) {
    this.textureName = textureName
  }
}

class MapManager {

  constructor(ctx, textures, cellSize, mapWidth, mapHeight) {
    this.ctx = ctx
    this.textures = textures
    this.cellSize = cellSize
    this.mapWidth = mapWidth
    this.mapHeight = mapHeight

    this.cells = []

    this._drawGrid()
  }


  get _mapWidthTotal() {
    return this.mapWidth * this.cellSize
  }

  get _mapHeightTotal() {
    return this.mapHeight * this.cellSize
  }


  setCell(x, y, {textureName} = {}) {
    console.log('hey')
    if (!this.isCellDefined(x, y))
      this._defineCell(x, y)

    if (textureName)
      this.cells[x][y].textureName = textureName

    this._drawCell(x, y)
    this._drawGrid()
  }

  isCellDefined(x, y) {
    return this.cells[x] != undefined && this.cells[x][y] instanceof Cell
  }


  _defineCell(x, y) {
    if (this.cells[x] == undefined)
      this.cells[x] = []
    if (this.cells[x][y] == undefined)
      this.cells[x][y] = new Cell()
  }

  _drawCell(x, y) {
    if(this.isCellDefined && this.cells[x][y].textureName)
      this.ctx.drawImage(this.textures[this.cells[x][y].textureName].element, x * this.cellSize, y * this.cellSize)
  }

  _drawGrid() {
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'

    this.ctx.beginPath()
    for (let x = 1; x < this.mapWidth; x++) {
        this.ctx.moveTo(x*this.cellSize + 0.5, 0)
        this.ctx.lineTo(x*this.cellSize + 0.5, this._mapHeightTotal)
    }
    for (let y = 1; y < mapHeight; y++) {
        this.ctx.moveTo(0, y*this.cellSize + 0.5)
        this.ctx.lineTo(this._mapWidthTotal, y*this.cellSize + 0.5)
    }
    this.ctx.stroke()
  }

}
