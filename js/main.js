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
const pencil = new Tool('Pencil', './assets/textures/bricks.png')
pencil.listenTo('click', e => {
    if (selectedTexture)
    mapManager.setCell(...toCellCoordinates(e.offsetX, e.offsetY), {texture: selectedTexture}) 
})
pencil.listenTo('mousemove', e => {
    if (e.buttons == 1 && selectedTexture)
    mapManager.setCell(...toCellCoordinates(e.offsetX, e.offsetY), {texture: selectedTexture})
})
tools.push(pencil)
let selectedTool = pencil

const toolSelector = document.getElementById('tool-selector')
for (const tool of tools) {
    const icon = document.createElement('img')
    icon.src = tool.icon
    icon.addEventListener('click', function () {
        selectedTool = tool
        document.getElementById('selected-texture').src = texture.path
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
