import User from "./User.js";
import Activitate from "./Activitate.js";
import Participare from "./Participare.js";
import Feedback from "./Feedback.js";

// O activitate aparține unui profesor
Activitate.belongsTo(User, { foreignKey: "idUser", as: "profesor" });
User.hasMany(Activitate, { foreignKey: "idUser", as: "activitati" });

// O participare aparține unui user și unei activități
Participare.belongsTo(User, { foreignKey: "idUser", as: "student" });
Participare.belongsTo(Activitate, { foreignKey: "idActivitate", as: "activitate" });
User.hasMany(Participare, { foreignKey: "idUser", as: "participari" });
Activitate.hasMany(Participare, { foreignKey: "idActivitate", as: "participari" });

// Un feedback aparține unei activități
Feedback.belongsTo(Activitate, { foreignKey: "idActivitate", as: "activitate" });
Activitate.hasMany(Feedback, { foreignKey: "idActivitate", as: "feedbackuri" });

export { User, Activitate, Participare, Feedback };
