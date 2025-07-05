import { DataTypes } from "sequelize";
import db from "../dbConfig.js";

// Model pentru utilizator (student sau profesor)
const User = db.define("User", {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    parola: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tip: {
        type: DataTypes.ENUM("student", "profesor"),
        allowNull: false
    }
}, {
    tableName: "User",
    timestamps: false
});

export default User;
