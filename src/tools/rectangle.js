import { Tool } from './tool';
import icon from './square.svg';

const rectangle = new Tool('Rectangle', icon);

rectangle.listenTo('onMouseDown', ({ cellSize }, e) => {
  const x = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x + e.currentTarget.scrollLeft) / cellSize);
  const y = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y + e.currentTarget.scrollTop) / cellSize);

  rectangle.firstCoordinate = [x, y];
})

rectangle.listenTo('onMouseUp', ({ drawMap, cellSize }, e) => {
    if (rectangle.firstCoordinate) {
        let [x0, y0] = rectangle.firstCoordinate;
        let x1 = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x + e.currentTarget.scrollLeft) / cellSize);
        let y1 = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y + e.currentTarget.scrollTop) / cellSize);

        if (e.shiftKey) {
            x1 = x0 + Math.sign(x1-x0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
            y1 = y0 + Math.sign(y1-y0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
        }
        if (e.altKey) {
            x0 = x0 + x0-x1;
            y0 = y0 + y0-y1;
        }

        drawRectangle(drawMap, x0, y0, x1, y1);

        delete rectangle.firstCoordinate;
    }
})

rectangle.listenTo('onMouseOut', ({ clearPreview }, e) => {
    delete rectangle.firstCoordinate
    clearPreview();
})

rectangle.listenTo('onMouseMove onKeyDown onKeyUp', ({ drawPreview, clearPreview, cellSize }, e) => {
  clearPreview();

  if (rectangle.firstCoordinate) {
    let [x0, y0] = rectangle.firstCoordinate;
    let x1 = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x + e.currentTarget.scrollLeft) / cellSize);
    let y1 = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y + e.currentTarget.scrollTop) / cellSize);
    rectangle.lastCoordinate = [x1, y1];

    if (e.shiftKey) {
        x1 = x0 + Math.sign(x1-x0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
        y1 = y0 + Math.sign(y1-y0)*Math.max(Math.abs(x1-x0), Math.abs(y1-y0));
    }
    if (e.altKey) {
        x0 = x0 + x0-x1;
        y0 = y0 + y0-y1;
    }

    drawRectangle(drawPreview, x0, y0, x1, y1);
  }
})

export default rectangle;


function drawRectangle(draw, x0, y0, x1, y1) {
  for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
    draw(x, y0);
    draw(x, y1);
  }
  for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
    draw(x0, y);
    draw(x1, y);
  }
}
