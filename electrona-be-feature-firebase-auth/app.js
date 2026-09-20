import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./src/config/firebase.js";
import "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Electrona Backend Running");
});

export default app;