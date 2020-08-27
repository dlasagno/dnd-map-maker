import React, { useState, useEffect } from 'react'
import Tool, { ToolComponent } from '../common/tool'
import icon from './square.svg'
import '../common/tool.css'
import { useTexture } from '../context/TextureContext'
import Texture from '../common/texture'
import { useCoordinates } from '../context/CoordinatesContext'
import { Cell } from '../common/mapMatrix'
import Painter from '../common/painter'

const Ellipse: ToolComponent = ({
  width,
  height,
  cellSize,
  onDrawMap,
  onDrawPreview,
}) => {
  const [firstCoordinate, setFirstCoordinate] = useState<number[] | null>(null)

  const [selectedTexture] = useTexture()
  const [currentCoordinates] = useCoordinates()

  const handleMouseDown = () => {
    const [x, y] = currentCoordinates

    setFirstCoordinate([x, y])
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (firstCoordinate) {
      let [x0, y0] = firstCoordinate
      let [x1, y1] = currentCoordinates

      if (e.shiftKey) {
        x1 =
          x0 +
          Math.sign(x1 - x0) * Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))
        y1 =
          y0 +
          Math.sign(y1 - y0) * Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))
      }
      if (e.altKey) {
        x0 = x0 + x0 - x1
        y0 = y0 + y0 - y1
      }

      onDrawMap(
        drawEllipse(x0, y0, x1, y1, { texture: selectedTexture as Texture }),
      )
      onDrawPreview([])

      setFirstCoordinate(null)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (firstCoordinate) {
      let [x0, y0] = firstCoordinate
      let [x1, y1] = currentCoordinates

      if (e.shiftKey) {
        x1 =
          x0 +
          Math.sign(x1 - x0) * Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))
        y1 =
          y0 +
          Math.sign(y1 - y0) * Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))
      }
      if (e.altKey) {
        x0 = x0 + x0 - x1
        y0 = y0 + y0 - y1
      }

      onDrawPreview(
        drawEllipse(x0, y0, x1, y1, { texture: selectedTexture as Texture }),
      )
    }
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (firstCoordinate) {
        let [x0, y0] = firstCoordinate
        let [x1, y1] = currentCoordinates

        if (e.shiftKey) {
          x1 =
            x0 +
            Math.sign(x1 - x0) * Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))
          y1 =
            y0 +
            Math.sign(y1 - y0) * Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))
        }
        if (e.altKey) {
          x0 = x0 + x0 - x1
          y0 = y0 + y0 - y1
        }

        onDrawPreview(
          drawEllipse(x0, y0, x1, y1, {
            texture: selectedTexture as Texture,
          }),
        )
      }
    }

    document.addEventListener('keydown', handleKey)
    document.addEventListener('keyup', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('keyup', handleKey)
    }
  }, [firstCoordinate, onDrawPreview, selectedTexture, currentCoordinates])

  return (
    <button
      className="Tool"
      style={{
        width: width * cellSize,
        height: height * cellSize,
      }}
      type="button"
      aria-label="bucket"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  )
}

const rectangle: Tool = {
  name: 'ellipse',
  icon,
  Component: Ellipse,
}

export default rectangle

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
  const numberOfLines = 100

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
