import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Home} from "./components/pages/home/home.tsx"
import {TicTacToe} from "./components/pages/TicTacToe/TicTacToe.tsx"
import {Conversion} from "./components/pages/Conversion/conversion.tsx"
import { Calculator } from './components/pages/Calculator/Calculator.tsx'
import { About } from './components/pages/About/About.tsx'
import  { Shapes }  from './components/pages/Shapes/Shapes.tsx'

const router = createBrowserRouter([

  {

    path:"/Portfolio/",
    element:<App/>,
    children:[
      { 
        path:"/Portfolio/",
        element:<Home/>
      },
      { 
        path:"/Portfolio/TicTacToe",
        element:<TicTacToe/>
      },

      { 
        path:"/Portfolio/Calculator",
        element:<Calculator/>
      },
      
      { 
        path:"/Portfolio/Conversion",
        element:<Conversion/>
      },
      { 
        path:"/Portfolio/About",
        element:<About/>
      },
      { 
        path:"/Portfolio/Shapes",
        element:<Shapes/>
      },
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
