import React, { useState } from 'react'
import { useTool, ToolValue } from '../context/ToolContext'
import { useCoordinates, CoordinatesValue } from '../context/CoordinatesContext'
import './MapView.css'

import GridLayer from './GridLayer'
import MapLayer from './MapLayer'

import MapMatrix from '../common/mapMatrix'
import { Drawing } from '../common/tool'

type Props = {
  width: number
  height: number
  cellSize: number
}

const MapView: React.FC<Props> = ({ width, height, cellSize }) => {
  const [mapCells, setMapCells] = useState<MapMatrix>([])
  const [previewCells, setPreviewCells] = useState<MapMatrix>([])

  const [selectedTool] = useTool() as ToolValue
  const [, setCurrentCoordinates] = useCoordinates() as CoordinatesValue

  const clearPreview = () => {
    setPreviewCells([])
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = Math.floor(
      (e.clientX -
        e.currentTarget.getBoundingClientRect().x +
        e.currentTarget.scrollLeft) /
        cellSize,
    )
    const y = Math.floor(
      (e.clientY -
        e.currentTarget.getBoundingClientRect().y +
        e.currentTarget.scrollTop) /
        cellSize,
    )

    setCurrentCoordinates([x, y])
  }

  const handleDrawMap = (drawing: Drawing) => {
    draw(
      setMapCells,
      drawing.filter(({ x, y }) => x < width && y < height),
    )
  }

  const handleDrawPreview = (drawing: Drawing) => {
    clearPreview()
    draw(
      setPreviewCells,
      drawing.filter(({ x, y }) => x < width && y < height),
    )
  }

  return (
    <div className="MapView" onMouseMove={handleMouseMove}>
      <MapLayer
        width={width}
        height={height}
        cellSize={cellSize}
        cells={mapCells}
      />
      <MapLayer
        width={width}
        height={height}
        cellSize={cellSize}
        cells={previewCells}
      />
      <GridLayer width={width} height={height} cellSize={cellSize} />

      <selectedTool.Component
        width={width}
        height={height}
        cellSize={cellSize}
        cells={mapCells}
        onDrawMap={handleDrawMap}
        onDrawPreview={handleDrawPreview}
      />
    </div>
  )
}

export default MapView

function draw(
  setCells: React.Dispatch<React.SetStateAction<MapMatrix>>,
  drawing: Drawing,
) {
  setCells((cells) => {
    let newCells = cells

    drawing.forEach(({ x, y, cell }) => {
      if (!newCells[x]) newCells[x] = []
      if (!newCells[x][y]) newCells[x][y] = {}

      newCells = newCells.map((row, i) =>
        i !== x
          ? row
          : row.map((currentCell, j) =>
              j !== y ? currentCell : { ...currentCell, ...cell },
            ),
      )
    })

    return newCells
  })
}
