import React, { useState, useRef, useEffect } from "react";
import "../styles/MeniuCont.css";

export default function MeniuCont() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [show, setShow] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!show) return;
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) setShow(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [show]);

  if (!user.email) return null;

  const Badge = ({ tip }) => (
    <span className={`badge ${tip}`} title={tip === "student" ? "Student" : "Profesor"}>
      {tip === "student" ? "S" : "P"}
    </span>
  );

  return (
    <div ref={ref} className="meniu-cont-container">
      <button className="meniu-cont-button" onClick={() => setShow(v => !v)}>
        Cont <span className="meniu-cont-arrow">▼</span>
      </button>

      {show && (
        <div className="meniu-dropdown">
          <div className="meniu-user">
            <span className="meniu-email">{user.email}</span>
            <Badge tip={user.tip} />
          </div>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
