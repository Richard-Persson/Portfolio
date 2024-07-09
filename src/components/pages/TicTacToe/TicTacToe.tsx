
import Game from './TicTacToeGame'
import  "./TicTacToe.css"
import Header from '../../header/Header'

export function TicTacToe(){


    return(<>
    <Header/>
     
        <h1 className='title'>TicTacToe</h1>
         <Game/>
     

    </>)
}