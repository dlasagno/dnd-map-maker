import React, { useLayoutEffect, useRef } from 'react'
import './MapLayer.css'

type Props = {
  width: number
  height: number
  cellSize: number
  gridColor?: string
}

const GridLayer: React.FC<Props> = ({
  width,
  height,
  cellSize,
  gridColor = 'rgba(255, 255, 255, 0.35)',
}) => {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {
    if (gridCanvasRef.current === null) return

    const ctx = gridCanvasRef.current.getContext('2d')

    if (ctx !== null) {
      ctx.lineWidth = 1
      ctx.strokeStyle = gridColor

      ctx.clearRect(
        0,
        0,
        gridCanvasRef.current.width,
        gridCanvasRef.current.height,
      )
      ctx.beginPath()
      for (let x = 1; x < width; x += 1) {
        ctx.moveTo(x * cellSize + 0.5, 0)
        ctx.lineTo(x * cellSize + 0.5, gridCanvasRef.current.height)
      }
      for (let y = 1; y < height; y += 1) {
        ctx.moveTo(0, y * cellSize + 0.5)
        ctx.lineTo(gridCanvasRef.current.width, y * cellSize + 0.5)
      }
      ctx.stroke()
    }
  })

  return (
    <canvas
      className="MapLayer"
      ref={gridCanvasRef}
      width={width * cellSize}
      height={height * cellSize}
    />
  )
}

export default React.memo(GridLayer)
