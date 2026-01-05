

import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from "three"

export default function Projects ({ clicked }) {

    const projectRef = useRef()
    const vec = new THREE.Vector3()
    const cameraX = 3
    const cameraY = 2
    const cameraZ = -1

    useFrame(state => {

        if(clicked){
            state.camera.lookAt(projectRef.current.position)

            state.camera.position.lerp(vec.set(
                projectRef.current.position.x + cameraX,
                projectRef.current.position.y + cameraY,
                projectRef.current.position.z + cameraZ,
            ), .01)
            state.camera.updateProjectionMatrix()

        }
        return null;
    })
    

    const HEIGHT = 6
    const LENGTH = 10
    const DEPTH = 0.5

    return(
        <> 
            <mesh
                ref={projectRef}
                position={[-9,-0,0]}
                onClick={console.log("Hello")}  
            >

                <boxGeometry  attach={"geometry"} args={[DEPTH,HEIGHT,LENGTH]}/>
                <meshLambertMaterial attach={"material"} color={"green"}/>
            </mesh>


        </>
    )

}
