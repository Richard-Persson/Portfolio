import './home.css'
import Header from '../../header/Header'
import Card from '../../card/card'
import Footer from '../../footer/Footer'
import Ball from '../../balls/balls'
import { Link,  } from 'react-router-dom'

export  function Home() {

  return (
    <>

      <Header/>
      <div className="heroPage">

        <div className="title">
          <h1 className='navn Homepage__Text'>Richard Persson</h1>
          <p>Student / Aspiring developer</p>
        </div>

        <div className="image">
          <img src='computer.png'></img>

        </div>

      </div>

      <h2 className='Homepage__Text'>Projects</h2>
      <div className="cards">
        <Link className='link' to="/Portfolio/TicTacToe">
          <Card name='Tic Tac Toe' img='TicTacToe.png' tools={'-HTML\n-CSS\n-JavaScript'} />
        </Link>
        <Link className='link' to="/Portfolio/Calculator">
          <Card name='Calculator' img='calculator2.jpg' tools={'-HTML\n-CSS\n-JavaScript + React'}/>
        </Link >
        <Link className='link' to="/Portfolio/Conversion">
          <Card name='Conversion' img='conversion2.jpg'tools={'-HTML\n-CSS\n-JavaScript\n-Currency API'}/>
        </Link>
        {
          // <Card name='SolarSystem' img='SolarSystem.png' tools={'-C#\n-WPF'}/> 
          //<Card name='Yatzy' img='Yatzy.png'tools={'-Java\n-SpringBoot MVC\n-JavaScript\n-JSTL\n-SQL\n'}/> 
        } 
        <Link className='link' to='/Portfolio/ThreeJSGame'>
          <Card name='Game in ThreeJS' img='startscreen.png'/> 
        </Link>

        <Link className='link' to='/Portfolio/Chatbot'>
          <Card name='Chatbot' img='ChatbotIcon.png'/> 
        </Link>

      </div>

      <h2 className='Homepage__Text'> Tools </h2>

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
