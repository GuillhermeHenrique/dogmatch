import { useEffect, useState } from "react";

import classes from "./Home.module.css";

import api from "../utils/api";

import type { Pet } from "../types/Pet";
import { Link } from "react-router-dom";

const Home = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await api.get("/pets");

        setPets(response.data.pets);
      } catch (error) {
        console.log(error);
      }
    };

    getPets();
  }, []);

  return (
    <>
      <div className={classes.title}>
        <h1>Adopt a Pet</h1>
      </div>
      <div className={classes.pets_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet.id} className={classes.pet_card}>
              <div
                style={{
                  backgroundImage: `url(${
                    import.meta.env.VITE_API_URL
                  }/images/pets/${pet.images[0].url})`,
                }}
                className={classes.pet_card_image}
              ></div>
              <h2>{pet.name}</h2>
              <p>
                {pet.age == "1" ? (
                  <div className={classes.age_container}>
                    <span>Age: </span> <p>{pet.age} Year</p>
                  </div>
                ) : (
                  <div className={classes.age_container}>
                    <span>Age: </span> <p>{pet.age} Years</p>
                  </div>
                )}
              </p>
              {pet.available ? (
                <Link to={`/pet/${pet.id}`}>More datails</Link>
              ) : (
                <h3 className={classes.adopted_text}>Adopted!</h3>
              )}
            </div>
          ))}
        {pets.length === 0 && (
          <p>There are no pets registered or available at the moment!</p>
        )}
      </div>
    </>
  );
};

export default Home;
