import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import classes from "./PetDetails.module.css";

import api from "../../utils/api";

import type { Pet } from "../../types/Pet";

const PetDetails = () => {
  const [pet, setPet] = useState<Pet>({
    id: "",
    name: "",
    age: "",
    weight: "",
    color: "",
    images: [],
  });
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();

  useEffect(() => {
    const getPetData = async () => {
      try {
        const response = await api.get(`/pets/${id}`);

        setPet(response.data.pet);
      } catch (error) {
        console.log(error);
      }
    };

    getPetData();
  }, [id]);

  return (
    <>
      {pet && (
        <div className={classes.pet_container}>
          <div className={classes.image_container}>
            {pet.images.map((image, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_API_URL}/images/pets/${image.url}`}
                alt={pet.name}
              />
            ))}
          </div>
          <div className={classes.description_container}>
            <div className={classes.title}>
              <h1>
                Metting the Pet: <span>{pet.name}</span>
              </h1>
              <p>If you're interesting, make a such call</p>
            </div>
            <div className={classes.age_container}>
              <span>Age: </span> <p>{pet.age}</p>
              {pet.age == "1" ? <p>Year</p> : <p>Years</p>}
            </div>
            <p className={classes.weight}>
              <span>Weight:</span> {pet.age} Kg
            </p>
            {token ? <button>Adopt</button> : <Link to="/register">Adopt</Link>}
          </div>
        </div>
      )}
    </>
  );
};

export default PetDetails;
