import { DataTypes } from "sequelize";
import db from "../dbConfig.js";

// Model pentru feedback anonim la activitate
const Feedback = db.define("Feedback", {
    idFeedback: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idActivitate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tip: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    ora_feedback: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "Feedback",
    timestamps: false
});

export default Feedback;
