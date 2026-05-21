import { useState, useEffect } from 'react'

export function useClock() {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setClock(now.toLocaleTimeString('no-NO', { timeZone: 'Europe/Stockholm', hour: '2-digit', minute: '2-digit', hour12: false }))
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])

  return clock
}
