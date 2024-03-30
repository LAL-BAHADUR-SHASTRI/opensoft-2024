import {React,useState} from "react";
import HomePage from "./Home";
import Watchlist from "./Watchlist";
import Nav from "@/components/Navbar";
import About from "./About";
import MovieList from "./Movielist";

const Intro = ({ActiveTab}) => {
  return (
    <div >
      {ActiveTab===0 && <HomePage/>}
      {ActiveTab===1 && <MovieList/>}
      {ActiveTab===2 && <Watchlist/>}
      {ActiveTab===3 && <About/>}
    </div>
  );
}
export default Intro;
