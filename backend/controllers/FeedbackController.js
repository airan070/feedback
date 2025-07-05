import Feedback from "../entities/Feedback.js";
import Participare from "../entities/Participare.js";
import Activitate from "../entities/Activitate.js";

// Adaugă feedback pentru o activitate (POST)
export async function adaugaFeedback(req, res) {
    const { idActivitate, tip } = req.body;
    const idUser = req.user.idUser;

    if (!idActivitate || !tip)
        return res.status(400).json({ error: "Date lipsă." });

    const participare = await Participare.findOne({ where: { idUser, idActivitate } });
    if (!participare)
        return res.status(403).json({ error: "Trebuie să fii înscris la activitate pentru a da feedback!" });

    const activitate = await Activitate.findByPk(idActivitate);
    if (!activitate)
        return res.status(404).json({ error: "Activitate inexistentă!" });

    const now = new Date();
    if (now < activitate.data_start || now > activitate.data_sfarsit) {
        return res.status(403).json({ error: "Perioada pentru feedback nu este activă!" });
    }

    await Feedback.create({ idActivitate, tip });
    res.json({ succes: true });
}

// Listează feedback-ul pentru o activitate (GET)
export async function feedbackProfesor(req, res) {
    const { idActivitate } = req.params;
    if (!idActivitate) return res.status(400).json({ error: "ID activitate lipsă." });

    const lista = await Feedback.findAll({
        where: { idActivitate },
        attributes: ["tip", "ora_feedback"],
        order: [["ora_feedback", "ASC"]]
    });
    res.json(lista);
}
