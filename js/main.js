const mapWidth = 20
const mapHeight = 20
const cellSize = 32

const textures = new Map(['stone', 'dirt', 'water', 'wood', 'bricks', 'grass'].map(name => [name, new Texture(name)]))


const selector = document.getElementById('quick-textures')
let selectedTexture = textures.get('stone')
document.getElementById('selected-texture').src = selectedTexture.path
const images = []
for (const texture of textures.values()) {
    const s = document.createElement('img')
    s.src = texture.path
    s.addEventListener('click', function () {
        selectedTexture = texture
        document.getElementById('selected-texture').src = texture.path
    })
    selector.appendChild(s)
    images.push(s)
}



const tools = []
const pencil = new Tool('Pencil', './assets/icons/pencil.svg')
pencil.listenTo('click', e => {
    if (selectedTexture)
    mapManager.setCell(...toCellCoordinates(e.offsetX, e.offsetY), {texture: selectedTexture}) 
})
pencil.listenTo('mousemove', e => {
    if (e.buttons == 1 && selectedTexture)
    mapManager.setCell(...toCellCoordinates(e.offsetX, e.offsetY), {texture: selectedTexture})
})
tools.push(pencil)
const rectangle = new Tool('Rectangle', './assets/icons/square.svg')
rectangle.listenTo('click', e => {
    if (selectedTexture) {
        if (!rectangle.firstCoordinate) {
            rectangle.firstCoordinate = toCellCoordinates(e.offsetX, e.offsetY)
        }
        else {
            let [x0, y0] = rectangle.firstCoordinate
            let [x1, y1] = toCellCoordinates(e.offsetX, e.offsetY)
            if (e.shiftKey) {
                x1 = x0 + Math.sign(x1-x0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0))
                y1 = y0 + Math.sign(y1-y0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0))
            }
            if (e.altKey) {
                x0 = x0 + x0-x1
                y0 = y0 + y0-y1
            }


            for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
                mapManager.setCell(x, y0, {texture: selectedTexture})
                mapManager.setCell(x, y1, {texture: selectedTexture})
            }
            for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
                mapManager.setCell(x0, y, {texture: selectedTexture})
                mapManager.setCell(x1, y, {texture: selectedTexture})
            }

            delete rectangle.firstCoordinate
        }
    }
})
tools.push(rectangle)
let selectedTool = pencil

const toolSelector = document.getElementById('tool-selector')
for (const tool of tools) {
    const icon = document.createElement('img')
    icon.src = tool.icon
    icon.addEventListener('click', function () {
        selectedTool = tool
    })
    toolSelector.appendChild(icon)
}


const mapManager = new MapManager(cellSize, mapWidth, mapHeight)
document.getElementById('map-view').appendChild(mapManager.element)
mapManager.element.addEventListener('click', e => {
    selectedTool.on(e)
})
mapManager.element.addEventListener('mousemove', e => {
    const [x, y] = toCellCoordinates(e.offsetX, e.offsetY)
    document.getElementById('x-coordinate').innerText = x
    document.getElementById('y-coordinate').innerText = y
    
    selectedTool.on(e)
})


function toCellCoordinates(x, y) {
    return [Math.floor(x/cellSize), Math.floor(y/cellSize)]
}
