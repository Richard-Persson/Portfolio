import "./Chatbot.css"
import Header from "../../header/Header";




export function Chatbot(){


  return (
    <>

      <Header/>
      <div className='chatbot_container'>

        <div className='chatbot_image'> 
          <img src='chatbot.png'/>

          <p> Version 1 of the chatbot</p>
        </div> 



        <div className='chatbot_description'> 
          <p>Version one of a simple chatbot i am making.<br/><br/>
            It's using the LLamaA3 to answer inputs from the user<br/><br/>
            Made in Python using Flask
          </p>
        </div> 

      </div>

      <div className="chatbot_seperator">
        <p> </p>
      </div>

      <div className='chatbot_container'>


        <div className='chatbot_description'> 
          <h1>Example of prompt ➡️ </h1>
        </div> 


        <div className='chatbot_image'> 
          <img src='examplecb.png'/>

        </div> 



      </div>


    </>

  );

}
