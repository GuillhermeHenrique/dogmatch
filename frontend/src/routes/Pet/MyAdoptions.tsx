import { useEffect, useState } from "react";

import classes from "./MyAdoptions.module.css";

import api from "../../utils/api";

import RoundedImage from "../../components/layout/RoundedImage";

import type { Pet } from "../../types/Pet";

const MyAdoptions = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const getPetData = async () => {
      try {
        const response = await api.get("/pets/myadoptions", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        setPets(response.data.pets);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    getPetData();
  }, [token]);

  return (
    <>
      <div className={classes.title}>
        <h1>My Adoptions</h1>
      </div>
      <div className={classes.petlist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet.id} className={classes.petlist_row}>
              <RoundedImage
                src={`${import.meta.env.VITE_API_URL}/images/pets/${
                  pet.images[0].url
                }`}
                alt={pet.name}
                width="large"
              />
              <h2>{pet.name}</h2>
              <div>
                {pet.available ? (
                  <>
                    <div className={classes.contact}>
                      <span>Phone number:</span>
                      {pet.user && <p>{pet.user?.phone}</p>}
                    </div>
                    <div className={classes.contact}>
                      <span>Contact person:</span>
                      {pet.user && <p>{pet.user?.name}</p>}
                    </div>
                    <div className={classes.available}>
                      <p>Adoption in process!</p>
                    </div>
                  </>
                ) : (
                  <div className={classes.available}>
                    <p>
                      Congratulations, you have completed the adoption process.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>There are no adoptions pets!</p>}
      </div>
    </>
  );
};

export default MyAdoptions;
