import { useState, useEffect, useRef, useMemo } from 'react'
import './radio.css'

const API_BASE = 'https://de1.api.radio-browser.info'

export default function RadioContent({ volume }) {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [stations, setStations] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [view, setView] = useState('countries')
  const [playingTitle, setPlayingTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const audioRef = useRef(null)

  useEffect(() => {
    fetch(`${API_BASE}/json/countries?order=stationcount&reverse=true&hidebroken=true`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(d => setCountries(d))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const filteredCountries = useMemo(() => {
    if (!search) return countries.slice(0, 80)
    const q = search.toLowerCase()
    return countries.filter(c =>
      c.name.toLowerCase().includes(q)
    ).slice(0, 120)
  }, [search, countries])

  const openCountry = async (country) => {
    setSelectedCountry(country)
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `${API_BASE}/json/stations/bycountrycodeexact/${country.iso_3166_1}?order=clickcount&reverse=true&limit=100&hidebroken=true`
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setStations(data)
      setView('stations')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const togglePlay = (station) => {
    if (!audioRef.current) return
    const id = station.stationuuid
    if (audioRef.current.dataset.stationId === id && !audioRef.current.paused) {
      audioRef.current.pause()
      setPlayingTitle('')
    } else {
      audioRef.current.src = station.url_resolved || station.url
      audioRef.current.dataset.stationId = id
      audioRef.current.play().catch(() => {})
      setPlayingTitle(station.name)
    }
  }

  return (
    <>
      <audio ref={audioRef} />

      {view === 'countries' && (
        <>
          <div className="radio-search">
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="radio-list">
            {filteredCountries.map(c => (
              <div
                key={c.iso_3166_1}
                className="radio-item"
                onClick={() => openCountry(c)}
              >
                <span className="radio-item-title">{c.name}</span>
                <span className="radio-item-country">{c.stationcount} stations</span>
                <span className="radio-arrow">→</span>
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'stations' && (
        <>
          <div
            className="radio-back"
            onClick={() => { setView('countries'); setError(null) }}
          >
            ← {selectedCountry?.name || ''}
          </div>
          <div className="radio-list">
            {loading && <div className="radio-loading">Loading stations...</div>}
            {error && <div className="radio-error">{error}</div>}
            {!loading && !error && stations.length === 0 && (
              <div className="radio-error">No stations found</div>
            )}
            {stations.map(s => {
              const isPlaying = audioRef.current?.dataset.stationId === s.stationuuid && !audioRef.current?.paused
              const sub = [s.codec, s.bitrate > 0 ? `${s.bitrate}k` : ''].filter(Boolean).join(' ')
              return (
                <div
                  key={s.stationuuid}
                  className={`radio-item ${isPlaying ? 'playing' : ''}`}
                  onClick={() => togglePlay(s)}
                >
                  <span className="radio-play-icon">
                    {isPlaying ? '⏹' : '▶️'}
                  </span>
                  <span className="radio-item-title">{s.name}</span>
                  {sub && <span className="radio-item-country">{sub}</span>}
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
