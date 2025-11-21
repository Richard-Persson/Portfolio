
export  function Sphere (position, size) {




    return(<>
        <mesh {...position} >

        <sphereGeometry args={size}/>
        <meshPhongMaterial color={"red"}/>
        </mesh>
        </>
    )
    
}
