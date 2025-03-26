import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/AddProducts">Add Products</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact-Us</h3>
            <p>Email: support@bloomroom.com</p>
            <p>Phone: 0789717675</p>
            <p>Address: The Bazaar, Floor M1 Unit 6 Room 8 Nairobi</p>
          </div>
          <div className="footer-column">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <Link to="https://instagram.com"><img src="images/ig.JPG" alt="Instagram" /></Link>
              <Link to="https://twitter.com"><img src="images/twiter.JPG" alt="Twitter" /></Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Flower shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;