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

  const handleMouseOut = () => {
    setIsDrawing(false)
    onDrawPreview([])
  }

  useEffect(() => {
    const [x, y] = currentCoordinates

    onDrawPreview([{ x, y, cell: { texture: selectedTexture as Texture } }])

    if (isDrawing)
      onDrawMap([{ x, y, cell: { texture: selectedTexture as Texture } }])
  }, [currentCoordinates, selectedTexture, isDrawing, onDrawMap, onDrawPreview])

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
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    />
  )
}

const pencil: Tool = {
  name: 'pencil',
  icon,
  Component: Pencil,
}

export default pencil
