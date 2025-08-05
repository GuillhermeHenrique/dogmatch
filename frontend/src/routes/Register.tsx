import { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import classes from "./Register.module.css";

import Input from "../components/form/Input";

// context
import { UserContext } from "../context/UserContext";

import type { UserRegister } from "../types/User";

const Register = () => {
  const [user, setUser] = useState<UserRegister>({
    name: "",
    email: "",
    phone: 0,
    password: "",
    confirmpassword: "",
  });
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register(user);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className={classes.form_container}>
      <div className={classes.title}>
        <h1>Register</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          text="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Enter your email"
          handleOnChange={handleChange}
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          placeholder="Enter your phone"
          handleOnChange={handleChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirm password"
          type="password"
          name="confirmpassword"
          placeholder="Confirm your password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Register" />
      </form>
      <p>
        Already have an account? <Link to="/login">Click here</Link>
      </p>
    </div>
  );
};

export default Register;
