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
/*This is actually the expected and correct behavior!

MongoDB and your Node.js server are two separate services that should run on different ports:

Your Node.js server is running on port 7000 (from your .env PORT=7000)
MongoDB is running on its default port 27017 (mongodb://127.0.0.1:27017)
This is the standard setup because:

MongoDB is a database service that needs its own port to handle database connections
Your Node.js application is a web server that needs its own port to handle HTTP requests
Your Node.js application acts as a client that connects to MongoDB, while simultaneously serving as a server for your frontend clients
This separation allows you to:

Run multiple applications that can connect to the same MongoDB instance
Scale your application and database independently
Maintain clear separation of concerns between your database and application layer
So when you see:

Server running on port 7000
MongoDB running on port 27017
That's exactly what you want! Your setup is working as intended. */
