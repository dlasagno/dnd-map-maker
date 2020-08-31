import React from 'react'
import './ToolBar.css'
import { useCoordinates } from '../context/CoordinatesContext'
import ToolSelector from './ToolSelector'

const ToolBar: React.FC = () => {
  const [[x, y]] = useCoordinates()

  return (
    <div className="ToolBar">
      <ToolSelector />
      <div id="x-coordinate">{x >= 0 ? x : '-'}</div>
      <div id="y-coordinate">{y >= 0 ? y : '-'}</div>
    </div>
  )
}

export default ToolBar
