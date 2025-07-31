import { Link } from "react-router-dom";

import classes from "./Navbar.module.css";

import logo from "../../assets/images/logo.png";

const Navbar = () => {
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
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li className={classes.login_bottom}>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
