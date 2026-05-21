import { useState, useEffect, useRef, useCallback } from 'react'

export function useWindowDrag(windows, setWindows, focusWindow) {
  const [dragging, setDragging] = useState(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const windowsRef = useRef(windows)
  const focusRef = useRef(focusWindow)

  windowsRef.current = windows
  focusRef.current = focusWindow

  const handleMouseDown = useCallback((e, name) => {
    focusRef.current(name)
    if (e.button !== 0) return
    if (!e.target.closest('.title-bar')) return
    if (e.target.closest('.title-bar-controls')) return
    const win = windowsRef.current[name]
    if (!win) return
    setDragging(name)
    dragOffset.current = {
      x: e.clientX - win.x,
      y: e.clientY - win.y,
    }
  }, [])

  useEffect(() => {
    if (!dragging) return

    const handleMouseMove = (e) => {
      if (e.buttons === 0) {
        setDragging(null)
        return
      }
      const { x, y } = dragOffset.current
      setWindows(prev => {
        const win = prev[dragging]
        if (!win) return prev
        return {
          ...prev,
          [dragging]: {
            ...win,
            x: e.clientX - x,
            y: e.clientY - y,
          }
        }
      })
    }

    const handleMouseUp = () => setDragging(null)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging, setWindows])

  return { dragging, handleMouseDown }
}
