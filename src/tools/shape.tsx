import React, { useState, useEffect } from 'react'
import { ToolProps, Drawing } from '../common/tool'
import '../common/tool.css'
import { useTexture } from '../context/TextureContext'
import Texture from '../common/texture'
import { useCoordinates } from '../context/CoordinatesContext'
import Coordinates2D, {
  snapCoordinates,
  mirrorCoordinates,
} from '../common/coordinates'
import { Cell } from '../common/mapMatrix'

type Props = {
  label?: string
  drawShape: (
    x0: number,
    y0: number,
    x1: number,
    x2: number,
    cell: Cell,
  ) => Drawing
}

const Shape: React.FC<ToolProps & Props> = ({
  width,
  height,
  cellSize,
  onDrawMap,
  onDrawPreview,
  label = 'shape',
  drawShape,
}) => {
  const [firstCoordinate, setFirstCoordinate] = useState<Coordinates2D | null>(
    null,
  )
  const [isMirroring, setIsMirroring] = useState(false)
  const [isSnapping, setIsSnapping] = useState(false)

  const [selectedTexture] = useTexture()
  const [currentCoordinates] = useCoordinates()

  const handleMouseDown = () => {
    const [x, y] = currentCoordinates

    setFirstCoordinate([x, y])
  }

  const handleMouseUp = () => {
    if (firstCoordinate) {
      let [x0, y0] = firstCoordinate
      let [x, y] = currentCoordinates

      if (isSnapping) [x, y] = snapCoordinates(x0, y0, x, y)
      if (isMirroring) [x0, y0] = mirrorCoordinates(x0, y0, x, y)

      onDrawMap(
        drawShape(x0, y0, x, y, { texture: selectedTexture as Texture }),
      )
      onDrawPreview([])

      setFirstCoordinate(null)
    }
  }

  const handleKey = (e: KeyboardEvent) => {
    setIsSnapping(e.shiftKey)
    setIsMirroring(e.altKey)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.addEventListener('keyup', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('keyup', handleKey)
    }
  }, [])

  useEffect(() => {
    if (firstCoordinate) {
      let [x0, y0] = firstCoordinate
      let [x, y] = currentCoordinates

      if (isSnapping) [x, y] = snapCoordinates(x0, y0, x, y)
      if (isMirroring) [x0, y0] = mirrorCoordinates(x0, y0, x, y)

      onDrawPreview(
        drawShape(x0, y0, x, y, { texture: selectedTexture as Texture }),
      )
    }
  }, [
    currentCoordinates,
    isMirroring,
    isSnapping,
    firstCoordinate,
    selectedTexture,
    onDrawMap,
    onDrawPreview,
    drawShape,
  ])

  return (
    <button
      className="Tool"
      style={{
        width: width * cellSize,
        height: height * cellSize,
      }}
      type="button"
      aria-label={label}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  )
}

export default Shape
