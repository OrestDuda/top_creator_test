import { connectDB } from "@config/db";
import { generateAndInsertUsers } from "./helpers/generateUsers";

connectDB().then(() => {
  generateAndInsertUsers();
});
