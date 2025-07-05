import Participare from "../entities/Participare.js";
import Activitate from "../entities/Activitate.js";

// POST: înscriere la activitate
export async function participaLaActivitate(req, res) {
    try {
        const { cod } = req.body;
        const activitate = await Activitate.findOne({ where: { cod } });
        if (!activitate)
            return res.status(404).json({ error: "Activitatea nu există" });

        const exist = await Participare.findOne({
            where: {
                idUser: req.user.idUser,
                idActivitate: activitate.idActivitate
            }
        });
        if (exist)
            return res.status(400).json({ error: "Ești deja înscris la această activitate" });

        const participare = await Participare.create({
            idUser: req.user.idUser,
            idActivitate: activitate.idActivitate
        });

        res.json({ participare, activitate });
    } catch (err) {
        res.status(500).json({ error: "Eroare la înscriere", detalii: err.message });
    }
}

// GET: activități la care e înscris userul logat
export async function activitatiStudent(req, res) {
    try {
        const participari = await Participare.findAll({
            where: { idUser: req.user.idUser },
            include: [{ model: Activitate, as: "activitate" }]
        });
        const activitati = participari.map(p => p.activitate);
        res.json(activitati);
    } catch (err) {
        res.status(500).json({ error: "Eroare la listare activități înscrise", detalii: err.message });
    }
}
