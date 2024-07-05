import { useState } from 'react'
import './conversion.css'
import currencyapi from '@everapi/currencyapi-js'


function Input() {

//STATES
  const [amount,setAmount] = useState(0);
  const [converted, setConverted] = useState(0)
  const [before,setBefore] = useState(0)
  const [fraValuta,setFraValuta] = useState("EUR")
  const [tilValuta,setTilValuta] = useState("USD")

//INIT
  const giVerdiFra = (e:any)=>{setFraValuta(e.target.value); calculate()}
  const giVerdiTil = (e:any)=> {setTilValuta(e.target.value); calculate()} 
  const number     = (e:any)=> setAmount(e.target.value)

//API client
  const client = new currencyapi(process.env.REACT_APP_API_KEY )

  const calculate = ()=>{
      setBefore(amount)
    client.latest({
      base_currency: fraValuta,
      currencies:  tilValuta
  }).then((response: { data: { [x: string]: { value: any; }; }; }) => {
  const rate = response.data[tilValuta].value
  setConverted(amount*rate)
  });
  }

  const bytt = () =>{
    const bytte = fraValuta
    setFraValuta(tilValuta)
    setTilValuta(bytte)
    calculate()
  }
  

  return (
    <>
    <div className="main">
     <h2>Convert any currency EUR, NOK, etc.</h2>
      <div className="converter">

       
        <select onChange={giVerdiFra} name="Valuta" id="fraValuta" value={fraValuta} > 
          <option value="NOK">NOK</option> 
          <option value="EUR">EUR</option> 
          <option value="CAD">CAD</option> 
          <option value="USD">USD</option> 
          <option value="INR">INR</option> 
          <option value="SEK">SEK</option> 
          <option value="PLN">PLN</option> 
          <option value="DKK">DKK</option> 
        </select>
        <p onClick={bytt}> 🔁</p>
        <select onChange={giVerdiTil}name="Valuta" id="tilValuta" value={tilValuta} > 
          <option value="NOK">NOK</option> 
          <option value="EUR">EUR</option> 
          <option value="CAD">CAD</option> 
          <option value="USD">USD</option> 
          <option value="INR">INR</option> 
          <option value="SEK">SEK</option> 
          <option value="PLN">PLN</option> 
          <option value="DKK">DKK</option> 
       </select>
    
      <input placeholder='amount' onChange={number}></input>
      </div>
     <button className='knapp' onClick={calculate}> Calculate</button>
     <h1 className="answer"> {before} {fraValuta}  = {converted.toFixed(2)} {tilValuta}</h1>
    </div>
    
    </>
  
  )
}

export default Input