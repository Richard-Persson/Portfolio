const projects = [
  { name: 'Portfolio', desc: 'Portfolio you\'re viewing right now', tech: 'React ' },
  { name: 'Cohort Manager', desc: 'Full-stack web application in built association with \"boolean uk\"', tech: 'Java, SpringBoot, React, PostgreSQL' },
  { name: 'SAP v2', desc: 'Created a copy of SAP to log hours worked', tech: 'GO, React' },
  { name: 'CLI Tools', desc: 'Various CLI-tools for learning rust', tech: 'Rust' },
]

import './windows.css'

export default function ProjectsContent() {
  return (
    <>
      <h2>Projects</h2>
      <p>Here are some of the projects I've been working on:</p>
      <div style={{ marginTop: 12 }}>
        {projects.map((p, i) => (
          <div key={i} className="project-item">
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <p style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{p.tech}</p>
          </div>
        ))}
      </div>
    </>
  )
}
