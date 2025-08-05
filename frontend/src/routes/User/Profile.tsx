import { useState } from "react";

import formClasses from "../Auth/Form.module.css";

import Input from "../../components/form/Input";

import type { UserRegister } from "../../types/User";

const Profile = () => {
  const [user, setUser] = useState<UserRegister>({
    name: "",
    email: "",
    phone: 0,
    password: "",
    confirmpassword: "",
  });

  const onFileChange = () => {};

  const handleChange = () => {};

  return (
    <div className={formClasses.form_container}>
      <div className={formClasses.title}>
        <h1>Profile</h1>
      </div>
      <p>Preview Image</p>
      <form>
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
