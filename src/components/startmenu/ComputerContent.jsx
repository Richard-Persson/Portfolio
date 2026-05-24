const SPECS = [
  ['Model', 'Packard Bell iMedia 1205'],
  ['CPU', 'Intel Celeron 1.7 GHz (128 KB cache)'],
  ['RAM', '128 MB SDRAM (PC133)'],
  ['Storage', '20 GB HDD (5400 RPM, 2 MB buffer)'],
  ['GPU', 'Intel 82845G Integrated (shared 8 MB)'],
  ['Monitor', '15" CRT, 1024×768 @ 60 Hz'],
  ['Optical', 'CD-ROM 48x (not DVD!)'],
  ['Modem', '56k V.92 PCI soft modem'],
  ['Sound', 'AC\'97 onboard'],
  ['Floppy', '1.44 MB 3.5" floppy drive'],
  ['OS', 'Windows XP Home SP1 (no SP2!)'],
  ['Condition', 'Yellowed plastic, missing case screw, fan sounds like a jet engine'],
]

export default function ComputerContent() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 200px', minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 'bold', color: '#1a3a6e', margin: '0 0 8px' }}>
          System Properties
        </p>
        <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}>
          <tbody>
            {SPECS.map(([label, value]) => (
              <tr key={label}>
                <td style={{ padding: '2px 6px 2px 0', color: '#555', whiteSpace: 'nowrap', verticalAlign: 'top', width: 70 }}>{label}:</td>
                <td style={{ padding: '2px 0', color: '#222', verticalAlign: 'top' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ flexShrink: 0, width: 180, maxWidth: '100%' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Dell_Desktop_Computer_in_school_classroom.jpg"
          alt="Old Dell PC running Windows XP"
          style={{ width: '100%', border: '1px solid #d4d0c8', background: '#fff' }}
        />
      </div>
    </div>
  )
}
