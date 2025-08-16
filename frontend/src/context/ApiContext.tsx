import { createContext, type PropsWithChildren } from "react";

import { useApi } from "../hooks/useApi";

// types
import type { UserRegister, UserLogin, User } from "../types/User";
import type { PetFormData, PetRegister } from "../types/Pet";

type ApiContextType = {
  authenticated: boolean;
  register: (user: UserRegister) => Promise<void>;
  login: (user: UserLogin) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  registerPet: (pet: PetRegister) => Promise<void>;
  updatePet: (pet: PetFormData) => Promise<void>;
  schedule: (id: string) => Promise<void>;
  logout: () => void;
};

export const ApiContext = createContext<ApiContextType>({
  authenticated: false,
  register: async () => {},
  login: async () => {},
  updateUser: async () => {},
  registerPet: async () => {},
  updatePet: async () => {},
  schedule: async () => {},
  logout: () => {},
});

export const ApiProvider = ({ children }: PropsWithChildren) => {
  const {
    authenticated,
    register,
    login,
    updateUser,
    registerPet,
    updatePet,
    schedule,
    logout,
  } = useApi();

  return (
    <ApiContext.Provider
      value={{
        authenticated,
        register,
        login,
        updateUser,
        registerPet,
        updatePet,
        schedule,
        logout,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
