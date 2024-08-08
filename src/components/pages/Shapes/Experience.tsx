
import {Box,OrbitControls,Torus, useKeyboardControls, } from "@react-three/drei";
import { RigidBody, RapierRigidBody} from "@react-three/rapier";
import { useRef,  useState, } from "react";
import { controls } from "./Shapes";
import { useFrame } from "@react-three/fiber";

export function Experience(){




    const car = useRef<RapierRigidBody>(null);
    const [,setHover] = useState(false)

    const jumpPressed = useKeyboardControls((state)=>state[controls.jump])
    const upPressed = useKeyboardControls((state)=>state[controls.forward])
    const downPressed = useKeyboardControls((state)=>state[controls.back])
    const leftPressed = useKeyboardControls((state)=>state[controls.left])
    const rightPressed = useKeyboardControls((state)=>state[controls.right])
    const kPressed = useKeyboardControls((state)=>state[controls.rotate])

    
    const handleMovement = ()=>{

        if(!isOnFloor.current) return

        if(upPressed)
            car.current?.applyImpulse({x:3 , y:0, z:0},false)
        if(downPressed)
            car.current?.applyImpulse({x:-3 , y:0, z:0},false)
        if(rightPressed)
            car.current?.applyImpulse({x:0 , y:0, z:3},false)
        if(leftPressed)
            car.current?.applyImpulse({x:0 , y:0, z:-3},false)
        if(kPressed)
            car.current?.applyTorqueImpulse({ x: 0, y: 10, z: 0 }, true);

        
    }



      function jump(){
        if(isOnFloor.current)
        car.current?.applyImpulse({x:4 , y:40, z:0},false)
        isOnFloor.current = false;
      }


      useFrame(()=>{
        if(jumpPressed){jump()}

        handleMovement();
      })

      const isOnFloor=useRef(true)

      const wallHeight = 5

    return(<>
    
        

    <ambientLight intensity={0.5} />
    <directionalLight position={[-10, 10, 0]} intensity={0.4} />
    <OrbitControls/>



        //Car
       <RigidBody type="dynamic" name="triangle" colliders="hull" position={[1,2,1]} ref={car} 
       onCollisionEnter={(e)=>{if(e.rigidBodyObject?.name==="floor"){isOnFloor.current = true}}}
       onCollisionExit={(e)=>{if(e.rigidBodyObject?.name==="floor"){isOnFloor.current = false}}}>
         <Box 
         position={[0,0,0]} 
         args={[5,0.1,5]} 
         onPointerEnter={()=>setHover(true)} 
         onPointerLeave={()=>setHover(false)}
         onClick={jump}>
        
         <meshBasicMaterial color="cyan"/>
         </Box>
         <Box position={[0,0.5,0]} args={[2.5,1,2.5]}>
         <meshBasicMaterial color="black"/>
         </Box>
         <Torus position={[2.5,0,2.5]} args={[0.2]}>

        <meshBasicMaterial color="limegreen"/>

         </Torus>
         <Torus position={[-2.5,0,2.5]} args={[0.2]}/>
         <Torus position={[2.5,0,-2.5]} args={[0.2]}/>
         <Torus position={[-2.5,0,-2.5]} args={[0.2]}/>
         
        </RigidBody>

        //BOX
        <RigidBody type="dynamic" name="box">
         <Box position={[5,2,5]}>
         <meshBasicMaterial color="green>"/>
         </Box>
        </RigidBody>



        //WALL

       

        <RigidBody  type="fixed" name="wall" colliders="cuboid">
         <Box position={[14.5,1,0]} args={[1,wallHeight,30]}>
         <meshStandardMaterial color="red"/>     
         </Box>
     
         <Box position={[0,1,15]} args={[30,wallHeight,1]}>
         <meshStandardMaterial color="red"/>     
         </Box>
      
         <Box position={[0,1,-15]} args={[30,wallHeight,1]}>
         <meshStandardMaterial color="red"/>     
         </Box>
         <Box position={[-14.5,1,0]} args={[1,wallHeight,30]}>
         <meshStandardMaterial color="red"/>     
         </Box>
        </RigidBody>


        //FLOOR
        <RigidBody  type="fixed" name="floor" friction={2}>
         <Box position={[0,0,0]} args={[30,1,30]}>
         <meshStandardMaterial color="blue"/>     
         </Box>
        </RigidBody>

     


    </>)




}