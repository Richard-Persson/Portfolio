import { Window } from 'react-windows-xp'

export default function XPWindow({ name, win, title, onMouseDown, onMinimize, onClose, children }) {
  return (
    <div
      className="xp-window"
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        zIndex: win.zIndex,
        display: win.minimized ? 'none' : 'block',
      }}
      onMouseDown={(e) => onMouseDown(e, name)}
    >
      <Window
        title={title}
        showMinimize
        showClose
        onMinimize={() => onMinimize(name)}
        onClose={() => onClose(name)}
      >
        <div className="window-content">{children}</div>
      </Window>
    </div>
  )
}
