import Tool, { ToolComponent } from '../common/tool'
import icon from './line.svg'
import React, { useState, useEffect } from 'react'
import '../common/tool.css'
import { useTexture } from '../context/TextureContext'
import Texture from '../common/texture'
import { useCoordinates } from '../context/CoordinatesContext'
import Painter from '../common/painter'

const Line: ToolComponent = ({
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

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
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
        new Painter({ texture: selectedTexture as Texture }).drawLine(
          x0,
          y0,
          x1,
          y1,
        ).drawing,
      )
      onDrawPreview([])

      setFirstCoordinate(null)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
        new Painter({ texture: selectedTexture as Texture }).drawLine(
          x0,
          y0,
          x1,
          y1,
        ).drawing,
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
          new Painter({ texture: selectedTexture as Texture }).drawLine(
            x0,
            y0,
            x1,
            y1,
          ).drawing,
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
    <div
      className="Tool"
      style={{
        width: width * cellSize,
        height: height * cellSize,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  )
}

const line: Tool = {
  name: 'line',
  icon,
  Component: Line,
}

export default line
