import React from 'react'
import './ToolBar.css'
import { useCoordinates, CoordinatesValue } from '../context/CoordinatesContext'
import ToolSelector from './ToolSelector'

const ToolBar: React.FC = () => {
  const [[x, y]] = useCoordinates() as CoordinatesValue

  return (
    <div className="ToolBar">
      <ToolSelector />
      <div id="x-coordinate">{x}</div>
      <div id="y-coordinate">{y}</div>
    </div>
  )
}

export default ToolBar
