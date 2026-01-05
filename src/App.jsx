
import './App.css'
import { Canvas, useLoader } from '@react-three/fiber'
import { useState } from 'react'
import { Plane } from './components/Plane'
import { Wall } from './components/Wall'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Cylinder from './components/Cone'
export default function App() {

  const [clickedCone,setClickedCone]=useState(false)
  const [clickedAbout,setClickedAbout ]=useState(false)
  const [clickedProjects,setClickedProjects ]=useState(false)
  const [clickedContact,setClickedContact ]=useState(false)


  // LEGO
  function Model(){
    const result = useLoader(GLTFLoader,"/scene.gltf")
    return <primitive object={result.scene} position = {[7,-2,-7]} rotation={[0,180,0]}/>
  }

  const handleClick = ((page)=>{

    switch ( page ){

      case "Home":
        setClickedCone(true)
        setClickedProjects(false)
        setClickedAbout(false)
        setClickedContact(false)
        break

      case "Projects":
        setClickedCone(false)
        setClickedProjects(true)
        setClickedAbout(false)
        setClickedContact(false)
        break

      case "About":
        setClickedCone(false)
        setClickedProjects(false)
        setClickedAbout(true)
        setClickedContact(false)
        break

      case "Contact":
        setClickedCone(false)
        setClickedProjects(false)
        setClickedAbout(false)
        setClickedContact(true)
        break
    }


  })

  return (
    <>
      <header>
        <nav>
          <ul>
            <li><button onClick={()=>{handleClick("Home")}}>Home</button></li>
            <li><button onClick={()=>{handleClick("Projects")}}>Projects</button></li>
            <li><button onClick={()=>{handleClick("About")}}>About</button></li>
            <li><button onClick={()=>{handleClick("Contact")}}>Contact</button></li>
          </ul>
        </nav>
        <h1></h1>
      </header>

      <main >

        <h1>Richard Persson</h1>
        <section style={{ minHeight: "100vh" }}>
          <h2>About</h2>
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

      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
        }}
        camera={{ fov: 75, position: [0, 1, 2] }}
      >
        <Scene />
      </Canvas>


      <footer>
        <p>© Richard Persson 2025</p>
      </footer>
    </>
  )
}
