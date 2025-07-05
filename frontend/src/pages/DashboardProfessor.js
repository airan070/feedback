import React, { useEffect, useState, useRef } from "react";
import MeniuCont from "../components/MeniuCont";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardProfessor.css"; 

function feedbackEmoji(type) {
  if (type === "smile") return "🙂";
  if (type === "frown") return "🙁";
  if (type === "surprised") return "😲";
  if (type === "confused") return "😕";
  return "❔";
}

function feedbackLabel(type) {
  if (type === "smile") return "Bine";
  if (type === "frown") return "Rău";
  if (type === "surprised") return "Surprins";
  if (type === "confused") return "Confuz";
  return "Alt tip";
}

function DashboardProfessor({ user, onLogout }) {
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const feedbackEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      try {
        const resp = await fetch("http://localhost:9000/api/activitate/lista", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        const data = await resp.json();
        setActivities(Array.isArray(data) ? data : []);
      } catch {
        setActivities([]);
      }
      setLoading(false);
    }
    fetchActivities();
  }, []);

  const fetchFeedback = async () => {
    if (!selected) {
      setFeedback([]);
      return;
    }
    try {
      const resp = await fetch(
        "http://localhost:9000/api/feedback/lista/" + selected.idActivitate,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      const data = await resp.json();
      setFeedback(Array.isArray(data) ? data : []);
    } catch {
      setFeedback([]);
    }
  };

  useEffect(() => {
    if (!selected) {
      setFeedback([]);
      return;
    }
    fetchFeedback();
    const interval = setInterval(() => fetchFeedback(), 3000);
    return () => clearInterval(interval);
  }, [selected]);

  useEffect(() => {
    if (feedbackEndRef.current) {
      feedbackEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [feedback]);

  const handleCreate = () => navigate("/add-activity");

  const handleDelete = async () => {
    if (!selected) return;
    if (!window.confirm(`Ștergi activitatea "${selected.titlu}"?`)) return;

    try {
      const resp = await fetch(
        `http://localhost:9000/api/activitate/sterge/${selected.idActivitate}`,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (resp.ok) {
        setMsg(`Activitatea "${selected.titlu}" a fost ștearsă.`);
        setSelected(null);
        const resp2 = await fetch("http://localhost:9000/api/activitate/lista", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        const data2 = await resp2.json();
        setActivities(Array.isArray(data2) ? data2 : []);
      } else {
        setMsg("Eroare la ștergerea activității.");
      }
    } catch {
      setMsg("Eroare la ștergerea activității.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const handleInvite = () => {
    if (!selected) return;
    if (!selected.cod) {
      setMsg("Această activitate nu are cod de acces.");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    navigator.clipboard.writeText(selected.cod).then(() => {
      setMsg("Codul de acces a fost copiat în clipboard!");
      setTimeout(() => setMsg(""), 3000);
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <MeniuCont user={user} onLogout={onLogout} />
      </div>

      <div className="dashboard-header-space" />

      <div className="dashboard-content">
        <div className="activities-panel">
          <h1 className="panel-title">Activități</h1>
          {loading ? (
            <div>Se încarcă...</div>
          ) : (
            <>
              <ul className="activities-list">
                {activities.length === 0 && (
                  <li className="no-activity">Nicio activitate creată</li>
                )}
                {activities.map((act) => (
                  <li
                    key={act.idActivitate}
                    onClick={() => setSelected(act)}
                    className={`activity-item${
                      selected?.idActivitate === act.idActivitate ? " selected" : ""
                    }`}
                  >
                    {act.titlu}
                  </li>
                ))}
              </ul>
              <div className="activity-buttons">
                <button
                  className="btn primary"
                  onClick={handleCreate}
                >
                  Creează
                </button>
                <button
                  className="btn secondary"
                  onClick={handleDelete}
                  disabled={!selected}
                >
                  Șterge
                </button>
                <button
                  className="btn secondary"
                  onClick={handleInvite}
                  disabled={!selected}
                >
                  Invită
                </button>
              </div>
              {msg && <div className="status-message">{msg}</div>}
            </>
          )}
        </div>

        <div className="feedback-panel">
          <h1 className="panel-title align-left">Feedback activitate</h1>
          {selected ? (
            feedback.length > 0 ? (
              <div className="feedback-list">
                {feedback.map((fb, i) => (
                  <div key={i} className="feedback-item">
                    <span className="feedback-emoji">{feedbackEmoji(fb.tip)}</span>
                    <span className="feedback-label">{feedbackLabel(fb.tip)}</span>
                    <span className="feedback-time">
                      {new Date(fb.ora_feedback).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
                <div ref={feedbackEndRef} />
              </div>
            ) : (
              <div className="feedback-empty">Niciun feedback primit încă.</div>
            )
          ) : (
            <div className="feedback-select-info">
              Selectează o activitate din stânga pentru a vedea feedback.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardProfessor;
