import { DataTypes } from "sequelize";
import db from "../dbConfig.js";

// Model pentru activitate creată de profesor
const Activitate = db.define("Activitate", {
    idActivitate: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titlu: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descriere: {
        type: DataTypes.TEXT
    },
    data_start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_sfarsit: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cod: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true
    },
    idUser: { // Profesorul organizator
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "Activitate",
    timestamps: false
});

export default Activitate;
