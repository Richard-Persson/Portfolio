
import Header from "../../header/Header"
import "./About.css"
export function About(){



let år :number

const date = new Date();

år = date.getFullYear() - 2000;


return(<>


<Header/>


<h1 className="title"> About me </h1>
<p className="text">{år} year old student, studying computer engineering at høgskulen på vestlandet. </p>


</>)

}