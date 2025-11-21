export  function Wall ({x,y, rotation}) {

    let ROTATION = [0,0,0]
    if (rotation)
        ROTATION = [0,-Math.PI / 2,0]



    const LENGTH = 20
    const HEIGHT = 10



    return(<>
        <mesh
            position={[x,-1,y]}
            rotation = {ROTATION}
        >
            <planeGeometry  args={[LENGTH,HEIGHT]} />
            <meshStandardMaterial side={2} color={"blue"}/>
        </mesh>
    </>
    )

}
