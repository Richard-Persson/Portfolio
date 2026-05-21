import { useEffect, useRef, useCallback } from 'react'

const TIPS = {
  home: [
    "Hi there! Welcome to Richard's portfolio. Looks like you're checking out the home page.",
    "It looks like you're browsing a portfolio. Would you like a tour?",
  ],
  projects: [
    "It looks like you're looking at some projects. Would you like me to tell you more?",
    "I see you're checking out Richard's work. Some impressive stuff in there!",
  ],
  about: [
    "Ah, the About section. Richard seems like a talented developer!",
    "Would you like a summary of Richard's skills and background?",
  ],
  contact: [
    "Thinking of reaching out? You can send a message from here!",
    "Go on, say hello! Richard doesn't bite.",
  ],
  pong: [
    "I see you're playing Pong! Use the mouse or keyboard to control the paddle.",
    "Pong! A classic. Try to keep the ball away from your side.",
    "Tip: Watch the ball's trajectory and position yourself early.",
  ],
  connectfour: [
    "Four in a row! The goal is to get four of your pieces in a line.",
    "Strategy tip: Try to block your opponent while building your own line.",
    "Connect Four — also known as 4 på rad. Fun fact: the first player can always force a win!",
  ],
  music: [
    "Listening to some tunes? Great choice! Browse cities to find radio stations.",
    "Music makes everything better. Click a city to discover new stations!",
  ],
}

const GREETINGS = [
  "Hello! It looks like you're trying to browse a portfolio. Would you like help?",
  "Hi there! I'm Clippy. I can help you navigate Richard's portfolio.",
  "Welcome! Need any help finding something?",
  "Oh, hello! I didn't see you there. Want me to show you around?",
]

export default function ClippyAssistant({ activeWindow }) {
  const agentRef = useRef(null)
  const prevWindowRef = useRef('')

  const speak = useCallback((message) => {
    const agent = agentRef.current
    if (!agent) return
    agent.stop()
    agent.show()
    agent.speak(message)
    agent.animate()
  }, [])

  useEffect(() => {
    let disposed = false

    async function loadAgent() {
      try {
        const [{ initAgent }, { Clippy }] = await Promise.all([
          import('clippyjs'),
          import('clippyjs/agents'),
        ])
        if (disposed) return
        const agent = await initAgent(Clippy)
        if (disposed) { agent.dispose(); return }
        agentRef.current = agent
        agent.show()
        const x = Math.min(window.innerWidth - 180, window.innerWidth * 0.8)
        const y = window.innerHeight - 240
        agent.moveTo(x, y)
        const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
        agent.speak(greeting)
        agent.animate()
      } catch {
        // clippy silent fail
      }
    }

    loadAgent()

    return () => {
      disposed = true
      if (agentRef.current) {
        agentRef.current.hide()
        agentRef.current.dispose()
        agentRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!activeWindow || activeWindow === prevWindowRef.current) return
    prevWindowRef.current = activeWindow
    const tips = TIPS[activeWindow]
    if (!tips) return
    const msg = tips[Math.floor(Math.random() * tips.length)]
    const timer = setTimeout(() => speak(msg), 800)
    return () => clearTimeout(timer)
  }, [activeWindow, speak])

  return null
}
