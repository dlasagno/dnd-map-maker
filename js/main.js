const mapWidth = 20
const mapHeight = 20
const cellSize = 32

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


const textures = new Map(['stone', 'dirt', 'water', 'wood', 'bricks', 'grass'].map(name => [name, new Texture(name)]))

const selector = document.getElementById('selector')
let selectedTexture
const images = []
for (const texture of textures.values()) {
    const s = document.createElement('img')
    s.src = texture.path
    s.addEventListener('click', function () {
        selectedTexture = texture
    })
    selector.appendChild(s)
    images.push(s)
}


canvas.width = mapWidth * cellSize
canvas.height = mapHeight * cellSize
const mapManager = new MapManager(ctx, cellSize, mapWidth, mapHeight)

canvas.addEventListener('click', e => {
    if (selectedTexture)
        mapManager.setCell(Math.floor(e.offsetX/cellSize), Math.floor(e.offsetY/cellSize), {texture: selectedTexture})
        
})
canvas.addEventListener('mousemove', e => {
    if (e.buttons == 1 && selectedTexture)
        mapManager.setCell(Math.floor(e.offsetX/cellSize), Math.floor(e.offsetY/cellSize), {texture: selectedTexture})
})
