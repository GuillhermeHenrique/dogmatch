import { useContext, useState, type ChangeEvent } from "react";

import { useNavigate } from "react-router-dom";

// css
import classes from "./AddPet.module.css";
import formClasses from "../Auth/Form.module.css";

import Input from "../../components/form/Input";

import type { Pet } from "../../types/Pet";
import { AuthContext } from "../../context/AuthContext";

const AddPet = () => {
  const [pet, setPet] = useState<Pet>({
    id: "",
    name: "",
    age: "",
    weight: "",
    color: "",
    images: [],
  });
  const [preview, setPreview] = useState<File[]>([]);
  const colors = ["white", "black", "gray", "caramel", "mixed"];
  const { registerPet } = useContext(AuthContext);
  const navigate = useNavigate();

  const fileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const imagesArray = Array.from(e.target.files);

      setPreview(imagesArray);
      setPet({ ...pet, images: imagesArray });
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPet({ ...pet, [e.target.name]: [e.target.value] });
  };

  const handleColor = (e: ChangeEvent<HTMLSelectElement>) => {
    setPet({ ...pet, color: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerPet(pet);

    setTimeout(() => {
      navigate("/pet/mypets");
    }, 3000);
  };

  return (
    <div className={formClasses.form_container}>
      <div className={`${formClasses.title} ${classes.title}`}>
        <h1>Register a Pet</h1>
      </div>
      <div className={classes.images_container}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name} + ${index}`}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <img
                src={`${import.meta.env.VITE_API_URL}/images/pets/${image}}`}
                alt={pet.name}
                key={`${pet.name} + ${index}`}
              />
            ))}
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          text="Pet images"
          type="file"
          name="images"
          placeholder=""
          handleOnChange={fileOnChange}
          multiple={true}
        />
        <Input
          text="Pet's name"
          type="text"
          name="name"
          placeholder="Enter the pet's name"
          handleOnChange={handleOnChange}
          value={pet.name || ""}
        />
        <Input
          text="Pet's age"
          type="text"
          name="age"
          placeholder="Enter the pet's age"
          handleOnChange={handleOnChange}
          value={pet.age || ""}
        />
        <Input
          text="Pet's weight"
          type="text"
          name="weight"
          placeholder="Enter the pet's weight"
          handleOnChange={handleOnChange}
          value={pet.weight || ""}
        />
        <div className={classes.select}>
          <label htmlFor="color">Select a color</label>
          <select
            name="color"
            id="color"
            onChange={handleColor}
            value={pet.color || ""}
          >
            <option>Select a option</option>
            {colors.map((color) => (
              <option key={color}>{color}</option>
            ))}
          </select>
        </div>
        <input type="submit" value="Register pet" />
      </form>
    </div>
  );
};

export default AddPet;
