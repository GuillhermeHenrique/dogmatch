import { useEffect, useState } from "react";

import type { AxiosError } from "axios";

import api from "../utils/api";

import { useFlashMessage } from "./useFlashMessage";

// types
import type { UserRegister, UserLogin, User } from "../types/User";
import type { PetFormData, PetRegister } from "../types/Pet";

type UserToken = {
  message: string;
  token: string;
  UserId: string;
};

export const useApi = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  const authUser = async (data: UserToken) => {
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));
  };

  const register = async (user: UserRegister) => {
    try {
      const response = await api.post("/users/register", user);

      setFlashMessage("Registration completed successfully!", "success");

      await authUser(response.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const msgText =
        err.response?.data?.message || "An unexpected error occurred!";

      setFlashMessage(msgText, "error");
    }
  };

  const login = async (user: UserLogin) => {
    try {
      const response = await api.post("/users/login", user);

      setFlashMessage("Login completed successfully!", "success");

      await authUser(response.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const msgText =
        err.response?.data?.message || "An unexpected error occurred!";

      setFlashMessage(msgText, "error");
    }
  };

  const updateUser = async (user: User) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFlashMessage("User not authenticated!", "error");
      return;
    }

    const formData = new FormData();

    (Object.keys(user) as (keyof User)[]).forEach((key) => {
      const value = user[key];

      if (value === undefined || value === null) return;

      if (value instanceof File) {
        formData.append(key, value); // keep image like file
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await api.patch(`/users/edit/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      setFlashMessage("Updated successfully!", "success");

      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const msgText =
        err.response?.data?.message || "An unexpected error occurred!";

      setFlashMessage(msgText, "error");
    }
  };

  const registerPet = async (pet: PetRegister) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFlashMessage("User not authenticated!", "error");
      return;
    }

    const formData = new FormData();

    (Object.keys(pet) as (keyof PetRegister)[]).forEach((key) => {
      const value = pet[key];

      if (value === undefined || value === null) return;

      if (key === "images" && Array.isArray(value)) {
        value.forEach((image) => formData.append("images", image));
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await api.post(`/pets/create`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      setFlashMessage("Created successfully!", "success");

      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const msgText =
        err.response?.data?.message || "An unexpected error occurred!";

      setFlashMessage(msgText, "error");
    }
  };

  const updatePet = async (pet: PetFormData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFlashMessage("User not authenticated!", "error");
      return;
    }

    const formData = new FormData();

    (Object.keys(pet) as (keyof PetRegister)[]).forEach((key) => {
      const value = pet[key];

      if (value === undefined || value === null) return;

      if (key === "images" && Array.isArray(value)) {
        value.forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await api.patch(`/pets/${pet.id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      setFlashMessage("Updated successfully!", "success");

      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      console.log(pet);

      const msgText =
        err.response?.data?.message || "An unexpected error occurred!";

      setFlashMessage(msgText, "error");
    }
  };

  const schedule = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFlashMessage("User not authenticated!", "error");
      return;
    }

    try {
      const response = await api.patch(`/pets/schedule/${id}`, null, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      setFlashMessage(response.data.message, "success");

      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const msgText =
        err.response?.data?.message || "An unexpected error occurred!";

      setFlashMessage(msgText, "error");
    }
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = "";

    setFlashMessage("Logout successful!", "success");
  };

  return {
    authenticated,
    register,
    login,
    updateUser,
    registerPet,
    updatePet,
    schedule,
    logout,
  };
};
