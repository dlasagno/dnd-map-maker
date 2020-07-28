const mapWidth = 20
const mapHeight = 20
const cellSize = 32

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const src = ['stone', 'dirt'].map(src => `./assets/textures/${src}.png`)
const selector = document.getElementById('selector')
let selectedMaterial
const images = []
for (const f of src) {
    const s = document.createElement('img')
    s.src = f
    s.addEventListener('click', function () {
        selectedMaterial = this
    })
    selector.appendChild(s)
    images.push(s)

}


canvas.width = mapWidth * cellSize
canvas.height = mapHeight * cellSize
canvas.addEventListener('click', e => {
    if (selectedMaterial)
        drawCell(selectedMaterial, Math.floor(e.offsetX/cellSize), Math.floor(e.offsetY/cellSize))
})
canvas.addEventListener('mousemove', e => {
    if (e.buttons == 1 && selectedMaterial)
        drawCell(selectedMaterial, Math.floor(e.offsetX/cellSize), Math.floor(e.offsetY/cellSize))
})


new MapManager(ctx, cellSize, mapWidth, mapHeight)


function drawCell(image, x, y) {
    ctx.drawImage(image, x * cellSize, y * cellSize)
}
