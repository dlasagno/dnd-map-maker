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
canvas.addEventListener('mousemove', function (e) {

    if (e.buttons == 1 && selectedMaterial != undefined)
        ctx.drawImage(selectedMaterial, Math.floor(e.offsetX / 32) * 32, Math.floor(e.offsetY / 32) * 32)
})

function drawGrid() {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(128, 128, 128, 255)'
    for (let x = 1; x < mapWidth; x++) {
        ctx.moveTo(x * gridSize, 0)
        ctx.lineTo(x * gridSize, mapHeight * gridSize)
        ctx.stroke()
    }

    for (let y = 1; y < mapHeight; y++) {
        ctx.moveTo(0, y * gridSize)
        ctx.lineTo(mapWidth * gridSize, y * gridSize)
        ctx.stroke()
    }
}
drawGrid()