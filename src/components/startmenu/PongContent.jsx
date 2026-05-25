import { useRef, useEffect } from 'react'

const PADDLE_W = 10, PADDLE_H = 80, BALL_S = 10
const SPEED = 5, AI_SPEED = 5

export default function PongContent() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height

    stateRef.current = {
      ball: { x: W / 2, y: H / 2, dx: SPEED, dy: SPEED },
      p1: { y: H / 2 - PADDLE_H / 2 },
      p2: { y: H / 2 - PADDLE_H / 2 },
      score1: 0,
      score2: 0,
    }

    let animId
    const keys = {}

    const onKey = (e) => { keys[e.key] = e.type === 'keydown' }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)

    const loop = () => {
      const s = stateRef.current
      if (!s) return

      if (keys['w'] || keys['W'] || keys['ArrowUp']) s.p1.y = Math.max(0, s.p1.y - SPEED)
      if (keys['s'] || keys['S'] || keys['ArrowDown']) s.p1.y = Math.min(H - PADDLE_H, s.p1.y + SPEED)

      const target = s.ball.y - PADDLE_H / 2
      if (s.p2.y + PADDLE_H / 2 < target) s.p2.y = Math.min(H - PADDLE_H, s.p2.y + AI_SPEED)
      if (s.p2.y + PADDLE_H / 2 > target) s.p2.y = Math.max(0, s.p2.y - AI_SPEED)

      s.ball.x += s.ball.dx
      s.ball.y += s.ball.dy

      if (s.ball.y <= 0 || s.ball.y >= H - BALL_S) s.ball.dy *= -1

      if (s.ball.x <= PADDLE_W && s.ball.y + BALL_S > s.p1.y && s.ball.y < s.p1.y + PADDLE_H) {
        s.ball.dx = Math.abs(s.ball.dx)
        s.ball.dx += 0.3
      } else if (s.ball.x <= 0) {
        s.score2++
        s.ball = { x: W / 2, y: H / 2, dx: SPEED, dy: SPEED }
      }

      if (s.ball.x >= W - PADDLE_W - BALL_S && s.ball.y + BALL_S > s.p2.y && s.ball.y < s.p2.y + PADDLE_H) {
        s.ball.dx = -Math.abs(s.ball.dx)
        s.ball.dx -= 0.3
      } else if (s.ball.x >= W - BALL_S) {
        s.score1++
        s.ball = { x: W / 2, y: H / 2, dx: -SPEED, dy: SPEED }
      }

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)

      ctx.strokeStyle = '#333'
      ctx.lineWidth = 2
      ctx.setLineDash([10, 10])
      ctx.beginPath()
      ctx.moveTo(W / 2, 0)
      ctx.lineTo(W / 2, H)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.fillStyle = '#fff'
      ctx.fillRect(0, s.p1.y, PADDLE_W, PADDLE_H)
      ctx.fillRect(W - PADDLE_W, s.p2.y, PADDLE_W, PADDLE_H)
      ctx.fillRect(s.ball.x, s.ball.y, BALL_S, BALL_S)

      ctx.font = '48px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(s.score1, W / 2 - 60, 50)
      ctx.fillText(s.score2, W / 2 + 60, 50)

      animId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKey)
    }
  }, [])

  return (
    <>
      <h2>Pong</h2>
      <p style={{ marginBottom: 8 }}>W/S or Arrow keys to move.</p>
      <canvas ref={canvasRef} width={600} height={400} style={{ border: '2px solid #000', display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }} />
    </>
  )
}
