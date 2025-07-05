import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css"; 

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [eroare, setEroare] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setEroare("");
    try {
      const resp = await fetch("http://localhost:9000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, parola }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setEroare(data.error || "Eroare la autentificare");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ email: data.email, tip: data.tip }));
        onLogin && onLogin({ email: data.email, tip: data.tip });
        navigate("/");
      }
    } catch {
      setEroare("Eroare de rețea");
    }
  }

  return (
    <div className="login-page-container">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="on">
        <div className="login-title">Login</div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="username"
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Parolă"
          value={parola}
          onChange={e => setParola(e.target.value)}
          autoComplete="current-password"
          required
          className="login-input password"
        />
        <button type="submit" className="login-button">Login</button>
        {eroare && <div className="login-error">{eroare}</div>}
        <div className="login-footer">
          Nu ai cont? <Link to="/register" className="login-link">Creează cont</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
