

import { useState } from "react";
import { useEffect} from 'react';
import './Calculator.css'
import sound from '../../../assets/sound.mp3'
import click from '../../../assets/click.mp3'
import Header from '../../header/Header'

export function Calculator(){

//HOOKS
const [display, setDisplay] = useState("")

let regExNumbers = /[0-9+\-/*]/
let regExOperator = /[+-/*]/ 
let sd = new Audio(sound)
let cl = new Audio(click)


useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
    return () => {
      document.removeEventListener("keydown", detectKeyDown, true);
    };
  }, []);


//KEYBOARD INPUT
const detectKeyDown = (e:any)=> {
    console.log("Key pressed:", e.key);
    if (regExNumbers.test(e.key)) 
        handleValue(e.key);
    else if (e.key === "Enter") {
        e.preventDefault();
        console.log("Enter key pressed");
        calculate();
    }
    else if (e.key === "Backspace") 
        clearDisplay();
  };


function handleValue (digit:string){

    //Kan ikke velge operatorer uten tall
    if (regExOperator.test(digit) && display.length<1) {setDisplay(""); return}

    //Kan ikke velge flere operatorer etter hverandre
   if(regExOperator.test(digit) && regExOperator.test(display.charAt(display.length-1))) {setDisplay(display); return} 

     setDisplay(prevDisplay => prevDisplay === "0" ? digit : prevDisplay + digit);
     sd.play()

     
     console.log(display + "  |   " + display.length)
     

}


function clearDisplay(){
    setDisplay("")
}
   

function calculate(){
    cl.play();
    try {
      const result = eval(display).toString();
      setDisplay(result);
    } catch (error) {
      setDisplay("Error");
    }
}



    return(
        <>
        <Header/>
        <h1 className="Calculator__Title">Calculator</h1>
        <div className="calculator">
         <input type="text" className="display" value={display}  readOnly ></input>
         <div className="buttons">
            <button className="kalkulator_knapper" onClick={()=>handleValue("7")}>7</button>
            <button className="kalkulator_knapper" onClick={()=>handleValue("8")}>8</button>
            <button className="kalkulator_knapper"onClick={()=>handleValue("9")}>9</button>
            <button onClick={()=>handleValue ("/")}className="operator kalkulator_knapper">/</button>
            <button className="kalkulator_knapper" onClick={()=>handleValue("4")}>4</button>
            <button className="kalkulator_knapper" onClick={()=>handleValue("5")}>5</button>
            <button className="kalkulator_knapper" onClick={()=>handleValue("6")}>6</button>
            <button onClick={()=>handleValue("*")} className="operator kalkulator_knapper">*</button>
            <button className="kalkulator_knapper" onClick={()=>handleValue("1")}>1</button>
            <button className="kalkulator_knapper" onClick={()=>handleValue("2")}>2</button>
            <button className="kalkulator_knapper" onClick={()=>handleValue("3")}>3</button>
            <button onClick={()=>handleValue("-")}  className="operator kalkulator_knapper">-</button>
            <button className="kalkulator_knapper" onClick={()=>handleValue('0')}>0</button>
            <button className="kalkulator_knapper" onClick={clearDisplay}>C</button>
            <button onClick={calculate} className="equal kalkulator_knapper">=</button>
            <button onClick={()=>handleValue("+")}className="operator kalkulator_knapper">+</button>
         </div>
        </div>

        </>
    );
    

}

