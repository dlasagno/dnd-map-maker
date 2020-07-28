const mapWidth = 20
const mapHeight = 20
const gridSize = 32

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


canvas.width = mapWidth * gridSize
canvas.height = mapHeight * gridSize
canvas.addEventListener('click', e => {
    if (selectedMaterial)
        drawCell(selectedMaterial, Math.floor(e.offsetX/gridSize), Math.floor(e.offsetY/gridSize))
})
canvas.addEventListener('mousemove', e => {
    if (e.buttons == 1 && selectedMaterial)
        drawCell(selectedMaterial, Math.floor(e.offsetX/gridSize), Math.floor(e.offsetY/gridSize))
})

drawGrid()

function drawGrid() {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'

    ctx.beginPath()
    for (let x = 1; x < mapWidth; x++) {
        ctx.moveTo(x*gridSize + 0.5, 0)
        ctx.lineTo(x*gridSize + 0.5, mapHeight * gridSize)
    }
    for (let y = 1; y < mapHeight; y++) {
        ctx.moveTo(0, y*gridSize + 0.5)
        ctx.lineTo(mapWidth * gridSize, y*gridSize + 0.5)
    }
    ctx.stroke()
}

function drawCell(image, x, y) {
    ctx.drawImage(image, x * gridSize, y * gridSize)
}
