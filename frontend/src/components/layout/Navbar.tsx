import { Link, redirect } from "react-router-dom";
import { useContext } from "react";

import classes from "./Navbar.module.css";

import logo from "../../assets/images/logo.png";

// context
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { authenticated, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();

    redirect("/");
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
            <Link to="/">Adotar</Link>
          </li>
          {authenticated ? (
            <>
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
