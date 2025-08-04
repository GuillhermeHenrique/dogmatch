import { createContext, type PropsWithChildren } from "react";

import { useAuth } from "../hooks/useAuth";

type User = {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmpassword: string;
};

type UserContextType = {
  authenticated: boolean;
  register: (user: User) => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  authenticated: false,
  register: async () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { authenticated, register, logout } = useAuth();

  return (
    <UserContext.Provider value={{ authenticated, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
