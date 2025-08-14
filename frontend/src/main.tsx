import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import App from "./App.tsx";

// routes
import Home from "./routes/Home.tsx";
import Register from "./routes/Auth/Register.tsx";
import Login from "./routes/Auth/Login.tsx";
import Profile from "./routes/User/Profile.tsx";
import MyPets from "./routes/Pet/MyPets.tsx";
import AddPet from "./routes/Pet/AddPet.tsx";
import EditPet from "./routes/Pet/EditPet.tsx";
import PetDetails from "./routes/Pet/PetDetails.tsx";
import MyAdoptions from "./routes/Pet/MyAdoptions.tsx";

// context
import { AuthProvider } from "./context/AuthContext.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // Auth
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // User
      {
        path: "/user/profile",
        element: <Profile />,
      },
      // Pet
      {
        path: "/pet/mypets",
        element: <MyPets />,
      },
      {
        path: "/pet/add",
        element: <AddPet />,
      },
      {
        path: "/pet/edit/:id",
        element: <EditPet />,
      },
      {
        path: "/pet/:id",
        element: <PetDetails />,
      },
      {
        path: "/pet/myadoptions",
        element: <MyAdoptions />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
