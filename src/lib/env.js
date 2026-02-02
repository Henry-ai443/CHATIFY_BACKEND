import dotenv from "dotenv";
dotenv.config();

export const ENV = {
    PORT: 3000,
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    NODE_ENV : process.env.NODE_ENV,
    CLIENT_URL : process.env.CLIENT_URL,
    RESEND_API_KEY : process.env.RESEND_API_KEY,
    EMAIL_FROM_NAME : process.env.EMAIL_FROM_NAME.at,
    EMAIL_FROM : process.env.EMAIL_FROM, 
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    ARCHJET_KEY:process.env.ARCHJET_KEY,
    ARCHJET_ENV:process.env.ARCHJET_ENV
}