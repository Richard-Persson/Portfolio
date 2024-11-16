

import {BallProps} from "../type"

import './balls.css'


export default function Balls(props:BallProps){


    return(<>
    <img className='Ball' src={props.src}/>
    </>)
}