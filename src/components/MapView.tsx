import React, { useState, useCallback, useEffect, useRef } from 'react'
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

  const viewDivRef = useRef<HTMLDivElement>(null)

  const [selectedTool] = useTool() as ToolValue
  const [
    currentCoordinates,
    setCurrentCoordinates,
  ] = useCoordinates() as CoordinatesValue

  const handleMouseMove = (e: React.MouseEvent) => {
    const [x0, y0] = currentCoordinates
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

    if (x !== x0 || y !== y0) {
      setCurrentCoordinates([x, y])
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const [x0, y0] = currentCoordinates
    const x = Math.floor(
      (e.touches[0].clientX -
        e.currentTarget.getBoundingClientRect().x +
        e.currentTarget.scrollLeft) /
        cellSize,
    )
    const y = Math.floor(
      (e.touches[0].clientY -
        e.currentTarget.getBoundingClientRect().y +
        e.currentTarget.scrollTop) /
        cellSize,
    )

    switch (e.touches.length) {
      case 1:
        if (x !== x0 || y !== y0) {
          setCurrentCoordinates([x, y])
        }
        break
      case 2:
        break
      default:
        break
    }
  }

  const clearPreview = () => {
    setPreviewCells([])
  }

  const handleDrawMap = useCallback(
    (drawing: Drawing) => {
      draw(
        setMapCells,
        drawing.filter(({ x, y }) => x < width && y < height),
      )
    },
    [width, height],
  )

  const handleDrawPreview = useCallback(
    (drawing: Drawing) => {
      clearPreview()
      draw(
        setPreviewCells,
        drawing.filter(({ x, y }) => x < width && y < height),
      )
    },
    [width, height],
  )

  useEffect(() => {
    const viewDiv = viewDivRef.current
    const preventDefault = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault()
      }
    }

    viewDiv?.addEventListener('touchmove', preventDefault, { passive: false })

    return () => viewDiv?.removeEventListener('touchmove', preventDefault)
  }, [])

  return (
    <div
      className="MapView"
      ref={viewDivRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
    >
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
