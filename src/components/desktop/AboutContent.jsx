const skills = ['Java', 'Python', 'Rust', 'JavaScript', 'TypeScript', 'React', 'GO', 'Git', 'Docker']

import './windows.css'

export default function AboutContent() {
  return (
    <>
      <h2>About Me</h2>
      <p>
        Software engineer building stuff and trying new technologies. <br />

        Currently @Space Norway <br />
      </p>
      <p style={{ marginTop: 8 }}><strong>Skills:</strong></p>
      <div className="about-skills">
        {skills.map(s => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </>
  )
}
