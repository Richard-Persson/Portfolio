import { useCallback } from 'react'
import './DesktopIcons.css'
import { APPLICATIONS } from '../../classes'

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export default function DesktopIcons({ onDoubleClick }) {
  const handleClick = useCallback((key) => {
    if (isTouchDevice()) {
      onDoubleClick(key)
    }
  }, [onDoubleClick])

  return (
    <div className="desktop-icons">
      {Object.entries(APPLICATIONS).filter(([, v]) => v.component === 'desktop').map(([key, item]) => (
        <div
          key={key}
          className="desktop-icon"
          onDoubleClick={() => onDoubleClick(key)}
          onClick={() => handleClick(key)}
        >

          <img className="icon-img" src={item.icon} />
          <div className="icon-label">{item.title}</div>
        </div>
      ))}
    </div>
  )
}
