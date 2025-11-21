
import './App.css'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { FirstPersonControls} from '@react-three/drei'
import * as THREE from "three"
import { Cube } from './components/Cube'
import { useState, useRef } from 'react'
import { Plane } from './components/Plane'
import { Wall } from './components/Wall'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import Cone from './components/Cone'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
export default function App() {

    const [clickedCone,setClickedCone]=useState(true)
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
                <h1>Richard Persson</h1>
            </header>

            <main>
                <div id="canvas-container">

                    <Canvas  camera={ {position: [0,0,4], fov:75}}>

                        <FirstPersonControls mouseDragOn={false} movementSpeed={5}/>
                        <spotLight intensity={[1,2,3]} position={[0,0,0]}/>
                        <ambientLight intensity={0.9} />
                        <directionalLight color="red" position={[0, 0, 0]} />
                        <Model />

                        <Cube position = {[4,0,0]} size = {[1,1,1]}/>
                        <Cube position = {[-4,0,0]} size = {[1,1,1]}/>

                        {/* Scenen */}
                        <Wall x={10} y={0} rotation={true}/>
                        <Wall x={-10} y={0} rotation={true}/>
                        <Wall y={10} x={0}/>
                        <Wall y={-10} x={0}/>
                        <Plane/>


                        {/* Sider */}

                        <Cone     clicked={clickedCone}/>
                        <Projects clicked={clickedProjects}/>
                        <About    clicked={clickedAbout}/>
                        <Contact  clicked={clickedContact}/>


                    </Canvas>
                </div>
                <h2>2025</h2>
            </main>

            <footer>
                <p>© Richard Persson 2025</p>
            </footer>
        </>
    )
}
