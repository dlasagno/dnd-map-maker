import React, { useState, useEffect } from 'react'
import Tool, { ToolComponent } from '../common/tool'
import icon from './pencil.svg'
import '../common/tool.css'
import { useTexture } from '../context/TextureContext'
import Texture from '../common/texture'
import { useCoordinates } from '../context/CoordinatesContext'

const Pencil: ToolComponent = ({
  width,
  height,
  cellSize,
  onDrawMap,
  onDrawPreview,
}) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [isInside, setIsInside] = useState(false)

  const [selectedTexture] = useTexture()
  const [currentCoordinates] = useCoordinates()

  const handleMouseDown = () => {
    const [x, y] = currentCoordinates

    setIsDrawing(true)
    onDrawMap([{ x, y, cell: { texture: selectedTexture as Texture } }])
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const handleMouseEnter = () => {
    setIsInside(true)
  }

  const handleMouseOut = () => {
    setIsDrawing(false)
    setIsInside(false)
    onDrawPreview([])
  }

  useEffect(() => {
    const [x, y] = currentCoordinates

    if (isDrawing) {
      onDrawMap([{ x, y, cell: { texture: selectedTexture as Texture } }])
    } else if (isInside) {
      onDrawPreview([{ x, y, cell: { texture: selectedTexture as Texture } }])
    }
  }, [
    currentCoordinates,
    selectedTexture,
    isDrawing,
    isInside,
    onDrawMap,
    onDrawPreview,
  ])

  return (
    <button
      className="Tool"
      style={{
        width: width * cellSize,
        height: height * cellSize,
      }}
      type="button"
      aria-label="pencil"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    />
  )
}

const pencil: Tool = {
  name: 'pencil',
  icon,
  Component: Pencil,
}

export default pencil
