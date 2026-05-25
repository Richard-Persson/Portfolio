import { useState, useCallback, useRef } from 'react'
import { Wallpaper } from 'react-windows-xp'
import './App.css'
import Taskbar from './components/taskbar/Taskbar'
import StartMenu from './components/startmenu/StartMenu'
import DesktopIcons from './components/desktop/DesktopIcons'
import XPWindow from './components/XPWindow'
import HomeContent from './components/desktop/HomeContent'
import ProjectsContent from './components/desktop/ProjectsContent'
import AboutContent from './components/desktop/AboutContent'
import ContactContent from './components/desktop/ContactContent'
import PongContent from './components/startmenu/PongContent'
import PinballContent from './components/startmenu/PinballContent'
import RadioContent from './components/startmenu/RadioContent'
import PicturesContent from './components/startmenu/PicturesContent'
import ComputerContent from './components/startmenu/ComputerContent'
import ClippyAssistant from './components/taskbar/ClippyAssistant'
import { useWindowDrag } from './hooks/useWindowDrag'

const SECTIONS = {
  home: { title: 'Home', icon: '🏠', x: 60, y: 40, width: 500, height: 320 },
  projects: { title: 'Projects', icon: '📁', x: 120, y: 100, width: 540, height: 380 },
  about: { title: 'About Me', icon: '👤', x: 640, y: 60, width: 480, height: 340 },
  contact: { title: 'Contact', icon: '✉️', x: 600, y: 300, width: 460, height: 300 },
  pong: { title: 'Pong', icon: '🏓', x: 120, y: 80, width: 640, height: 500 },
  pinball: { title: 'Pinball', icon: '🕹️', x: 300, y: 120, width: 720, height: 620 },
  music: { title: 'Radio', icon: '🎵', x: 200, y: 80, width: 400, height: 360 },
  pictures: { title: 'Pictures', icon: '🖼️', x: 140, y: 60, width: 440, height: 400 },
  computer: { title: 'Computer', icon: '💻', x: 80, y: 40, width: 520, height: 380 },
}

const desktopIcons = [
  { key: 'projects', icon: 'folder2.png', label: 'Projects' },
  { key: 'about', icon: 'person.png', label: 'About Me' },
  { key: 'contact', icon: 'contacticon.png', label: 'Contact' },
]

const WINDOW_CONTENT = {
  home: <HomeContent />,
  projects: <ProjectsContent />,
  about: <AboutContent />,
  contact: <ContactContent />,
  pong: <PongContent />,
  pinball: <PinballContent />,
  music: <RadioContent />,
  pictures: <PicturesContent />,
  computer: <ComputerContent />,
}

function buildInitialWindows() {
  return Object.fromEntries(
    Object.entries(SECTIONS).map(([key, val]) => [key, {
      open: key === 'home',
      minimized: false,
      x: val.x,
      y: val.y,
      width: val.width,
      height: val.height,
      zIndex: key === 'home' ? 2 : 1,
    }])
  )
}

export default function App() {
  const [windows, setWindows] = useState(buildInitialWindows)
  const [startOpen, setStartOpen] = useState(false)
  const [maxZ, setMaxZ] = useState(5)
  const [activeWindow, setActiveWindow] = useState('')
  const [clippyVisible, setClippyVisible] = useState(true)
  const [volume, setVolume] = useState(1)

  const maxZRef = useRef(maxZ)
  maxZRef.current = maxZ

  const focusWindow = useCallback((name) => {
    setActiveWindow(name)
    const nextZ = maxZRef.current + 1
    setMaxZ(nextZ)
    setWindows(prev => ({
      ...prev,
      [name]: { ...prev[name], zIndex: nextZ }
    }))
  }, [])

  const { handleMouseDown } = useWindowDrag(windows, setWindows, focusWindow)

  const toggleMinimize = (name) => {
    setWindows(prev => ({
      ...prev,
      [name]: { ...prev[name], minimized: !prev[name].minimized }
    }))
  }

  const closeWindow = (name) => {
    setWindows(prev => ({
      ...prev,
      [name]: { ...prev[name], open: false }
    }))
  }

  const openWindow = (section) => {
    if (section === 'clippy') {
      setClippyVisible(v => !v)
      return
    }
    setWindows(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        open: true,
        minimized: false,
      }
    }))
    focusWindow(section)
  }

  const handleStartClick = (section) => {
    openWindow(section)
    setStartOpen(false)
  }

  const handleTaskbarWindowClick = (name) => {
    const win = windows[name]
    if (win.minimized || name !== activeWindow) {
      setWindows(prev => ({ ...prev, [name]: { ...prev[name], minimized: false } }))
      focusWindow(name)
    } else {
      toggleMinimize(name)
    }
  }

  const openWindows = Object.entries(windows).filter(([, w]) => w.open)

  return (
    <div className="desktop">
      <Wallpaper fullScreen>
        <DesktopIcons items={desktopIcons} onDoubleClick={openWindow} />

        {openWindows.map(([name, win]) => (
          <XPWindow
            key={name}
            name={name}
            win={win}
            title={SECTIONS[name].title}
            icon={SECTIONS[name].icon}
            onMouseDown={handleMouseDown}
            onMinimize={toggleMinimize}
            onClose={closeWindow}
            onFocus={focusWindow}
          >
            {name === 'music'
              ? <RadioContent volume={volume} />
              : WINDOW_CONTENT[name]
            }
          </XPWindow>
        ))}

        {clippyVisible && <ClippyAssistant activeWindow={activeWindow} />}
      </Wallpaper>

      <Taskbar
        windows={Object.entries(SECTIONS).reduce((acc, [key, val]) => {
          acc[key] = { ...windows[key], icon: val.icon, title: val.title }
          return acc
        }, {})}
        activeWindow={activeWindow}
        onStartClick={() => { setStartOpen(!startOpen); setActiveWindow(null) }}
        onWindowClick={handleTaskbarWindowClick}
        onClippyToggle={() => setClippyVisible(v => !v)}
        clippyVisible={clippyVisible}
        volume={volume}
        onVolumeChange={setVolume}
      />

      {startOpen && (
        <StartMenu
          sections={SECTIONS}
          onItemClick={handleStartClick}
          onClose={() => setStartOpen(false)}
        />
      )}
    </div>
  )
}
