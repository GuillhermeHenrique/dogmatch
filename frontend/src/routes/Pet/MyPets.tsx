import { useState } from "react";

import { Link } from "react-router-dom";

import classes from "./MyPets.module.css";

const MyPets = () => {
  const [pets] = useState([]);
  return (
    <>
      <div className={classes.title}>
        <h1>My Pets</h1>
        <Link to="/pet/add">Register a Pet</Link>
      </div>
      <div>
        {pets.length > 0 && <p>My registered pets:</p>}
        {pets.length === 0 && <p>There are no registered pets!</p>}
      </div>
    </>
  );
};

export default MyPets;
