import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(`${process.env.MONGO_URI!}/auth`);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to Mongo DB Successfully');
        })
        connection.on('error', (err) => {
            console.log("Mongodb connection error. Please make sure Mongodb is running." + err);
            process.exit();
        })
    }
    catch(error)
    {
        console.log('something went wrong');
        console.log(error);
    }
}