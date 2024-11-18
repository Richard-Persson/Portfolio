import "./TerrainGenerator.css"
import Header from "../../header/Header";




export function TerrainGenerator(){


  return (
    <>

      <Header/>
      <div className='tg_container'>

        <div className='tg_image'> 
          <img src='terrain_generator.png'/>
          
          <p> Current picture of terrain generator</p>
        </div> 



        <div className='tg_description'> 
          <p> Currently working on an terrain generator in threeJS, <br/>
              will upate this page when the project is finished <br/>
            <br/>
              Techniques currently being implemented 
            <ul>
              <li> Level Of Detail (LOD)</li>
              <li> Collision detection  </li>
              <li> Height Map</li>
              <li> Camera movement</li>
              <li> Texture splatting</li>
             </ul>

                           
          </p>
        </div> 

      </div>

    </>

  );

}
