import React from 'react'
import Tool, { ToolComponent } from '../common/tool'
import icon from './line.svg'
import Shape from './shape'
import { Cell } from '../common/mapMatrix'
import Painter from '../common/painter'

const Line: ToolComponent = ({
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
      label="line"
      drawShape={drawLine}
    />
  )
}

const line: Tool = {
  name: 'line',
  icon,
  Component: Line,
}

export default line

function drawLine(x0: number, y0: number, x1: number, y1: number, cell: Cell) {
  return new Painter(cell).moveTo(x0, y0).lineTo(x1, y1).drawing
}
