import { Tool } from './tool';
import icon from './pencil.svg';
import React from 'react';

const pencil = new Tool('Pencil', icon);

pencil.listenTo('onClick', ({ drawMap, cellSize }, e) => {
  const [x, y] = Tool.getGridCoordinates(e, cellSize);

  drawMap(x, y);
});

pencil.listenTo('onMouseMove', ({ drawMap, drawPreview, clearPreview, cellSize }, e) => {
  const [x, y] = Tool.getGridCoordinates(e, cellSize);

  clearPreview();
  drawPreview(x, y);
  if ((e as React.MouseEvent).buttons === 1)
    drawMap(x, y);
});

pencil.listenTo('onMouseOut', ({ clearPreview }) => {
  clearPreview();
});

export default pencil;
