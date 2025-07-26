import express from "express";
import cors from "cors";

const app = express();

// config JSON response
app.use(express.json());

// solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// public folder for images
app.use(express.static("public"));

// routes
import UserRoutes from "./routes/UserRoutes.js";
import PetRoutes from "./routes/PetRoutes.js";

app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);

app.listen(5000);
