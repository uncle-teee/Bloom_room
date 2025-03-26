import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { useEffect, useState } from "react";
import 'boxicons';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="logo">Bloom Room</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/AddProducts">Add Products</Link></li>
        {user ? (
          <>
            <li>
              <span className="nav-link">
                Hello, {user.username} <box-icon name='hand' type='solid' animation='tada' color='#F8D1B0' ></box-icon>

              </span>
            </li>
            <li>
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                <box-icon name='log-out' color='#ffffff'></box-icon> <span>Logout</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/SignUp" className="signup-link">Sign Up</Link></li>
            <li><Link to="/SignIn" className="signin-link">Sign In</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}