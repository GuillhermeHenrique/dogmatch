import { useContext, useEffect, useState } from "react";

// css
import classes from "./Profile.module.css";
import formClasses from "../Auth/Form.module.css";

import api from "../../utils/api";

// componentes
import Input from "../../components/form/Input";
import RoundedImage from "../../components/layout/RoundedImage";

// context
import { UserContext } from "../../context/UserContext";

import type { User } from "../../types/User";

const Profile = () => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    phone: 0,
    password: "",
    confirmpassword: "",
  });
  const [preview, setPreview] = useState<File | null>(null);
  const { updateUser } = useContext(UserContext);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPreview(e.target.files[0]);

      setUser({ ...user, [e.target.name]: e.target.files[0] });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateUser(user);
  };

  return (
    <div className={formClasses.form_container}>
      <div className={formClasses.title}>
        <h1>Profile</h1>
      </div>
      <div className={classes.image_container}>
        {(user.image || preview) && (
          <RoundedImage
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${import.meta.env.VITE_API_URL}/images/users/${user.image}`
            }
            alt={user.name}
            width="large"
          />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          text="Image"
          type="file"
          name="image"
          placeholder=""
          handleOnChange={onFileChange}
        />
        <Input
          text="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          handleOnChange={handleChange}
          value={user.name || ""}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Enter your e-mail"
          handleOnChange={handleChange}
          value={user.email || ""}
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          placeholder="Enter your phone"
          handleOnChange={handleChange}
          value={user.phone || ""}
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
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default Profile;
