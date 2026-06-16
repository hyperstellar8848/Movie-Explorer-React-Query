import React, { useState, useMemo, useCallback } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

function Watchlist() {
  const { watchlist, removeMovie } = useWatchlist();
  const [filterText, setFilterText] = useState("");

  const filteredWatchlist = useMemo(() => {
    return watchlist.filter((movie) =>
      movie.title.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [watchlist, filterText]);

  const handleRemove = useCallback((movie) => {
    removeMovie(movie.id);
  }, [removeMovie]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>واچ لیست من</h2>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="فیلتر بر اساس نام فیلم..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ padding: "8px", width: "100%", maxWidth: "300px" }}
        />
        <span>فیلتر</span>
      </div>

      <p>نمایش {filteredWatchlist.length} فیلم از {watchlist.length} فیلم ذخیره شده</p>

      {watchlist.length === 0 ? (
        <div style={{ padding: "20px", color: "#666" }}>هنوز فیلمی به واچ لیست اضافه نکردید.</div>
      ) : filteredWatchlist.length === 0 ? (
        <div style={{ padding: "20px", color: "orange" }}>فیلمی با این فیلتر پیدا نشد.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {filteredWatchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAction={handleRemove}
              actionLabel="حذف"
              isInWatchlistPage={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;