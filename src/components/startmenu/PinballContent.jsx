export default function PinballContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 500 }}>
      <div style={{ fontSize: 10, color: '#888', padding: '2px 0 4px', textAlign: 'center', flexShrink: 0 }}>
        Z=left flipper &nbsp; C=right flipper &nbsp; X=tilt &nbsp; Space=launch &nbsp; R=restart
      </div>
      <iframe
        src="/pinball/index.html"
        title="3D Pinball Space Cadet"
        style={{ width: '100%', height: 540, border: '1px solid #d4d0c8', background: '#000' }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}
