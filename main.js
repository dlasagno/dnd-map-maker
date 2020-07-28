var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var src = ['./stone.png', './dirt.png']
var selector = document.getElementById('selector')
var selectedMaterial
var images = []
for (var f of src) {
    var s = document.createElement('img')
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
var w = canvas.offsetWidth
var h = canvas.offsetHeight
var gridSize = 32

function drawGrid() {
    var linesX = w / gridSize
    var linesY = h / gridSize
    ctx.lineWidth = 1
    ctx.strokeStyle = '#aeaeae'
    for (var x = 0; x < linesX; x++) {
        ctx.moveTo(x * gridSize, 0);
        ctx.lineTo(x * gridSize, h);
        ctx.stroke();
    }

    for (var y = 0; y < linesY; y++) {
        ctx.moveTo(0, y * gridSize);
        ctx.lineTo(w, y * gridSize);
        ctx.stroke();
    }
}
drawGrid()