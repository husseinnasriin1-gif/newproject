import "./footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>

            <div className="footer-section">
                <h3>Support</h3>
                <ul>
                    <li><a href="/help">Help Center</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                </ul>
            </div>

            <div className="footer-section">
                <h3>Follow Us</h3>
                <ul>
                    <li><a href="https://facebook.com">Facebook</a></li>
                    <li><a href="https://instagram.com">Instagram</a></li>
                    <li><a href="https://twitter.com">Twitter</a></li>
                    <li><a href="https://youtube.com">YouTube</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;