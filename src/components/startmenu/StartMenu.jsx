import { APPLICATIONS } from '../../classes'
import './StartMenu.css'

export default function StartMenu({ onItemClick, onClose }) {
  const leftItems = Object.entries(APPLICATIONS)
    .filter(([, v]) => v.component === 'startMenuLeft')
    .map(([key, v]) => ({ key, icon: v.icon, title: v.title }))

  const rightItems = Object.entries(APPLICATIONS)
    .filter(([, v]) => v.component === 'startMenuRight')
    .map(([key, v]) => ({ key, icon: v.icon, title: v.title }))

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
            <img src="dog.png" />
          </div>
          <span className="user-name">Richard Persson</span>
        </div>

        <div className="start-menu-body">
          <div className="start-menu-left">
            {leftItems.map((item, i) => (
              <div key={item.key}>
                {i === 1 && <div className="start-menu-divider" />}
                <div className="start-menu-item" onClick={() => onItemClick(item.key)}>
                  <img className="item-icon" src={item.icon} />
                  <div>
                    <div className="item-text">{item.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="start-menu-right">
            {rightItems.map(item => (
              <div
                key={item.key}
                className="start-menu-item"
                onClick={() => item.key && onItemClick(item.key)}
              >
                <img className="item-icon" src={item.icon} />
                <span className="item-text">{item.title}</span>
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
