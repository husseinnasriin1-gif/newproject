
import background  from "../assets/background.png"
function Contact () {
    return(
        
        <div className="contact-container">
            <img src={background} alt = "background"/>
            <div className="text">
            <h1 >Contact us</h1>
            <p> Have a question, project idea, or want to collaborate?Feel free to reach out.</p>
            </div>
            

            <form className="contact-form">
                <input type="text" placeholder="Your Name"/>
                <input type="email" placeholder="your Email"/>
                <textarea placeholder="your Message"></textarea>
                <button> "Submit Mesaage "</button>
                </form>
                <div className="contact-info">
                    <h2> Get in Touch</h2>
                    <p> Email:yourname@example.com</p>
                    <p>location:kenya</p>
                    </div>
                    <div className="social-links">
                            <a href="https//linkedin.com"
                            target="_blank" rel="noreferrer">
                                linkedIn
                                </a>
                                <a href="https://instagram.com"
                                target="_blank" rel ="noreferrer">
                                    instagram
                                    </a>
                                    </div> 
     </div>                                                                
                                
                        






    )
}
export default Contact;