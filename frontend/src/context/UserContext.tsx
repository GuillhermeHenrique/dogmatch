import { createContext, type PropsWithChildren } from "react";

import { useAuth } from "../hooks/useAuth";

import type { UserRegister, UserLogin } from "../types/User";

type UserContextType = {
  authenticated: boolean;
  register: (user: UserRegister) => Promise<void>;
  login: (user: UserLogin) => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  authenticated: false,
  register: async () => {},
  login: async () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { authenticated, register, login, logout } = useAuth();

  return (
    <UserContext.Provider value={{ authenticated, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
