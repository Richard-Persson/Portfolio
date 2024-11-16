
import Header from '../../header/Header.tsx'
import './Contact.css'

export function Contact(){




    return(<>

        <Header/>


        <div className='ContactForm'>
            <form className='ContactBody'>
                <label className='ContactLabel'> Name <br/>
                <input type="text"/>
                </label>
            
                <label className='ContactLabel'> Email <br/>
                <input type="email"/>
                </label>

                <label className='ContactLabel'> Message <br/>
                <textarea rows={4} cols={50}></textarea>
                </label>


            </form>
            <button className='submitButton'> Submit </button>


        </div>
    
    </>)
}

