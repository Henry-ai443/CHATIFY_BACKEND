import mongoose from "mongoose";
import {ENV} from "./env.js"

export const connectDb = async () => {
    try{
        const MONGO_URI = ENV.MONGO_URI;
        if(!MONGO_URI) throw new Error("MONGO_URI is not set");

        const conn = await mongoose.connect(MONGO_URI);
        console.log("MONGODB connected successfully");
    }catch(error){
        console.error("Erro connecting mongo db:", error);
        process.exit(1)
    }
}