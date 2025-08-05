import { useEffect, useState } from "react";

import type { AxiosError } from "axios";

import api from "../utils/api";

import { useFlashMessage } from "./useFlashMessage";

import type { UserRegister, UserLogin } from "../types/User";

type UserToken = {
  message: string;
  token: string;
  UserId: string;
};

export const useAuth = () => {
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
        err.response?.data?.message || "An unexpected error occurred";

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
        err.response?.data?.message || "An unexpected error occurred";

      setFlashMessage(msgText, "error");
    }
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = "";

    setFlashMessage("Logout successful!", "success");
  };

  return { authenticated, register, login, logout };
};
