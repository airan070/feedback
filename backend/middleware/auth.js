import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export default function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Token lipsă" });
    const token = header.split(" ")[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET); 
        next();
    } catch (e) {
        res.status(401).json({ error: "Token invalid" });
    }
}
