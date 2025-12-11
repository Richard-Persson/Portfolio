
import titillium from "../../TitilliumWeb-Black.ttf"
import { Font, FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js'
import { Text } from '@react-three/drei'

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
    
    const HEIGHT = 10
    const LENGTH = 15
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

            { // Rød Boks 
            }

            <mesh position={[-3,2,-9]} rotation={[0,Math.PI/2,0]} >
                <boxGeometry  attach={"geometry"} args={[1,1,1]}/>
                <meshLambertMaterial attach={"material"} color={"red"}/>
            </mesh>

            <mesh position={[1.5,1,-9]} rotation={[0,Math.PI/2,0]} >
                <boxGeometry  attach={"geometry"} args={[1,1,1]}/>
                <meshLambertMaterial attach={"material"} color={"blue"}/>
            </mesh>

            <mesh position={[-2,0,-9]} rotation={[0,Math.PI/2,0]} >
                <boxGeometry  attach={"geometry"} args={[1,1,1]}/>
                <meshLambertMaterial attach={"material"} color={"yellow"}/>
            </mesh>

            <Text 
                 font={titillium}
                rotateY={90}
                position={[-3,2,-8.5 ]}
                fontSize={0.25}
                >
                Projects
                

                <meshBasicMaterial color={"white"}/>
            </Text>

            <Text 
                 font={titillium}
                rotateY={90}
                position={[-2,0,-8.5 ]}
                fontSize={0.25}
                >
                About
                

                <meshBasicMaterial color={"white"}/>
            </Text>

            <Text 
                 font={titillium}
                rotateY={90}
                position={[1.5,1,-8.5 ]}
                fontSize={0.25}
                >
                Home
                

                <meshBasicMaterial color={"white"}/>
            </Text>
        </>
    )

}
