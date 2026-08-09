import { useState } from "react";

function About() {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="about">
            <h1> About robotics </h1>
            <h2>is a branch that deals with designing, building, and operating robots </h2>
            <p> How robots work</p>
            <p>Processing (The Brain) <br/>: Microcontrollers or computers that process the sensor data using algorithms and artificial intelligence <br/>(AI) to decide the best course of action.<br/></p>
            <p>Actuators (The Muscles): Motors, hydraulic systems, and pneumatic devices that allow the robot to move,<br/> manipulate objects, or alter its surroundings.<br/> </p>

            <button onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show less" : "Show more"}
            </button>

            {showMore && (
                <>
                    <p>Manufacturing & Logistics: Assembly lines, welding, and warehouse inventory management rely heavily on robotics <br/>for high precision and efficiency. </p>

                    <p>Healthcare: Used in advanced telemedicine, hospital logistics, and robotic-assisted surgeries. </p>

                    <p>Agriculture & Exploration: Drones and autonomous ground rovers are used for crop harvesting, planetary exploration, and deep-sea research. </p>

                    <h4>why choose us</h4>


                    
                </>
            )}        
            
            <div className="cards-container">
    <div className="card">
        <h3>Hands-On Learning</h3>
        <p>
            Learn robotics by building and programming real robots.
            Gain practical experience through experiments and projects.
        </p>
    </div>

    <div className="card">
        <h3>Beginner-Friendly</h3>
        <p>
            Designed for students with little or no prior robotics
            experience. Step-by-step guidance makes learning easy.
        </p>
    </div>

    <div className="card">
        <h3>Real-World Projects</h3>
        <p>
            Work on projects inspired by real industry applications,
            including automation, smart systems, and AI-powered robots.
        </p>
    </div>
</div>

<div className="stats-container">
    <div className="stat-box">
        <p className="stat-number">100+</p>
        <p className="stat-label">Learners</p>
    </div>
    <div className="stat-box">
        <p className="stat-number">20+</p>
        <p className="stat-label">Projects</p>
    </div>
    <div className="stat-box">
        <p className="stat-number">10+</p>
        <p className="stat-label">Expert Mentors</p>
    </div>
</div>
        </div>
    );
}

export default About;