import { useState, useEffect, useRef, useCallback } from 'react'

export function useWindowDrag(windows, setWindows, focusWindow) {
  const [dragging, setDragging] = useState(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const windowsRef = useRef(windows)
  const focusRef = useRef(focusWindow)

  windowsRef.current = windows
  focusRef.current = focusWindow

  const getPos = useCallback((e) => ({
    x: e.touches ? e.touches[0].clientX : e.clientX,
    y: e.touches ? e.touches[0].clientY : e.clientY,
  }), [])

  const handleMouseDown = useCallback((e, name) => {
    focusRef.current(name)
    if (!e.touches && e.button !== 0) return
    if (!e.target.closest('.title-bar')) return
    if (e.target.closest('.title-bar-controls')) return
    const win = windowsRef.current[name]
    if (!win) return
    const pos = getPos(e)
    setDragging(name)
    dragOffset.current = {
      x: pos.x - win.x,
      y: pos.y - win.y,
    }
  }, [getPos])

  useEffect(() => {
    if (!dragging) return

    const handleMove = (e) => {
      if (e.touches && e.touches.length === 0) {
        setDragging(null)
        return
      }
      if (!e.touches && e.buttons === 0) {
        setDragging(null)
        return
      }
      const pos = getPos(e)
      const { x, y } = dragOffset.current
      setWindows(prev => {
        const win = prev[dragging]
        if (!win) return prev
        return {
          ...prev,
          [dragging]: {
            ...win,
            x: pos.x - x,
            y: pos.y - y,
          }
        }
      })
    }

    const handleEnd = () => setDragging(null)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleEnd)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [dragging, setWindows, getPos])

  return { dragging, handleMouseDown }
}
