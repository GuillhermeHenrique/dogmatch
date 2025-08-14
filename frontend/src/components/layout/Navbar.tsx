import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import classes from "./Navbar.module.css";

import logo from "../../assets/images/logo.png";

// context
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { authenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.logo}>
          <img src={logo} alt="dogmatch logo" />
          <h2>DogMatch</h2>
        </div>
        <ul>
          <li>
            <Link to="/">Adopt</Link>
          </li>
          {authenticated ? (
            <>
              <li>
                <Link to="/pet/mypets">My Pets</Link>
              </li>
              <li>
                <Link to="/pet/myadoptions">My Adoptions</Link>
              </li>
              <li>
                <Link to="/user/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className={classes.exit_bottom}>
                  Exit
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li className={classes.login_bottom}>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
