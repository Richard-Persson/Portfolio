import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from "three"

export default function Cylinder ({clicked}) {

    const markerRef = useRef()
    const vec = new THREE.Vector3()

    useFrame(state => {

        if(clicked){
            state.camera.lookAt(markerRef.current.position)

            state.camera.position.lerp(vec.set(
                markerRef.current.position.x,
                markerRef.current.position.y + 2,
                markerRef.current.position.z + 5
            ), .01)
            state.camera.updateProjectionMatrix()

        }
        return null;
    })
    
    const HEIGHT = 20
    const WIDTH = 1
    const LENGTH = 1

    

    return(
        <> 
            <mesh ref={markerRef} >

                <cylinderGeometry attach={"geometry"} args={[WIDTH,LENGTH,HEIGHT]}/>
                <meshLambertMaterial attach={"material"} color={"red"}/>
            </mesh>


        </>
    )

}
