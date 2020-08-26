import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

jest.mock('./textures/index.ts')

// eslint-disable-next-line jest/expect-expect
test('renders map view', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
