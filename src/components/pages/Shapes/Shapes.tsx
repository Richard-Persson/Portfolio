

import { Canvas } from "@react-three/fiber";
import { Physics,} from "@react-three/rapier";
import { Suspense } from "react";
import { Experience } from "./Experience";
import "./Shapes.css"
import Header from "../../header/Header";
import { useMemo } from "react";
import { KeyboardControls } from "@react-three/drei";



export const controls = {

    forward: "forward",
    back: "back",
    left: "left",
    right: "right",
    jump: "jump",
    rotate:"rotate"

}


export function Shapes(){


    const map = useMemo(()=>[

        { name: controls.forward, keys: ["ArrowUp", "KeyW"]},
        { name: controls.back, keys: ["ArrowDown", "KeyS"]},
        { name: controls.left, keys: ["ArrowLeft", "KeyA"]},
        { name: controls.right, keys: ["ArrowRight", "KeyD"]},
        { name: controls.jump, keys: ["Space"]},
        { name: controls.rotate, keys: ["KeyK"]}


],[])

    return (
        <>

        <Header/>
       
       <KeyboardControls map={map}>  
           <Canvas className="canvas" shadows camera={{ position: [-40, 30, 0], fov: 30 }}>
         <color attach="background" args={["#ececec"]} />
         <Suspense>
          <Physics debug >
           <Experience/>
          </Physics>
         </Suspense>
        </Canvas>
        </KeyboardControls>
        </>
    
    );

}