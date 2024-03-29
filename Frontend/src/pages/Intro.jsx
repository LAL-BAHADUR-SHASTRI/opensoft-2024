import {React,useState} from "react";
import HomePage from "./Home";
import Watchlist from "./Watchlist";
import Nav from "@/components/Navbar";
import About from "./About";
import MovieList from "./Movielist";

const Intro = () => {
    const [ActiveTab, setActiveTab] = useState(0);
    return (
        <div className=" bg-signin">
            <h1>Intro</h1>
        <Nav onTabChange={setActiveTab}/>
        {ActiveTab===0 && <HomePage/>}
        {ActiveTab===1 && <MovieList/>}
        {ActiveTab===2 && <Watchlist/>}
        {ActiveTab===3 && <About/>}
        </div>
    );
    }
    export default Intro;