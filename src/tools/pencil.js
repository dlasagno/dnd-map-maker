import { Tool } from './tool';
import icon from './pencil.svg';

const pencil = new Tool('Pencil', icon);

pencil.listenTo('onClick', ({ drawMap, cellSize }, e) => {
  const x = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x) / cellSize);
  const y = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y) / cellSize);

  drawMap(x, y);
});

pencil.listenTo('onMouseMove', ({ drawMap, drawPreview, clearPreview, cellSize }, e) => {
  const x = Math.floor((e.clientX - e.currentTarget.getBoundingClientRect().x + e.currentTarget.scrollLeft) / cellSize);
  const y = Math.floor((e.clientY - e.currentTarget.getBoundingClientRect().y + e.currentTarget.scrollTop) / cellSize);

  clearPreview();
  drawPreview(x, y);
  if (e.buttons === 1)
    drawMap(x, y);
});

pencil.listenTo('onMouseOut', ({ clearPreview }) => {
  clearPreview();
});

export default pencil;
