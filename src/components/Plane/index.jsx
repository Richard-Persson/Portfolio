

export  function Plane () {




    const ROTATION = [-Math.PI / 2,0,0]
    const SIZE = 20



    return(<>
        <mesh
            rotation={ROTATION}
            position={[0,-3,0]}
        >

            <gridHelper args={[SIZE]} rotation={ROTATION} />
            <axesHelper args={[SIZE/2]} rotation={ROTATION}/>

            <planeGeometry  args={[SIZE,SIZE]}/>
            <meshStandardMaterial side={2} color={"light-grey"}/>
        </mesh>
    </>
    )

}
