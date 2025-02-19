import mongoose from "mongoose";

// Get MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI!;

// Check if MongoDB URI exists in environment variables
if (!MONGODB_URI) {
    throw new Error("Please define mongodb uri in env file");
}

// Create a cached connection object in global scope
// This helps reuse the connection across multiple requests
let cached = global.mongoose;

// If no cached connection exists, create an empty cache object
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    // If we already have a connection, return it
    // This prevents making multiple connections unnecessarily
    if (cached.conn) {
        return cached.conn
    }

    // If no connection promise exists, create a new connection
    if (!cached.promise) {
        // Database connection options
        const opts = {
            bufferCommands: true,  // Enable command buffering & Mongoose lets you start using your models immediately, without waiting for mongoose to establish a connection to MongoDB
            maxPoolSize: 10        // Maximum number of connections in the pool & Connection pools open sockets on demand to support concurrent requests to MongoDB in your application.
        }

        // Connect to MongoDB using mongoose
        // Note: The MONGODB_URI needs to be passed to connect()
        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then(() => mongoose.connection);

    }
    // Store the connection in cache
    try {
        cached.conn = await cached.promise;

    } catch (error) {
        cached.promise = null;
        throw new Error("Check database file")
    }
    return cached.conn;
}
