import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

// Just checking if env file is load properly
// console.log("Environment variables:", {
//   PORT: process.env.PORT,
//   MONGODB_URI: process.env.MONGODB_URI,
// });

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb Connection Error", err);
  });
