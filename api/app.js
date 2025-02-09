import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("Welocome to Prime Store");
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
  connectDb();
});
