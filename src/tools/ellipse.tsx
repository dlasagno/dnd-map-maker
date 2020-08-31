import React from 'react'
import Tool, { ToolComponent } from '../common/tool'
import icon from './square.svg'
import Shape from './shape'
import { Cell } from '../common/mapMatrix'
import Painter from '../common/painter'

const Ellipse: ToolComponent = ({
  width,
  height,
  cellSize,
  cells,
  onDrawMap,
  onDrawPreview,
}) => {
  return (
    <Shape
      width={width}
      height={height}
      cellSize={cellSize}
      cells={cells}
      onDrawMap={onDrawMap}
      onDrawPreview={onDrawPreview}
      label="ellipse"
      drawShape={drawEllipse}
    />
  )
}

const ellipse: Tool = {
  name: 'ellipse',
  icon,
  Component: Ellipse,
}

export default ellipse

function drawEllipse(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  cell: Cell,
  offset = Math.PI / 2,
) {
  const x = (x0 + x1) / 2
  const y = (y0 + y1) / 2
  const r1 = Math.abs(x - x0)
  const r2 = Math.abs(y - y0)
  const numberOfLines = (r1 + r2) * 4

  const painter = new Painter(
    cell,
    Math.round(x + r1 * Math.cos(-offset)),
    Math.round(y + r2 * Math.sin(-offset)),
  )
  for (let i = 1; i <= numberOfLines; i += 1) {
    const angle = i * ((2 * Math.PI) / numberOfLines) - offset

    const a = Math.round(x + r1 * Math.cos(angle))
    const b = Math.round(y + r2 * Math.sin(angle))

    painter.lineTo(a, b)
  }

  return painter.drawing
}
