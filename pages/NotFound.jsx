import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>صفحه ای یافت نشد!</h1>
      <p style={{ margin: "20px 0", color: "#666" }}>آدرسی که وارد کردید در سیستم وجود ندارد.</p>
      <button onClick={() => navigate("/")} style={{ padding: "10px 20px", cursor: "pointer" }}>
        بازگشت به خانه
      </button>
    </div>
  );
}

export default NotFound;