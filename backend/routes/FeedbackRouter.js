import express from "express";
import { adaugaFeedback, feedbackProfesor } from "../controllers/FeedbackController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/adauga", auth, adaugaFeedback);              // POST: adaugă feedback (autentificat)
router.get("/lista/:idActivitate", auth, feedbackProfesor); // GET: feedbackuri activitate (autentificat)

export default router;
