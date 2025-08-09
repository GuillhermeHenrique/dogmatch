import { createContext, type PropsWithChildren } from "react";

import { useAuth } from "../hooks/useAuth";

// types
import type { UserRegister, UserLogin, User } from "../types/User";
import type { Pet } from "../types/Pet";

type AuthContextType = {
  authenticated: boolean;
  register: (user: UserRegister) => Promise<void>;
  login: (user: UserLogin) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  registerPet: (pet: Pet) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  register: async () => {},
  login: async () => {},
  updateUser: async () => {},
  registerPet: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { authenticated, register, login, updateUser, registerPet, logout } =
    useAuth();

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};
