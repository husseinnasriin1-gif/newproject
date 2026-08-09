import robotic from "../assets/robotic.png";
import robotic1 from "../assets/robotic1.png";
import custom from "../assets/custom.png";

function Landingpage(){
      const ENROLL_FORM_URL = "https://docs.google.com/forms/d/1p6T5wAElviopops6_4JWRJqSewtjdSZscSfsl7wO-v8/viewform";

    return(
        <div className="landingpage">
          <div className="home">
              <h1> AFRIBOT ROBOTICS</h1>
              <h2>Build Africa's Tech skill  One Skill At A Time.</h2>
              <p>Afribot delivers world class- Robotics,AI, gaming,VR,And Software 
                Engineering for every age from 5-65.</p>

                <div className="image">
                    <div className="image1">
                       <img src={robotic1} alt="logo"/>
                    </div>

                    <div className="image-center-cta">
                      <h3>Ready to start building?</h3>
                      <p>Join hundreds of learners exploring Robotics, AI, and Software Engineering with Afribot.</p>
                      <button onClick={() => window.open(ENROLL_FORM_URL, "_blank")}>
                        Enroll Now
                      </button>
                    </div>

                    <div className="image2">
                        <img src={robotic} alt="logo"/>
                    </div>
                </div>

               <div className="theme">
                  <img src={custom} alt="technology banner" />

                  <div className="theme-text">
                    <p>Building kenya's future using technology</p>
                    <p>Robotics, AI, software Engineering</p>
                    <p>VR and digital innovation for the next generation</p>
                  </div>
               </div>

                <div className="mission">
                  <h3> Our Mission</h3>
                  <p> we empower young people build creativity,innovation,and real world problem-solving skills.
                    our Mission is to prepare the most generation for future of technology</p>
                </div>

          </div>
        </div>
    )
}

export default Landingpage;