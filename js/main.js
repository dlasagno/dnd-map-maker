const mapWidth = 20
const mapHeight = 20
const cellSize = 32

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const textures = ['stone', 'dirt'].reduce((src, name) => {
    src[name] = {path: `./assets/textures/${name}.png`}
    return src;
}, {})
const selector = document.getElementById('selector')
let selectedMaterial
let selectedTexture
const images = []
for (const [name, {path}] of Object.entries(textures)) {
    const s = document.createElement('img')
    s.src = path
    s.addEventListener('click', function () {
        selectedMaterial = this
        selectedTexture = name
    })
    selector.appendChild(s)
    textures[name].element = s
    images.push(s)
}


canvas.width = mapWidth * cellSize
canvas.height = mapHeight * cellSize
const mapManager = new MapManager(ctx, textures, cellSize, mapWidth, mapHeight)

canvas.addEventListener('click', e => {
    if (selectedMaterial)
        mapManager.setCell(Math.floor(e.offsetX/cellSize), Math.floor(e.offsetY/cellSize), {textureName: selectedTexture})
        
})
canvas.addEventListener('mousemove', e => {
    if (e.buttons == 1 && selectedMaterial)
        mapManager.setCell(Math.floor(e.offsetX/cellSize), Math.floor(e.offsetY/cellSize), {textureName: selectedTexture})
})
