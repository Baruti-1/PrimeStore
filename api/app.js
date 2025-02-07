import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("Welocome to Prime Store");
});

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
