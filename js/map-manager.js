class Texture {
  constructor(name, path = `./assets/textures/${name}.png`) {
    this.name = name
    this.path = path
  }

  get image() {
    const img = document.createElement('img', {src: this.path})
    img.src = this.path
    return img
  }
}

class Cell {
  constructor(texture) {
    this.texture = texture
  }
}

class MapManager {

  constructor(ctx, cellSize, mapWidth, mapHeight) {
    this.ctx = ctx
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


  setCell(x, y, {texture} = {}) {
    if (!this.isCellDefined(x, y))
      this._defineCell(x, y)

    if (texture)
      this.cells[x][y].texture = texture

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
    if(this.isCellDefined && this.cells[x][y].texture)
      this.ctx.drawImage(this.cells[x][y].texture.image, x * this.cellSize, y * this.cellSize)
  }

  _drawGrid() {
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'

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
