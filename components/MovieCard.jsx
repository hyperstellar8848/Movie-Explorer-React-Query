import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const MovieCard = React.memo(({ movie, onAction, actionLabel }) => {
  const navigate = useNavigate(); 
  const { isLoggedIn } = useAuth(); 

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", margin: "10px 0", backgroundColor: "#f9f9f9" }}>
      <h3>{movie.title}</h3>
      <p>امتیاز: {movie.rating} | سال تولید: {movie.year}</p>
      <p>ژانر: {movie.genre}</p>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button onClick={() => navigate(`/movie/${movie.id}`)}>جزئیات</button>

        <button 
          onClick={() => onAction(movie)} 
          disabled={actionLabel === "در لیست"} 
          style={{
            backgroundColor: !isLoggedIn ? "#ff9800" : actionLabel === "در لیست" ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {!isLoggedIn ? "ورود برای افزودن" : actionLabel}
        </button>
      </div>
    </div>
  );
});

MovieCard.displayName = "MovieCard";

export default MovieCard;
