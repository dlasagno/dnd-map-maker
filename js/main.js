const mapWidth = 20
const mapHeight = 20
const cellSize = 32

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


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


canvas.width = mapWidth * cellSize
canvas.height = mapHeight * cellSize
const mapManager = new MapManager(ctx, cellSize, mapWidth, mapHeight)

canvas.addEventListener('click', e => {
    if (selectedTexture)
        mapManager.setCell(...toCellCoordinates(e.offsetX, e.offsetY), {texture: selectedTexture})
        
})
canvas.addEventListener('mousemove', e => {
    const [x, y] = toCellCoordinates(e.offsetX, e.offsetY)
    document.getElementById('x-coordinate').innerText = x
    document.getElementById('y-coordinate').innerText = y

    if (e.buttons == 1 && selectedTexture)
        mapManager.setCell(...toCellCoordinates(e.offsetX, e.offsetY), {texture: selectedTexture})
})

function toCellCoordinates(x, y) {
    return [Math.floor(x/cellSize), Math.floor(y/cellSize)]
}
