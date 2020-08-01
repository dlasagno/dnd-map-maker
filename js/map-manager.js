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

  constructor(cellSize, mapWidth, mapHeight) {
    this.cellSize = cellSize
    this.mapWidth = mapWidth
    this.mapHeight = mapHeight

    this._cells = []
    
    this._containerElement = document.createElement('div')
    this._containerElement.classList.add('canvas-container')
    this._containerElement.style.width = `${this._mapWidthTotal}px`
    this._containerElement.style.height = `${this._mapHeightTotal}px`
    
    this._mapLayer = document.createElement('canvas')
    this._mapLayer.width = this._mapWidthTotal
    this._mapLayer.height = this._mapHeightTotal
    this._containerElement.appendChild(this._mapLayer)
    
    this._previewLayer = document.createElement('canvas')
    this._previewLayer.width = this._mapWidthTotal
    this._previewLayer.height = this._mapHeightTotal
    this._containerElement.appendChild(this._previewLayer)
    
    this._gridLayer = document.createElement('canvas')
    this._gridLayer.width = this._mapWidthTotal
    this._gridLayer.height = this._mapHeightTotal
    this._containerElement.appendChild(this._gridLayer)
    this._drawGrid()
  }

  get element() {
    return this._containerElement
  }


  get _mapWidthTotal() {
    return this.mapWidth * this.cellSize
  }

  get _mapHeightTotal() {
    return this.mapHeight * this.cellSize
  }


  setCell(x, y, {texture} = {}) {
    if (!this.areCoordinatesInside(x, y)) return

    if (!this.isCellDefined(x, y))
      this._defineCell(x, y)

    if (texture)
      this._cells[x][y].texture = texture

    this._drawCell(x, y)
  }

  previewCell(x, y, {texture} = {}) {
    if (this.areCoordinatesInside(x, y) && texture)
      this._previewLayer.getContext('2d').drawImage(texture.image, x * this.cellSize, y * this.cellSize)
  }

  isCellDefined(x, y) {
    return this._cells[x] != undefined && this._cells[x][y] instanceof Cell
  }

  clearPreview() {
    this._previewLayer.getContext('2d').clearRect(0, 0, this._mapWidthTotal, this._mapHeightTotal)
  }

  areCoordinatesInside(x, y) {
    return 0 <= x && x < this.mapWidth && 0 <= y && y < this.mapHeight
  }


  _defineCell(x, y) {
    if (this._cells[x] == undefined)
      this._cells[x] = []
    if (this._cells[x][y] == undefined)
      this._cells[x][y] = new Cell()
  }

  _drawCell(x, y) {
    if(this.isCellDefined && this._cells[x][y].texture)
      this._mapLayer.getContext('2d').drawImage(this._cells[x][y].texture.image, x * this.cellSize, y * this.cellSize)
  }

  _drawGrid(color = 'rgba(255, 255, 255, 0.35)') {
    const ctx = this._gridLayer.getContext('2d')
    ctx.lineWidth = 1
    ctx.strokeStyle = color

    ctx.clearRect(0, 0, this._mapWidthTotal, this._mapHeightTotal)
    ctx.beginPath()
    for (let x = 1; x < this.mapWidth; x++) {
        ctx.moveTo(x*this.cellSize + 0.5, 0)
        ctx.lineTo(x*this.cellSize + 0.5, this._mapHeightTotal)
    }
    for (let y = 1; y < mapHeight; y++) {
        ctx.moveTo(0, y*this.cellSize + 0.5)
        ctx.lineTo(this._mapWidthTotal, y*this.cellSize + 0.5)
    }
    ctx.stroke()
  }

}
