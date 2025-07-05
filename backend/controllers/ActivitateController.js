import Activitate from '../entities/Activitate.js';

// Creează o activitate nouă (POST)
export async function creeazaActivitate(req, res) {
    const { titlu, descriere, data_start, data_sfarsit, cod } = req.body;
    if (!titlu || !data_start || !data_sfarsit || !cod)
        return res.status(400).json({ error: "Câmpuri lipsă!" });

    try {
        const idUser = req.user.idUser;
        const activitate = await Activitate.create({
            titlu,
            descriere,
            data_start,
            data_sfarsit,
            cod,
            idUser
        });
        res.status(201).json({ succes: true, activitate });
    } catch (err) {
        res.status(500).json({ error: "Eroare la creare activitate", detalii: err.message });
    }
}

// Activitățile unui profesor (GET)
export async function listaActivitatiProfesor(req, res) {
    try {
        const idUser = req.user.idUser;
        const activitati = await Activitate.findAll({ where: { idUser } });
        res.json(activitati);
    } catch (err) {
        res.status(500).json({ error: "Eroare la listare activități", detalii: err.message });
    }
}

// Toate activitățile (GET)
export async function toateActivitatile(req, res) {
    try {
        const activitati = await Activitate.findAll();
        res.json(activitati);
    } catch (err) {
        res.status(500).json({ error: "Eroare la listare activități", detalii: err.message });
    }
}

// Șterge o activitate după id (DELETE)
export async function stergeActivitate(req, res) {
  try {
    const idActivitate = req.params.id;
    const idUser = req.user.idUser;

    // Verifică dacă activitatea există și dacă aparține profesorului
    const activitate = await Activitate.findOne({ where: { idActivitate, idUser } });
    if (!activitate) {
      return res.status(404).json({ error: "Activitate negăsită sau acces interzis" });
    }

    await activitate.destroy();
    res.json({ succes: true, mesaj: "Activitate ștearsă cu succes" });
  } catch (err) {
    res.status(500).json({ error: "Eroare la ștergerea activității", detalii: err.message });
  }
}