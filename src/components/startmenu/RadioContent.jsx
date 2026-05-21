import { useState, useEffect, useRef, useMemo } from 'react'
import './radio.css'

const PROXY_API = '/radio-api'

const PRESET_STATIONS = [
  { id: 'yamxtCoy', title: 'Cologne', country: 'Germany' },
  { id: '6lcXHtKK', title: 'Berlin', country: 'Germany' },
  { id: '8uotztrv', title: 'Munich', country: 'Germany' },
  { id: 'iATDp23j', title: 'Düsseldorf', country: 'Germany' },
  { id: '0eZoYyEW', title: 'London', country: 'United Kingdom' },
  { id: 'B7DS4V1m', title: 'Paris', country: 'France' },
  { id: 'eR8K4rBb', title: 'Tokyo', country: 'Japan' },
  { id: '9Yi25umJ', title: 'New York', country: 'United States' },
  { id: 'uNB8u2o7', title: 'Sydney', country: 'Australia' },
  { id: 'BMplqTGe', title: 'São Paulo', country: 'Brazil' },
]

async function apiFetch(path) {
  const url = `${PROXY_API}${path}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export default function RadioContent({ volume }) {
  const [search, setSearch] = useState('')
  const [places, setPlaces] = useState([])
  const [channels, setChannels] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [view, setView] = useState('places')
  const [playingTitle, setPlayingTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const audioRef = useRef(null)

  useEffect(() => {
    apiFetch('/places')
      .then(d => setPlaces(d.data.list))
      .catch(() => {
        setPlaces(PRESET_STATIONS)
      })
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const filteredPlaces = useMemo(() => {
    const list = places.length > 0 ? places : PRESET_STATIONS
    if (!search) return list.slice(0, 80)
    const q = search.toLowerCase()
    return list.filter(p =>
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.country && p.country.toLowerCase().includes(q))
    ).slice(0, 120)
  }, [search, places])

  const openPlace = async (place) => {
    const placeId = place.id || place
    setSelectedPlace(place)
    setLoading(true)
    setError(null)
    try {
      const data = await apiFetch(`/page/${placeId}`)
      const allChannels = []
      data.data.content.forEach(section => {
        if (section.type === 'list' && section.itemsType === 'channel') {
          section.items.forEach(item => {
            if (item.page?.type === 'channel') {
              allChannels.push(item.page)
            }
          })
        }
      })
      setChannels(allChannels)
      setView('channels')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const togglePlay = (channel) => {
    if (!audioRef.current) return
    const id = channel.url.split('/').pop()
    if (audioRef.current.dataset.channelId === id && !audioRef.current.paused) {
      audioRef.current.pause()
      setPlayingTitle('')
    } else {
      const listenUrl = `https://radio.garden/api/ara/content/listen/${id}/channel.mp3`
      audioRef.current.src = listenUrl
      audioRef.current.dataset.channelId = id
      audioRef.current.play().catch(() => {})
      setPlayingTitle(channel.title)
    }
  }

  const currentPlace = selectedPlace
    ? (selectedPlace.title || selectedPlace)
    : ''

  return (
    <>
      <audio ref={audioRef} />

      {view === 'places' && (
        <>
          <div className="radio-search">
            <input
              type="text"
              placeholder="Search cities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="radio-list">
            {filteredPlaces.map(p => {
              const placeId = p.id
              return (
                <div
                  key={placeId}
                  className="radio-item"
                  onClick={() => openPlace(p)}
                >
                  <span className="radio-item-title">{p.title}</span>
                  <span className="radio-item-country">{p.country}</span>
                  <span className="radio-arrow">→</span>
                </div>
              )
            })}
          </div>
        </>
      )}

      {view === 'channels' && (
        <>
          <div
            className="radio-back"
            onClick={() => { setView('places'); setError(null) }}
          >
            ← {currentPlace}
          </div>
          <div className="radio-list">
            {loading && <div className="radio-loading">Loading stations...</div>}
            {error && <div className="radio-error">{error}</div>}
            {!loading && !error && channels.length === 0 && (
              <div className="radio-error">No stations found</div>
            )}
            {channels.map(ch => {
              const id = ch.url.split('/').pop()
              const isPlaying = audioRef.current?.dataset.channelId === id && !audioRef.current?.paused
              return (
                <div
                  key={id}
                  className={`radio-item ${isPlaying ? 'playing' : ''}`}
                  onClick={() => togglePlay(ch)}
                >
                  <span className="radio-play-icon">
                    {isPlaying ? '⏹' : '▶️'}
                  </span>
                  <span className="radio-item-title">{ch.title}</span>
                  <span className="radio-item-country">
                    {ch.place?.title || ch.subtitle || ''}
                  </span>
                </div>
              )
            })}
          </div>
        </>
      )}

      {playingTitle && (
        <div className="radio-now-playing">
          <span className="radio-np-text">Now Playing: {playingTitle}</span>
        </div>
      )}
    </>
  )
}
