import React from 'react'
import Tool, { ToolComponent } from '../common/tool'
import icon from './square.svg'
import { Cell } from '../common/mapMatrix'
import Painter from '../common/painter'
import Shape from './shape'

const Rectangle: ToolComponent = ({
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
      label="rectangle"
      drawShape={drawRectangle}
    />
  )
}

const rectangle: Tool = {
  name: 'rectangle',
  icon,
  Component: Rectangle,
}

export default rectangle

function drawRectangle(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  cell: Cell,
) {
  return new Painter(cell)
    .moveTo(x0, y0)
    .lineTo(x0, y1)
    .lineTo(x1, y1)
    .lineTo(x1, y0)
    .lineTo(x0, y0).drawing
}
