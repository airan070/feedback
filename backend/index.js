import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import './entities/relations.js';
import userRouter from './routes/UserRouter.js';
import activitateRouter from './routes/ActivitateRouter.js';
import participareRouter from './routes/ParticipareRouter.js';
import feedbackRouter from './routes/FeedbackRouter.js';

import db from './dbConfig.js';

// Se încarcă variabilele de mediu (.env)
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Se montează toate rutele
app.use('/api/user', userRouter);
app.use('/api/activitate', activitateRouter);
app.use('/api/participare', participareRouter);
app.use('/api/feedback', feedbackRouter);

// Se verifică conexiunea la baza de date înainte de pornire
try {
    await db.authenticate();
    console.log('Conexiunea la baza de date a fost realizată cu succes.');
} catch (error) {
    console.error('Eroare la conectarea la baza de date:', error);
}

const port = process.env.PORT || 9000;
app.listen(port, () => console.log("Server pornit pe portul " + port));
