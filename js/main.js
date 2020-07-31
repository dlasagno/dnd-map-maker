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


const mapManager = new MapManager(cellSize, mapWidth, mapHeight)
document.getElementById('map-view').appendChild(mapManager.element)
mapManager.element.addEventListener('click', e => {
    if (selectedTexture)
        mapManager.setCell(...toCellCoordinates(e.offsetX, e.offsetY), {texture: selectedTexture})
        
})
mapManager.element.addEventListener('mousemove', e => {
    const [x, y] = toCellCoordinates(e.offsetX, e.offsetY)
    document.getElementById('x-coordinate').innerText = x
    document.getElementById('y-coordinate').innerText = y

    if (e.buttons == 1 && selectedTexture)
        mapManager.setCell(...toCellCoordinates(e.offsetX, e.offsetY), {texture: selectedTexture})
})

function toCellCoordinates(x, y) {
    return [Math.floor(x/cellSize), Math.floor(y/cellSize)]
}
