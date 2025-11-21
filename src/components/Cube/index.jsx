import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"

export  function Cube (position, size, color) {


    // Denne refernasen vill gi oss direkte tilgang til meshet som lar oss endre dens properties
    const boxRef = useRef()

    // States

    const [hovered, setHoverd] = useState(false)
    const [active, setActive] = useState(false)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    // Oppdaterer meshet over tid

    useFrame(()=>{

        boxRef.current.rotation.x += 0.005 + x
        boxRef.current.rotation.y += 0.005 + y
        boxRef.current.rotation.z += 0.005

    })


    const handleClick = () =>{
        setActive(!active)
        setX(x + 0.001)
        setY(y + 0.001)
    } 


    return(<>
        <mesh
        {...position}
        ref={boxRef}
        scale={active? 2 : 1.5}
        onClick={handleClick}
        onPointerOver={() => setHoverd(true)}
        onPointerOut={() => setHoverd(false)}
        >

        <boxGeometry args={size}/>
        <meshPhongMaterial color={hovered ? "hotpink" : "orange"}/>
        </mesh>
        </>
    )

}
