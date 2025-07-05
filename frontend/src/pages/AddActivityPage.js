import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddActivityPage.css";


function AddActivityPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cod, setCod] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !desc || !start || !end) {
      setError("Completează toate câmpurile obligatorii.");
      return;
    }

    if (new Date(start) > new Date(end)) {
      setError("Data start trebuie să fie înaintea datei sfârșit.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const resp = await fetch("http://localhost:9000/api/activitate/creare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          titlu: title,
          descriere: desc,
          cod: cod,
          data_start: start,
          data_sfarsit: end,
        }),
      });

      if (resp.ok) {
        navigate("/dashboard-professor");
      } else {
        const data = await resp.json();
        setError(data.error || "Eroare la crearea activității.");
      }
    } catch {
      setError("Eroare la crearea activității.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="add-activity-container">
      <form onSubmit={handleCreate} className="add-activity-form">
        <h1>Creare activitate nouă</h1>

        <label className="add-activity-label">
          Titlu:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="add-activity-input"
          />
        </label>

        <label className="add-activity-label">
          Descriere:
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={5}
            className="add-activity-textarea"
          />
        </label>

        <label className="add-activity-label">
          Cod acces:
          <input
            type="text"
            value={cod}
            onChange={(e) => setCod(e.target.value)}
            className="add-activity-input"
          />
        </label>

        <div className="date-inputs-wrapper">
          <div className="date-input-group">
            <label>
              Data start:
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </label>
          </div>

          <div className="date-input-group">
            <label>
              Data sfârșit:
              <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </label>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button">
          Creează
        </button>
        <button type="button" onClick={handleBack} className="back-button">
          Înapoi
        </button>
      </form>
    </div>
  );
}

export default AddActivityPage;
