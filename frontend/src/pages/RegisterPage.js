import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/RegisterPage.css"; 

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [tip, setTip] = useState("student");
  const [loading, setLoading] = useState(false);
  const [eroare, setEroare] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setEroare("");
    setLoading(true);
    try {
      const resp = await fetch("http://localhost:9000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, parola, tip })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setEroare(data.error || "Eroare necunoscută!");
      } else {
        navigate("/login");
      }
    } catch {
      setEroare("Eroare de rețea!");
    }
    setLoading(false);
  }

  return (
    <div className="register-page-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Creare cont</h2>
        <input
          autoFocus
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="password"
          placeholder="Parolă"
          value={parola}
          onChange={e => setParola(e.target.value)}
          required
          minLength={4}
          className="register-input"
        />
        <select
          value={tip}
          onChange={e => setTip(e.target.value)}
          className="register-select"
        >
          <option value="student">Student</option>
          <option value="profesor">Profesor</option>
        </select>
        <button
          type="submit"
          className="register-button"
          disabled={loading}
        >
          {loading ? "Se crează..." : "Creează cont"}
        </button>
        {eroare && <div className="register-error">{eroare}</div>}
        <div className="register-footer">
          Ai deja cont? <Link to="/login" className="register-link">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
