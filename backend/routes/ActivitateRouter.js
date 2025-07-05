import express from 'express';
import { creeazaActivitate, listaActivitatiProfesor, toateActivitatile, stergeActivitate } from '../controllers/ActivitateController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/creare', auth, creeazaActivitate);           // POST: creează activitate (autentificare)
router.get('/lista', auth, listaActivitatiProfesor);       // GET: activitățile profesorului (autentificare)
router.get('/', toateActivitatile);                        // GET: toate activitățile (public)
router.delete('/sterge/:id', auth, stergeActivitate);      // DELETE: șterge activitatea (autentificare)

export default router;
