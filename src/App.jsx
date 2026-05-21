import './App.css'

export default function App() {




  return (
    <>
      <header>
        <nav>
          <ul>
            <li><button onClick={() => { handleClick("Home") }}>Home</button></li>
            <li><button onClick={() => { handleClick("Projects") }}>Projects</button></li>
            <li><button onClick={() => { handleClick("About") }}>About</button></li>
            <li><button onClick={() => { handleClick("Contact") }}>Contact</button></li>
          </ul>
        </nav>
        <h1></h1>
      </header>

      <main >

        <h1>Richard Persson</h1>
        <section style={{ minHeight: "100vh" }}>
        </section>
        <section style={{ minHeight: "100vh" }}>
          <h2>Projects</h2>
        </section>
        <section style={{ minHeight: "100vh" }}>
          <h2>Contact</h2>
        </section>
        <section style={{ minHeight: "100vh" }}>
          <h2>Changing Camera Position</h2>
        </section>
        <section style={{ minHeight: "100vh" }}>
          <h2>You are at the bottom</h2>
        </section>
      </main>



      <footer>
        <p>© Richard Persson 2025</p>
      </footer>
    </>
  )
}
