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


canvas.addEventListener('mousemove', function (e) {

    if (e.buttons == 1 && selectedMaterial != null)
        ctx.drawImage(selectedMaterial, Math.floor(e.offsetX / 32) * 32, Math.floor(e.offsetY / 32) * 32)
})
const w = canvas.offsetWidth
const h = canvas.offsetHeight
const gridSize = 32

function drawGrid() {
    const linesX = w / gridSize
    const linesY = h / gridSize
    ctx.lineWidth = 1
    ctx.strokeStyle = '#aeaeae'
    for (let x = 0; x < linesX; x++) {
        ctx.moveTo(x * gridSize, 0)
        ctx.lineTo(x * gridSize, h)
        ctx.stroke()
    }

    for (let y = 0; y < linesY; y++) {
        ctx.moveTo(0, y * gridSize)
        ctx.lineTo(w, y * gridSize)
        ctx.stroke()
    }
}
drawGrid()