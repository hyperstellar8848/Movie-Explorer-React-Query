import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieById } from "../api/moviesApi";
import { useWatchlist } from "../context/WatchlistContext";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ["movie", id], 
    queryFn: () => fetchMovieById(id), 
    retry: false 
  });

  const isAdded = movie ? isInWatchlist(movie.id) : false;

  const handleToggleWatchlist = () => {
    if (isAdded) {
      removeMovie(movie.id); 
      navigate("/watchlist"); 
    } else {
      addMovie(movie); 
    }
  };

  if (isLoading) return <div style={{ padding: "20px" }}>... در حال بارگذاری اطلاعات فیلم</div>;
  
  if (isError || !movie) return <div style={{ padding: "20px", color: "red" }}>فیلم پیدا نشد (شناسه اشتباه است).</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "15px", padding: "5px 15px" }}>
        بازگشت
      </button>

      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        <h1>{movie.title}</h1>
        <p style={{ color: "#555" }}>{movie.year} | {movie.genre}</p>
        <div style={{ fontSize: "18px", fontWeight: "bold", margin: "10px 0" }}>امتیاز: {movie.rating}</div>
        
        <p><strong>کارگردان:</strong> {movie.director}</p>
        <p><strong>بازیگران:</strong> {movie.cast.join(", ")}</p>
        <p style={{ marginTop: "15px", lineHeight: "1.6" }}><strong>خلاصه داستان:</strong> {movie.plot}</p>

        <button
          onClick={handleToggleWatchlist}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: isAdded ? "#f44336" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%"
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;