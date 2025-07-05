import { DataTypes } from "sequelize";
import db from "../dbConfig.js";

// Model pentru înscrierea unui student la o activitate
const Participare = db.define("Participare", {
    idParticipare: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idActivitate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    moment: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "Participare",
    timestamps: false
});

export default Participare;
