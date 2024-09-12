import express from "express";
import { connectDB } from "@config/db";
import { listenForChanges } from "@anonymization/customerListener";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB().then(async () => {
  listenForChanges();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
