import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './windows.css'
import { Button } from 'react-windows-xp'

export default function ContactContent() {
  const form = useRef()
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const sendEmail = (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setStatus('success')
        form.current.reset()
      })
      .catch((err) => {
        setStatus('error')
        setError(err.text || 'Failed to send. Please try again.')
      })
  }

  return (
    <>
      <h2>Contact</h2>
      <div className="contact-form" style={{ marginTop: 12 }}>
        <form ref={form} onSubmit={sendEmail}>
          <div className="field-row" style={{ marginBottom: 6 }}>
            <label htmlFor="name" style={{ width: 60 }}>Name:</label>
            <input id="name" type="text" name="user_name" style={{ flex: 1 }} required />
          </div>
          <div className="field-row" style={{ marginBottom: 6 }}>
            <label htmlFor="email" style={{ width: 60 }}>Email:</label>
            <input id="email" type="email" name="user_email" style={{ flex: 1 }} required />
          </div>
          <div className="field-row-stacked" style={{ marginBottom: 8 }}>
            <label htmlFor="msg">Message:</label>
            <textarea id="msg" name="message" rows={3} required />
          </div>

          {status === 'success' && (
            <p style={{ color: '#3c3', fontSize: 12, marginBottom: 6 }}>
              Message sent! I&apos;ll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p style={{ color: '#c33', fontSize: 12, marginBottom: 6 }}>
              {error}
            </p>
          )}

          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
      <p style={{ marginTop: 12, fontSize: 11, color: '#666' }}>
        GitHub: github.com/richard-persson
      </p>
    </>
  )
}
