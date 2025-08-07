import { useState } from "react";

import { Link } from "react-router-dom";

import classes from "./MyPets.module.css";

const MyPets = () => {
  const [pets] = useState([]);
  return (
    <>
      <div className={classes.title}>
        <h1>My Pets</h1>
        <Link to="/pet/add">Register Pet</Link>
      </div>
      <div>
        {pets.length > 0 && <p>My register pets:</p>}
        {pets.length === 0 && <p>There is no register pets!</p>}
      </div>
    </>
  );
};

export default MyPets;
