import express from "express";
import { register, login } from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", register);                        // POST: înregistrare cont
router.post("/login", login);                              // POST: autentificare cont

export default router;
