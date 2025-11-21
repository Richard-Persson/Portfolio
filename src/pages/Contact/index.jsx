

import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from "three"

export default function Contact ({ clicked }) {

    const contactRef = useRef()
    const vec = new THREE.Vector3()
    const cameraX = 4
    const cameraY = 1
    const cameraZ = 7

    useFrame(state => {

        if(clicked){
            state.camera.lookAt(contactRef.current.position)

            state.camera.position.lerp(vec.set(
                contactRef.current.position.x + cameraX,
                contactRef.current.position.y + cameraY,
                contactRef.current.position.z + cameraZ
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
                ref={contactRef}
                position={[-0,0,-9]}
                rotation={[0,Math.PI/2,0]}
            >

                <boxGeometry  attach={"geometry"} args={[DEPTH,HEIGHT,LENGTH]}/>
                <meshLambertMaterial attach={"material"} color={"green"}/>
            </mesh>


        </>
    )

}
