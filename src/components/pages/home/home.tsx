import './home.css'
import Header from '../../header/Header'
import Card from '../../card/card'
import Footer from '../../footer/Footer'
import Ball from '../../balls/balls'

import { Link } from 'react-router-dom'

export default function Home() {

    return (
      <>
  
    
      <Header/>
      <h1>Richard Persson</h1>
      <h2>Projects</h2>
  
      <div className="cards">
        <Link className='link' to="/TicTacToe">
        <Card name='Tic Tac Toe' img='TicTacToe.png' tools={'-HTML\n-CSS\n-JavaScript'} />
        </Link>
        <Link className='link' to="/Calculator">
        <Card name='Calculator' img='Calculator.png' tools={'-HTML\n-CSS\n-JavaScript + React'}/>
        </Link >
        <Link className='link' to="/Conversion">
        <Card name='Conversion' img='Conversion.png'tools={'-HTML\n-CSS\n-JavaScript\n-Currency API'}/>
        </Link>
        <Card name='SolarSystem' img='SolarSystem.png' tools={'-C#\n-WPF'}/>
        <Card name='Yatzy' img='Yatzy.png'tools={'-Java\n-SpringBoot MVC\n-JavaScript\n-JSTL\n-SQL\n'}/> 
        <Card name='Progress bar' img=''/> 
      </div>
      
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