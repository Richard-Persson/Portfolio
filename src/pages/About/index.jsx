import { useRef } from 'react'
import { useFrame,extend } from '@react-three/fiber'
import * as THREE from "three"
import { Font, FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js'
import titillium from "../../TitilliumWeb-Black.ttf"
import { Text } from '@react-three/drei'

extend({TextGeometry})

export default function About ({ clicked }) {

    const aboutRef = useRef()
    const vec = new THREE.Vector3()
    const cameraX = -5
    const cameraY = 1
    const cameraZ = -3
    

    useFrame(state => {

        if(clicked){
            state.camera.lookAt(aboutRef.current.position)

            state.camera.position.lerp(vec.set(
                aboutRef.current.position.x + cameraX,
                aboutRef.current.position.y + cameraY,
                aboutRef.current.position.z + cameraZ
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
                ref={aboutRef}
                position={[9,-0,0]}
            >

            <Text 
                 font={titillium}
                rotateY={90}
                position={[-9,1,-8 ]}
                fontSize={0.4}
                >
                Richard Persson {"\n"}
                mail: ricpersson00@gmail.com{"\n"}
                phone: +47 47658338 {"\n"}
                linkedIn: Richard Persson

                <meshBasicMaterial color={"white"}/>
            </Text>
                <boxGeometry  attach={"geometry"} args={[DEPTH,HEIGHT,LENGTH]}/>
                <meshLambertMaterial attach={"material"} color={"green"}/>
            </mesh>





        </>
    )

}
