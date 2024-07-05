

import Header from './Header'
import Input from './Input'
import { Link } from 'react-router-dom';


export  function Conversion(){


    return(<>
  
  <div className="toolsTTT">
          <Link to="/" >
            <button className="back">Home</button>
        </Link>
        </div>
  
    <Header/> 
    <Input/>
    
    
    </>);
}