import { Tool } from './tool';
import icon from './square.svg';
import React from 'react';

const rectangle = new Tool('Rectangle', icon);

let firstCoordinate: number[] | undefined;

rectangle.listenTo('onMouseDown', ({ cellSize }, e) => {
  const [x, y] = Tool.getGridCoordinates(e, cellSize);

  firstCoordinate = [x, y];
})

rectangle.listenTo('onMouseUp', ({ drawMap, cellSize }, e) => {
    if (firstCoordinate) {
        let [x0, y0] = firstCoordinate;
        let [x1, y1] = Tool.getGridCoordinates(e, cellSize);

        if ((e as React.MouseEvent).shiftKey) {
            x1 = x0 + Math.sign(x1-x0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
            y1 = y0 + Math.sign(y1-y0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
        }
        if ((e as React.MouseEvent).altKey) {
            x0 = x0 + x0-x1;
            y0 = y0 + y0-y1;
        }

        drawRectangle(drawMap, x0, y0, x1, y1);

        firstCoordinate = undefined;
    }
})

rectangle.listenTo('onMouseOut', ({ clearPreview }, e) => {
    firstCoordinate = undefined;
    clearPreview();
})

rectangle.listenTo('onMouseMove onKeyDown onKeyUp', ({ drawPreview, clearPreview, cellSize }, e) => {
  clearPreview();

  if (firstCoordinate) {
    let [x0, y0] = firstCoordinate;
    let [x1, y1] = Tool.getGridCoordinates(e, cellSize);

    if ((e as React.MouseEvent).shiftKey) {
        x1 = x0 + Math.sign(x1-x0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
        y1 = y0 + Math.sign(y1-y0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
    }
    if ((e as React.MouseEvent).altKey) {
        x0 = x0 + x0-x1;
        y0 = y0 + y0-y1;
    }

    drawRectangle(drawPreview, x0, y0, x1, y1);
  }
})

export default rectangle;


function drawRectangle(draw: (x: number, y: number) => void, x0: number, y0: number, x1: number, y1: number) {
  for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
    draw(x, y0);
    draw(x, y1);
  }
  for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
    draw(x0, y);
    draw(x1, y);
  }
}
