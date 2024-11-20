import "./ThreeJSGame.css"
import Header from "../../header/Header";




export function ThreeJSGame(){


  return (
    <>

      <Header/>
      <div className='tg_container'>

        <div className='tg_image'> 
          <img src='game.png'/>
          
          <p> Current state of the game</p>
        </div> 



        <div className='tg_description'> 
          <p> Currently working on a game in threeJS, <br/>
              will upate this page when the project is finished <br/>
            <br/>
              Techniques currently being implemented 
            <ul>
              <li> Level Of Detail (LOD)</li>
              <li> Collision detection  </li>
              <li> Height Map</li>
              <li> Third person camera movement</li>
              <li> Texture splatting</li>
             </ul>

                           
          </p>
        </div> 

      </div>

    </>

  );

}
