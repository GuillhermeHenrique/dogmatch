import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import classes from "./Register.module.css";

import Input from "../../components/form/Input";

// context
import { UserContext } from "../../context/UserContext";

import type { UserLogin } from "../../types/User";

const Login = () => {
  const [user, setUser] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(user);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className={classes.form_container}>
      <div className={classes.title}>
        <h1>Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Enter your e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
      <p>
        Don't have an account? <Link to="/register">Click here</Link>
      </p>
    </div>
  );
};

export default Login;
