import './StartMenu.css'

export default function StartMenu({ sections, onItemClick, onClose }) {
  const leftItems = [
    { key: 'home', icon: '🏠', title: 'Home', desc: 'Welcome page' },
    { key: 'pong', icon: '🏓', title: 'Pong', desc: '' },
    { key: 'pinball', icon: '🕹️', title: 'Pinball', desc: 'Space Cadet' },
  ]

  const rightItems = [
    { icon: '🖼️', label: 'Pictures', key: 'pictures' },
    { icon: '🎵', label: 'Radio', key: 'music' },
    { icon: '💻', label: 'Computer', key: 'computer' },
  ]

  return (
    <div className="start-menu-wrapper">
      <div className="start-menu-backdrop" onClick={onClose} />
      <div className="start-menu">
        <div className="start-menu-header">
          <div
            className="user-avatar"
            style={{
              background: 'linear-gradient(135deg, #6dc4ff, #1a4db3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}
          >
            👤
          </div>
          <span className="user-name">Richard Persson</span>
        </div>

        <div className="start-menu-body">
          <div className="start-menu-left">
            {leftItems.map((item, i) => (
              <div key={item.key}>
                {i === 1 && <div className="start-menu-divider" />}
                <div className="start-menu-item" onClick={() => onItemClick(item.key)}>
                  <span className="item-icon">{item.icon}</span>
                  <div>
                    <div className="item-text">{item.title}</div>
                    <div className="item-desc">{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="start-menu-right">
            {rightItems.map(item => (
              <div
                key={item.label}
                className="start-menu-item"
                onClick={() => item.key && onItemClick(item.key)}
              >
                <span className="item-icon">{item.icon}</span>
                <span className="item-text">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="start-menu-footer">
          <button>
            <span className="footer-icon">🔒</span>
            Log Off
          </button>
          <button>
            <span className="footer-icon">⏻</span>
            Turn Off Computer
          </button>
        </div>
      </div>
    </div>
  )
}
