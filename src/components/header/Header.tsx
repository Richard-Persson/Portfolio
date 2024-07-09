

import './Header.css'
import { Link,  } from 'react-router-dom'



function Header(){
    

return( <>

<div className="header">
    <div className='logo'>
        <img src='RP.png'/>
    </div>
    
    <div className="text">
        <Link to="/Portfolio/" className='link'>
            <p>Home</p>
        </Link>
        <Link to="/Portfolio/About" className='link'>
            <p>About</p>
        </Link>
    </div>

</div>

</>)
}

export default Header