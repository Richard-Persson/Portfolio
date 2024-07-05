
import {useState} from 'react'
import './card.css'
import { CardProps } from '../type'


const Card = (props: CardProps) => {

    //Hook
    const [showText, setShowText] = useState<boolean>(false);



    function beskrivelse(){
        setShowText(!showText);
    }

return(<>

<div className="container">
    <div className="imageContainer ">
    <img onClick={beskrivelse} className='cardImg' src={props.img} />

    {showText && <div className="overlayText" onClick={beskrivelse}>  <br/>{props.tools}<br/></div>}

    </div>
    <p className="desc">{props.name}</p> 

    

</div>


</>)    


}

export default Card