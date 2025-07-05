# Proiect Feedback Activități

Aplicație web pentru gestionarea activităților și colectarea feedback-ului de la studenți.

---

## Structura proiectului

- `/backend` — Server Node.js cu Express, gestionează API-ul și baza de date
- `/frontend` — Aplicație React pentru interfața utilizator

---

## Configurare mediu de dezvoltare

### 1. Variabile de mediu

Creează un fișier `.env` în directorul `/backend` cu următorul conținut (înlocuiește valorile cu cele reale):


DB_HOST=localhost
DB_NAME=numele_bazei_de_date
DB_USER=utilizator_baza_date
DB_PASS=parola_baza_date
JWT_SECRET=cod_de_criptare
PORT=9000



### 2. Backend

Deschide terminalul și execută:


cd backend
npm install
npm start


### 3. Frontend
Deschide un alt terminal și execută:

cd frontend
npm install
npm start


# Observații
Asigură-te că baza de date este creată și configurată corect înainte de a porni backend-ul.

Frontend-ul comunică cu backend-ul pe portul definit în fișierul .env.


# Structura fișierelor
backend/ conține codul serverului și configurarea bazei de date.

frontend/ conține componentele React, stilurile CSS și logica UI.

# Script bd

DROP TABLE IF EXISTS Feedback;
DROP TABLE IF EXISTS Participare;
DROP TABLE IF EXISTS Activitate;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    parola VARCHAR(255) NOT NULL,
    tip ENUM('student', 'profesor') NOT NULL
);

CREATE TABLE Activitate (
    idActivitate INT AUTO_INCREMENT PRIMARY KEY,
    titlu VARCHAR(100) NOT NULL,
    descriere TEXT,
    data_start DATETIME NOT NULL,
    data_sfarsit DATETIME NOT NULL,
    cod VARCHAR(16) NOT NULL UNIQUE,
    idUser INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES User(idUser)
        ON DELETE CASCADE
);

CREATE TABLE Participare (
    idParticipare INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT NOT NULL,
    idActivitate INT NOT NULL,
    moment DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_participare (idUser, idActivitate),
    FOREIGN KEY (idUser) REFERENCES User(idUser)
        ON DELETE CASCADE,
    FOREIGN KEY (idActivitate) REFERENCES Activitate(idActivitate)
        ON DELETE CASCADE
);

CREATE TABLE Feedback (
    idFeedback INT AUTO_INCREMENT PRIMARY KEY,
    idActivitate INT NOT NULL,
    tip VARCHAR(16) NOT NULL,     
    ora_feedback DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idActivitate) REFERENCES Activitate(idActivitate)
        ON DELETE CASCADE
);
