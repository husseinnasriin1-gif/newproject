import { useState } from "react";
import image from "../assets/image.png";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    // Safely handles opening external links in a new tab while closing the menu
    const handleEnrollClick = (e) => {
        e.preventDefault(); // Stop any default conflicting behavior
        closeMenu();        // Safely close the UI menu first
        
        // Open the Google Form securely in a new window/tab
        window.open(
            "https://docs.google.com/forms/d/1p6T5wAElviopops6_4JWRJqSewtjdSZscSfsl7wO-v8/viewform", 
            "_blank", 
            "noopener,noreferrer"
        );
    };

    return (
        <div className="Navbar">
            <img src={image} alt="logo"/>

            <button
                className={`hamburger ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`list ${isOpen ? "open" : ""}`}>
                <ul>
                    <li><a href="/" onClick={closeMenu}>Home</a></li>
                    <li><a href="/about" onClick={closeMenu}>About</a></li>
                    <li><a href="/resource" onClick={closeMenu}>Resources</a></li>
                    <li><a href="/contact" onClick={closeMenu}>Contact</a></li>
                    <li>
                        <a
                            href="https://docs.google.com/forms/d/1p6T5wAElviopops6_4JWRJqSewtjdSZscSfsl7wO-v8/viewform"
                            onClick={handleEnrollClick}
                        >
                            Enroll courses
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
