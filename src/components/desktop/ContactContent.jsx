import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './windows.css'
import { Button } from 'react-windows-xp'


export default function ContactContent() {
  const form = useRef()
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const sendEmail = (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const formData = new FormData(form.current)

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name: formData.get('name'),
        email: formData.get('email'),
        title: formData.get('title'),
        message: formData.get('message'),
      },
      EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setStatus('success')
        form.current.reset()
      })
      .catch((error) => {
        console.log(error)
        setStatus('error')
        setError('Failed to send. Please try again.')
      })
  }

  return (
    <>
      <h2>Contact</h2>
      <div className="contact-form" style={{ marginTop: 12 }}>
        <form ref={form} onSubmit={sendEmail}>
          <div className="field-row" style={{ marginBottom: 6 }}>
            <label htmlFor="name" style={{ width: 60, flexShrink: 0 }}>Name:</label>
            <input id="name" type="text" name="name" style={{ flex: 1, minWidth: 0 }} required />
          </div>
          <div className="field-row" style={{ marginBottom: 6 }}>
            <label htmlFor="email" style={{ width: 60, flexShrink: 0 }}>Email:</label>
            <input id="email" type="email" name="email" style={{ flex: 1, minWidth: 0 }} required />
          </div>
          <div className="field-row" style={{ marginBottom: 6 }}>
            <label htmlFor="Title" style={{ width: 60, flexShrink: 0 }}>Title:</label>
            <input id="Title" type="text" name="title" style={{ flex: 1, minWidth: 0 }} required />
          </div>
          <div className="field-row-stacked" style={{ marginBottom: 8 }}>
            <label htmlFor="msg">Message:</label>
            <textarea id="msg" name="message" rows={3} required />
          </div>

          {status === 'success' && (
            <p style={{ color: '#3c3', fontSize: 12, marginBottom: 6 }}>
              Message sent!
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
