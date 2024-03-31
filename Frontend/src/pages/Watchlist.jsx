import React, { useState, useEffect } from "react";
// import { use } from "video.js/dist/types/tech/middleware";
import { MovieCard } from "@/components/mov_thumbn";

const Watchlist = () => {
  
  const [watchlist, setWatchlist] = useState([]);
   const getWatchlist = async () => {
      const response = await fetch(`${import.meta.env.VITE_BHOST}/user/watchlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('accessToken')
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Success:', data);
      setWatchlist(data);
    }

  useEffect(() => {
    getWatchlist()
  }, []);

  return <div className="bg-background min-h-screen px-8 py-2">
    {
      watchlist.map((movie) => {
        return <MovieCard data={movie} />
      })
   }
  </div>;
};
export default Watchlist;
