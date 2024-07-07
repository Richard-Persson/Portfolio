import { Link } from "react-router-dom"
import Ball from "../../balls/balls"
import Game from './TicTacToeGame'
import  "./TicTacToe.css"

export function TicTacToe(){


    return(<>
        <div className="toolsTTT">
            <Link to="/" >
            <button className="back">Home</button>
            </Link>
            <Ball src="js.png"/>
            <Ball src="react.png"/>
           
        </div>
        <h1>TicTacToe</h1>
         <Game/>
       

    </>)
}