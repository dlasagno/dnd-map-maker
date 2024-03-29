import React, { useRef } from 'react'
import Tool, { ToolComponent, Drawing } from '../common/tool'
import icon from './bucket.svg'
import '../common/tool.css'
import { useTexture } from '../context/TextureContext'
import Texture from '../common/texture'
import { useCoordinates } from '../context/CoordinatesContext'

const Bucket: ToolComponent = ({
  width,
  height,
  cellSize,
  cells,
  onDrawMap,
}) => {
  const toolDivRef = useRef<HTMLButtonElement>(null)

  const [selectedTexture] = useTexture()
  const [currentCoordinates] = useCoordinates()

  const handleClick = () => {
    const drawing: Drawing = []
    const [x0, y0] = currentCoordinates
    const oldTexture = cells[x0]?.[y0]?.texture

    if (oldTexture === selectedTexture) return

    const visited: boolean[][] = []
    function floodFill(x: number, y: number) {
      if (x < 0 || x >= width || y < 0 || y >= height) return
      if (cells[x]?.[y]?.texture !== oldTexture) return
      if (visited[x]?.[y]) return

      if (!visited[x]) visited[x] = []
      visited[x][y] = true
      drawing.push({ x, y, cell: { texture: selectedTexture as Texture } })

      floodFill(x, y - 1)
      floodFill(x + 1, y)
      floodFill(x, y + 1)
      floodFill(x - 1, y)
    }

    floodFill(x0, y0)
    onDrawMap(drawing)
  }

  return (
    <button
      className="Tool"
      style={{
        width: width * cellSize,
        height: height * cellSize,
      }}
      type="button"
      aria-label="bucket"
      ref={toolDivRef}
      onClick={handleClick}
    />
  )
}

const bucket: Tool = {
  name: 'bucket',
  icon,
  Component: Bucket,
}

export default bucket
