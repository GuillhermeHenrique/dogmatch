import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import classes from "./MyPets.module.css";

import api from "../../utils/api";

import RoundedImage from "../../components/layout/RoundedImage";

import type { AxiosError } from "axios";

import { useFlashMessage } from "../../hooks/useFlashMessage";

import type { Pet } from "../../types/Pet";

const MyPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const showPets = async () => {
      try {
        const response = await api.get("/pets/mypets", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        setPets(response.data.pets);
      } catch (error) {
        console.log(error);
      }
    };

    showPets();
  }, [token]);

  const removePet = async (id: string) => {
    try {
      const response = await api.delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      const updatedPets = pets.filter((pet) => pet.id != id);

      setPets(updatedPets);

      setFlashMessage("Pet removed successfully!", "success");

      return response;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const msgText =
        err.response?.data?.message || "An unexpected error occurred!";

      setFlashMessage(msgText, "error");
    }
  };

  return (
    <>
      <div className={classes.title}>
        <h1>My Pets</h1>
        <div className={`${classes.btn_register} ${classes.btn}`}>
          <Link to="/pet/add">Register a Pet</Link>
        </div>
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
              <span>
                <h2>{pet.name}</h2>
              </span>
              <div className={classes.actions}>
                {pet.available ? (
                  <>
                    {pet.adoptedById && (
                      <button className={`${classes.btn}`}>
                        Concluir adoção
                      </button>
                    )}
                    <Link
                      to={`/pet/edit/${pet.id}`}
                      className={`${classes.btn} ${classes.btn_edit}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => removePet(pet.id)}
                      className={`${classes.btn} ${classes.btn_remove}`}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <p>Pet already adoption!</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>There are no registered pets!</p>}
      </div>
    </>
  );
};

export default MyPets;
