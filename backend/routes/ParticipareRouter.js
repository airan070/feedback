import express from "express";
import { participaLaActivitate, activitatiStudent } from "../controllers/ParticipareController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/inscriere", auth, participaLaActivitate);
router.get("/activitati", auth, activitatiStudent); 

export default router;
