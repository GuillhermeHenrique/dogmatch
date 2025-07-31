import { createContext } from "react";

import { useAuth } from "../hooks/useAuth";

type User = {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmpassword: string;
};

type UserContextType = {
  register: (user: User) => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  register: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { register } = useAuth();

  return (
    <UserContext.Provider value={{ register }}>{children}</UserContext.Provider>
  );
};
