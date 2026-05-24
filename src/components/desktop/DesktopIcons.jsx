import { useCallback } from 'react'
import './DesktopIcons.css'

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export default function DesktopIcons({ items, onDoubleClick }) {
  const handleClick = useCallback((key) => {
    if (isTouchDevice()) {
      onDoubleClick(key)
    }
  }, [onDoubleClick])

  return (
    <div className="desktop-icons">
      {items.map(item => (
        <div
          key={item.key}
          className="desktop-icon"
          onDoubleClick={() => onDoubleClick(item.key)}
          onClick={() => handleClick(item.key)}
        >
          <div className="icon-img">{item.icon}</div>
          <div className="icon-label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
