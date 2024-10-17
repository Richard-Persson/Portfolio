

import './Header.css'
import { Link,  } from 'react-router-dom'



function Header(){
    

return( <>

<div className="header">
    <div className='logo'>
     <Link to="/Portfolio/" className='link'>
        <img src='RP.png'/>
    </Link>
        
    </div>
    
    <div className="text">
        <Link to="/Portfolio/" className='link'>
            <h3>Home</h3>
        </Link>
        <Link to="/Portfolio/About" className='link'>
            <h3>About</h3>
        </Link>
        <Link to="/Portfolio/Contact" className='link'>
            <h3>Contact</h3>
        </Link>
    </div>

</div>

</>)
}

export default Header