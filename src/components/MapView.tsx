import React, { useState } from 'react'
import { useTool, ToolValue } from '../context/ToolContext'
import { useCoordinates, CoordinateValue } from '../context/CoordinatesContext'
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

const MapView: React.FC<Props> = (props) => {
  const [mapCells, setMapCells] = useState<MapMatrix>([])
  const [previewCells, setPreviewCells] = useState<MapMatrix>([])

  const [selectedTool] = useTool() as ToolValue
  const [, setCurrentCoordinates] = useCoordinates() as CoordinateValue

  const clearPreview = () => {
    setPreviewCells([])
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = Math.floor(
      (e.clientX -
        e.currentTarget.getBoundingClientRect().x +
        e.currentTarget.scrollLeft) /
        props.cellSize,
    )
    const y = Math.floor(
      (e.clientY -
        e.currentTarget.getBoundingClientRect().y +
        e.currentTarget.scrollTop) /
        props.cellSize,
    )

    setCurrentCoordinates([x, y])
  }

  const handleDrawMap = (drawing: Drawing) => {
    draw(
      setMapCells,
      drawing.filter(({ x, y }) => x < props.width && y < props.height),
    )
  }

  const handleDrawPreview = (drawing: Drawing) => {
    clearPreview()
    draw(
      setPreviewCells,
      drawing.filter(({ x, y }) => x < props.width && y < props.height),
    )
  }

  return (
    <div className="MapView" onMouseMove={handleMouseMove}>
      <MapLayer
        width={props.width}
        height={props.height}
        cellSize={props.cellSize}
        cells={mapCells}
      />
      <MapLayer
        width={props.width}
        height={props.height}
        cellSize={props.cellSize}
        cells={previewCells}
      />
      <GridLayer
        width={props.width}
        height={props.height}
        cellSize={props.cellSize}
      />

      <selectedTool.Component
        width={props.width}
        height={props.height}
        cellSize={props.cellSize}
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
    for (const { x, y, cell } of drawing) {
      if (!cells[x]) cells[x] = []
      if (!cells[x][y]) cells[x][y] = {}

      cells = cells.map((row, i) =>
        i !== x
          ? row
          : row.map((currentCell, j) =>
              j !== y ? currentCell : { ...currentCell, ...cell },
            ),
      )
    }
    return cells
  })
}
