


export default function Buttons ({setX, setY, setZ, x, y, z}) {


    return(<>


        <button type="button" onClick={()=>{setX(x-10)}}>-x</button>
        <button type="button" onClick={()=>{setX(x+10)}}>+x</button>
        <br/>
        <button type="button" onclick={()=>{setY(y-10)}}>-y</button>
        <button type="button" onclick={()=>{setY(y+10)}}>+y</button>
        <br/>
        <button type="button" onclick={()=>{setZ(z-10)}}>-z</button>
        <button type="button" onclick={()=>{setZ(z+10)}}>+z</button>




    </>)
    
}
