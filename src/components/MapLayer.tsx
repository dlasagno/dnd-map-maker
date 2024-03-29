import React, { useEffect, useRef } from 'react'
import './MapLayer.css'

import Texture from '../common/texture'
import MapMatrix from '../common/mapMatrix'

type Props = {
  width: number
  height: number
  cellSize: number
  cells: MapMatrix
}

const MapLayer: React.FC<Props> = ({ width, height, cellSize, cells }) => {
  const layerCanvasRef = useRef<HTMLCanvasElement>(null)
  const previousCells = useRef<MapMatrix>([])

  useEffect(() => {
    if (layerCanvasRef.current === null) return

    const ctx = layerCanvasRef.current.getContext('2d')

    if (ctx !== null) {
      if (cells.length > 0) {
        for (
          let x = 0;
          x <
          Math.min(Math.max(cells.length, previousCells.current.length), width);
          x += 1
        ) {
          if (cells[x]) {
            for (
              let y = 0;
              y <
              Math.min(
                Math.max(
                  cells[x].length,
                  previousCells.current[x]
                    ? previousCells.current[x].length
                    : 0,
                ),
                height,
              );
              y += 1
            ) {
              if (cells[x][y]?.texture) {
                if (
                  !previousCells.current[x]?.[y] ||
                  cells[x][y] !== previousCells.current[x][y]
                ) {
                  ctx.drawImage(
                    (cells[x][y].texture as Texture).image,
                    x * cellSize,
                    y * cellSize,
                  )
                }
              } else {
                ctx.clearRect(x * cellSize, y * cellSize, cellSize, cellSize)
              }
            }
          } else {
            ctx.clearRect(x * cellSize, 0, cellSize, height * cellSize)
          }
        }
      } else {
        ctx.clearRect(
          0,
          0,
          layerCanvasRef.current.width,
          layerCanvasRef.current.height,
        )
      }
    }

    previousCells.current = cells
  }, [cells, width, height, cellSize])

  useEffect(() => {
    if (layerCanvasRef.current === null) return

    const ctx = layerCanvasRef.current.getContext('2d')

    if (ctx !== null) {
      for (
        let x = 0;
        x <
        Math.min(Math.max(cells.length, previousCells.current.length), width);
        x += 1
      ) {
        if (cells[x]) {
          for (
            let y = 0;
            y <
            Math.min(
              Math.max(
                cells[x].length,
                previousCells.current[x] ? previousCells.current[x].length : 0,
              ),
              height,
            );
            y += 1
          ) {
            if (cells[x][y]?.texture) {
              ctx.drawImage(
                (cells[x][y].texture as Texture).image,
                x * cellSize,
                y * cellSize,
              )
            }
          }
        }
      }
    }

    previousCells.current = cells
    // eslint-disable-next-line
  }, [width, height, cellSize])

  return (
    <canvas
      className="MapLayer"
      ref={layerCanvasRef}
      width={width * cellSize}
      height={height * cellSize}
    />
  )
}

export default MapLayer
