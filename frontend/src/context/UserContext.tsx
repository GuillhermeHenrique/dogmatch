import { createContext, type PropsWithChildren } from "react";

import { useAuth } from "../hooks/useAuth";

// types
import type { UserRegister, UserLogin, User } from "../types/User";
import type { Pet } from "../types/Pet";

type UserContextType = {
  authenticated: boolean;
  register: (user: UserRegister) => Promise<void>;
  login: (user: UserLogin) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  registerPet: (pet: Pet) => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  authenticated: false,
  register: async () => {},
  login: async () => {},
  updateUser: async () => {},
  registerPet: async () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { authenticated, register, login, updateUser, registerPet, logout } =
    useAuth();

  return (
    <UserContext.Provider
      value={{
        authenticated,
        register,
        login,
        updateUser,
        registerPet,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
