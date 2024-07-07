import './App.css'


import Header from './components/header/Header'
import Card from './components/card/card'
import Footer from './components/footer/Footer'
import Ball from './components/balls/balls'

import { Link, Outlet } from 'react-router-dom'
import { Home } from './components/pages/home/home'


function App() {

  return (
    <>

  <Outlet/>
  </>
  )
}

export default App
