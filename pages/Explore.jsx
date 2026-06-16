import React, { useState, useMemo, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; 
import { fetchMovies } from "../api/moviesApi";
import { useWatchlist } from "../context/WatchlistContext";
import { useAuth } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";

function Explore() {
  const { addMovie, isInWatchlist } = useWatchlist(); 
  const { isLoggedIn } = useAuth(); 
  const navigate = useNavigate(); 
  
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedGenre, setSelectedGenre] = useState("همه"); 
  const [showToast, setShowToast] = useState(false);
  const searchInputRef = useRef(null); 

  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const genres = ["همه", "sci-fi", "comedy", "action", "drama", "crime"];

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    return movies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === "همه" || movie.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [movies, searchTerm, selectedGenre]);

  const handleAddWatchlist = useCallback((movie) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    addMovie(movie);
    setShowToast(true); 
    setTimeout(() => setShowToast(false), 2000); 
    
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [addMovie, isLoggedIn, navigate]);

  if (isLoading) return <div style={{ padding: "20px" }}>... در حال بارگذاری</div>;
  
  if (isError) return <div style={{ padding: "20px", color: "red" }}>خطا در دریافت اطلاعات</div>;

  return (
    <div style={{ padding: "20px" }}>
      {showToast && (
        <div style={{ backgroundColor: "#ffeb3b", padding: "10px", marginBottom: "15px" }}>
          فیلم به واچ لیست اضافه شد!
        </div>
      )}
      
      <input
        ref={searchInputRef}
        type="text"
        placeholder="جستجو..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", width: "100%", maxWidth: "300px", marginBottom: "15px" }}
      />
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {genres.map((g) => (
          <button 
            key={g} 
            onClick={() => setSelectedGenre(g)} 
            style={{ backgroundColor: selectedGenre === g ? "#ffeb3b" : "#eee", border: "1px solid #ccc", padding: "5px 10px", cursor: "pointer" }}
          >
            {g}
          </button>
        ))}
      </div>
      
      <p>نمایش {filteredMovies.length} فیلم از {movies?.length} فیلم</p>
      
      {filteredMovies.length === 0 ? (
        <div>هیچ فیلمی پیدا نشد</div>
      ) : (
        filteredMovies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onAction={handleAddWatchlist} 
            actionLabel={isInWatchlist(movie.id) ? "در لیست" : "افزودن"} 
          />
        ))
      )}
    </div>
  );
}

export default Explore;
