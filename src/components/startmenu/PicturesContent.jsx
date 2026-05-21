import { useState, useEffect, useCallback } from 'react'

const CAT_API = 'https://api.thecatapi.com/v1/images/search?limit=4'
const DOG_API = 'https://api.thedogapi.com/v1/images/search?limit=4'

async function fetchPics() {
  const [cats, dogs] = await Promise.all([
    fetch(CAT_API).then(r => r.json()),
    fetch(DOG_API).then(r => r.json()),
  ])
  const tagged = [
    ...cats.map(c => ({ url: c.url, type: 'cat' })),
    ...dogs.map(d => ({ url: d.url, type: 'dog' })),
  ]
  for (let i = tagged.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tagged[i], tagged[j]] = [tagged[j], tagged[i]]
  }
  return tagged
}

export default function PicturesContent() {
  const [pics, setPics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPics()
      setPics(data)
    } catch {
      setError('Failed to load photos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <div style={{ textAlign: 'center' }}>
      {loading && <p style={{ fontSize: 12, color: '#888' }}>Loading...</p>}
      {error && <p style={{ fontSize: 12, color: '#c00' }}>{error}</p>}
      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8 }}>
          {pics.map((p, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img
                src={p.url}
                alt={p.type}
                style={{ width: '100%', height: 110, objectFit: 'cover', border: '1px solid #d4d0c8' }}
              />
              <span style={{
                position: 'absolute', bottom: 2, right: 2,
                background: 'rgba(0,0,0,0.6)', color: '#fff',
                fontSize: 10, padding: '1px 5px', borderRadius: 2,
              }}>
              </span>
            </div>
          ))}
        </div>
      )}
      <button onClick={load} disabled={loading}>More photos</button>
    </div>
  )
}
