
import {Box,OrbitControls,Torus, useKeyboardControls, } from "@react-three/drei";
import { RigidBody, RapierRigidBody,quat} from "@react-three/rapier";
import { useRef,  useState, } from "react";
import { controls } from "./Shapes";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

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

    const kicker = useRef<any>();

    useFrame((_state,delta)=>{

      const currentRotation = quat(kicker.current.rotation())
      const increaseRotation = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), delta * 2 )
      currentRotation.multiply(increaseRotation);
      kicker.current.setNextKinematicRotation(currentRotation);
    })



      function jump(){
        if(isOnFloor.current)
        car.current?.applyImpulse({x:4 , y:10, z:0},false)
        isOnFloor.current = false;
      }


      useFrame(()=>{
        if(jumpPressed){jump()}

        handleMovement();
      })

      const isOnFloor=useRef(true)

    return(<>
    
        

    <ambientLight intensity={0.5} />
    <directionalLight position={[-10, 10, 0]} intensity={0.4} />
    <OrbitControls/>



        //BOX
       <RigidBody type="dynamic" name="triangle" colliders="hull" position={[1,2,1]} ref={car} 
       onCollisionEnter={(e)=>{if(e.rigidBodyObject?.name==="floor"){isOnFloor.current = true}}}
       onCollisionExit={(e)=>{if(e.rigidBodyObject?.name==="floor"){isOnFloor.current = false}}}>
         
      
         <Box position={[0,0,0]} args={[2,2,2]}
         onPointerEnter={()=>setHover(true)} 
         onPointerLeave={()=>setHover(false)}
         onClick={jump}>
       
         <meshBasicMaterial color="black"/>
         </Box>
      
        </RigidBody>

        //KICKER
        <RigidBody type="kinematicPosition" position={[0,0.75,0]} ref={kicker}>
         <group position={[2.5,0,0]}>

          <Box args={[15,0.5,0.5]}>
          <meshBasicMaterial color="green>"/>
           </Box>
         </group>
       
        </RigidBody>



        //WALL

       

        //FLOOR
        <RigidBody  type="fixed" name="floor" friction={2}>
         <Box position={[0,0,0]} args={[20,1,20]}>
         <meshStandardMaterial color="blue"/>     
         </Box>
        </RigidBody>

     


    </>)




}