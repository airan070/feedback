import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../entities/User.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Înregistrare utilizator nou (POST)
export async function register(req, res) {
    const { email, parola, tip } = req.body;
    if (!email || !parola || !tip)
        return res.status(400).json({ error: "Câmpuri lipsă!" });

    const exist = await User.findOne({ where: { email } });
    if (exist)
        return res.status(409).json({ error: "Email deja folosit!" });

    const parolaHash = await bcrypt.hash(parola, 10);
    await User.create({ email, parola: parolaHash, tip });

    res.json({ succes: true });
}

// Login utilizator (POST)
export async function login(req, res) {
    const { email, parola } = req.body;
    if (!email || !parola)
        return res.status(400).json({ error: "Câmpuri lipsă!" });

    const user = await User.findOne({ where: { email } });
    if (!user)
        return res.status(401).json({ error: "Email inexistent!" });

    const ok = await bcrypt.compare(parola, user.parola);
    if (!ok)
        return res.status(401).json({ error: "Parolă greșită!" });

    const token = jwt.sign(
        { idUser: user.idUser, email: user.email, tip: user.tip },
        JWT_SECRET,
        { expiresIn: "12h" }
    );

    res.json({ token, tip: user.tip, email: user.email });
}
