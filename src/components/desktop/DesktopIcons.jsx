import './DesktopIcons.css'

export default function DesktopIcons({ items, onDoubleClick }) {
  return (
    <div className="desktop-icons">
      {items.map(item => (
        <div
          key={item.key}
          className="desktop-icon"
          onDoubleClick={() => onDoubleClick(item.key)}
        >
          <div className="icon-img">{item.icon}</div>
          <div className="icon-label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
