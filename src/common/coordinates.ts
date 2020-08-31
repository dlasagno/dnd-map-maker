type Coordinates2D = [number, number]

export function mirrorCoordinates(
  x0: number,
  y0: number,
  x: number,
  y: number,
): [number, number] {
  return [x0 + x0 - x, y0 + y0 - y]
}

export function snapCoordinates(
  x0: number,
  y0: number,
  x: number,
  y: number,
): [number, number] {
  const distance = Math.max(Math.abs(x - x0), Math.abs(y - y0))

  return [x0 + Math.sign(x - x0) * distance, y0 + Math.sign(y - y0) * distance]
}

export default Coordinates2D
