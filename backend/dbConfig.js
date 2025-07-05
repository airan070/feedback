import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME,    // Numele db
    process.env.DB_USER,    // User
    process.env.DB_PASS,    // Parola
    {
        host: process.env.DB_HOST,   
        dialect: "mysql",
        port: process.env.DB_PORT || 3306,
        logging: false, 
    }
);

export default db;
