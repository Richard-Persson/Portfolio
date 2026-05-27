import { useState, useEffect, useRef } from 'react'
import { Slider } from 'react-windows-xp'
import './Taskbar.css'
import { useClock } from '../../hooks/useClock'

export default function Taskbar({ windows, activeWindow, onStartClick, onWindowClick, onClippyToggle, clippyVisible, volume, onVolumeChange }) {
  const [volumeOpen, setVolumeOpen] = useState(false)
  const volRef = useRef(null)
  const clock = useClock()

  useEffect(() => {
    if (!volumeOpen) return
    const handler = (e) => {
      if (volRef.current && !volRef.current.contains(e.target)) {
        setVolumeOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [volumeOpen])

  const volIcon = volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'
  const openWindows = Object.entries(windows).filter(([, w]) => w.open && !w.minimized)

  return (
    <div className="taskbar">
      <button className="start-button" onClick={onStartClick}>
        <img className='start-logo' src='windows-xp.png' />
        <span>start</span>
      </button>

      <div className="taskbar-divider" />

      <div className="taskbar-buttons">
        {openWindows.map(([name, win]) => (
          <button
            key={name}
            className={`taskbar-btn ${name === activeWindow ? 'active' : ''}`}
            onClick={() => onWindowClick(name)}
          >
            <img className="window-icon" src={win.icon} />
            {win.title}
          </button>
        ))}
      </div>

      <div className="taskbar-tray">
        <div className="tray-volume" ref={volRef}>
          <button
            className="tray-vol-btn"
            onClick={() => setVolumeOpen(v => !v)}
            title="Volume"
          >
            {volIcon}
          </button>
          {volumeOpen && (
            <div className="volume-popup">
              <Slider
                id="volume"
                min={0}
                max={100}
                value={Math.round(volume * 100)}
                vertical
                boxIndicator
                style={{ width: 110 }}
                onChange={(val) => onVolumeChange(val / 100)}
              />
            </div>
          )}
        </div>
        <button
          className={`tray-clippy ${clippyVisible ? 'active' : ''}`}
          onClick={onClippyToggle}
          title="Toggle Clippy"
        >
          📎
        </button>
        <span className="tray-clock">{clock}</span>
      </div>
    </div>
  )
}
