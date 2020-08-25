import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('./textures/index.ts');

test('renders map view', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
