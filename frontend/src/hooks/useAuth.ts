import api from "../utils/api";

type User = {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmpassword: string;
};

export const useAuth = () => {
  const register = async (user: User) => {
    try {
      const response = await api.post("/users/register", user);

      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { register };
};
