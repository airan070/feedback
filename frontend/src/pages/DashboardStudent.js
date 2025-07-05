import React, { useEffect, useState } from "react";
import MeniuCont from "../components/MeniuCont";
import "../styles/DashboardStudent.css";

const feedbackOptions = [
  { tip: "smile", emoji: "😊", label: "Bine" },
  { tip: "frown", emoji: "😟", label: "Rău" },
  { tip: "surprised", emoji: "😮", label: "Surprins" },
  { tip: "confused", emoji: "😕", label: "Confuz" },
];

function getStatus(activity) {
  if (!activity) return "";
  const now = new Date();
  const start = new Date(activity.data_start);
  const end = new Date(activity.data_sfarsit);
  if (now < start) return "În curând";
  if (now >= start && now <= end) return "În desfășurare";
  if (now > end) return "Terminată";
  return "";
}

function isActivityActive(activity) {
  return getStatus(activity) === "În desfășurare";
}

function DashboardStudent() {
  const [activities, setActivities] = useState([]);
  const [cod, setCod] = useState("");
  const [selected, setSelected] = useState(null);
  const [inscriereMsg, setInscriereMsg] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    setInscriereMsg("");
    setFeedbackMsg("");
    try {
      const res = await fetch("http://localhost:9000/api/participare/activitati", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setActivities(Array.isArray(data) ? data : []);
      setSelected(null);
    } catch {
      setInscriereMsg("Eroare la încărcare activități.");
    }
    setLoading(false);
  };

  const handleInscriere = async (e) => {
    e.preventDefault();
    setInscriereMsg("");
    if (!cod) return;
    try {
      const res = await fetch("http://localhost:9000/api/participare/inscriere", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cod }),
      });
      const data = await res.json();
      if (res.ok) {
        setCod("");
        fetchActivities();
        setInscriereMsg("Înscriere realizată cu succes!");
        setTimeout(() => setInscriereMsg(""), 3000);
      } else {
        setInscriereMsg(data.error || "Eroare la înscriere.");
        setTimeout(() => setInscriereMsg(""), 3000);
      }
    } catch {
      setInscriereMsg("Eroare la înscriere.");
    }
  };

  const sendFeedback = async (tip) => {
    if (!selected) return;
    if (!isActivityActive(selected)) {
      setFeedbackMsg("Nu poți trimite feedback pentru o activitate care nu este în desfășurare.");
      setTimeout(() => setFeedbackMsg(""), 3000);
      return;
    }
    try {
      await fetch("http://localhost:9000/api/feedback/adauga", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idActivitate: selected.idActivitate,
          tip,
        }),
      });
      setFeedbackMsg("Feedback trimis!");
      setTimeout(() => setFeedbackMsg(""), 3000);
    } catch {
      setFeedbackMsg("Eroare la trimitere feedback!");
    }
  };

  return (
    <div className="container-dashboard">
      <div className="meniu-cont-float">
        <MeniuCont />
      </div>
      <div className="dashboard-content">
        <div className="left-panel">
          <div className="activities-header">
            <h1>Activități</h1>
            <form className="add-code-form" onSubmit={handleInscriere} autoComplete="off">
              <input
                placeholder="Cod activitate"
                value={cod}
                onChange={e => setCod(e.target.value)}
                className="input-cod"
                autoComplete="off"
              />
              <button type="submit" className="btn-inscriere">Înscrie-te</button>
            </form>
          </div>
          {inscriereMsg && <div className="notification-msg">{inscriereMsg}</div>}
          <ul className="activities-list">
            {activities.map(act => (
              <li
                key={act.idActivitate}
                className={"activity-item" + (selected && selected.idActivitate === act.idActivitate ? " selected" : "")}
                onClick={() => setSelected(act)}
                tabIndex={0}
              >
                {act.titlu}
              </li>
            ))}
          </ul>
          {loading && <div className="activity-loading">Se încarcă...</div>}
        </div>

        <div className="right-panel">
          <div className="feedback-header-row">
            <h1 className="feedback-title">Feedback</h1>
            {selected && (
              <div className="activity-info">
                <div className="activity-title">{selected.titlu}</div>
                <div className="activity-desc">{selected.descriere}</div>
                <div className="activity-status">
                  Status: {getStatus(selected)}
                </div>
              </div>
            )}
          </div>
          {selected ? (
            <>
              <div className="feedback-emojis">
                {feedbackOptions.map(opt => (
                  <button
                    key={opt.tip}
                    className="emoji-btn"
                    onClick={() => sendFeedback(opt.tip)}
                    tabIndex={0}
                    disabled={!isActivityActive(selected)}
                  >
                    <span className="emoji-icon" role="img" aria-label={opt.label}>
                      {opt.emoji}
                    </span>
                    <div className="emoji-label">{opt.label}</div>
                  </button>
                ))}
              </div>
              {feedbackMsg && <div className="notification-msg">{feedbackMsg}</div>}
            </>
          ) : (
            <div className="feedback-placeholder">
              Selectează o activitate din stânga pentru a acorda feedback.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardStudent;
