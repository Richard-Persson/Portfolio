import './App.css'


import Header from './components/header/Header'
import Card from './components/card/card'
import Footer from './components/footer/Footer'
import Ball from './components/balls/balls'

import { Link, Outlet } from 'react-router-dom'


function App() {

  return (
    <>

   
<Header/>
      <h1>Richard Persson</h1>
      <h2>Projects</h2>
  
      <div className="cards">
        <Link className='link' to="/Portfolio/TicTacToe">
        <Card name='Tic Tac Toe' img='TicTacToe.png' tools={'-HTML\n-CSS\n-JavaScript'} />
        </Link>
        <Link className='link' to="/Portfolio/Calculator">
        <Card name='Calculator' img='Calculator.png' tools={'-HTML\n-CSS\n-JavaScript + React'}/>
        </Link >
        <Link className='link' to="/Portfolio/Conversion">
        <Card name='Conversion' img='Conversion.png'tools={'-HTML\n-CSS\n-JavaScript\n-Currency API'}/>
        </Link>
        <Card name='SolarSystem' img='SolarSystem.png' tools={'-C#\n-WPF'}/>
        <Card name='Yatzy' img='Yatzy.png'tools={'-Java\n-SpringBoot MVC\n-JavaScript\n-JSTL\n-SQL\n'}/> 
        <Card name='Progress bar' img=''/> 
      </div>
      
      <Outlet/>

      <h2> Tools </h2>
  
      <div className='tools'>
        <Ball  src="react.png"/>
        <Ball  src="java.png"/>
        <Ball  src="cs.png"/>
        <Ball  src="spring.png"/>
        <Ball  src="Sql.png"/>
        <Ball  src='js.png'/>
      </div>

  
  
      <Footer/>

  </>
  )
}

export default App
