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

// context
import { UserProvider } from "./context/UserContext.tsx";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
