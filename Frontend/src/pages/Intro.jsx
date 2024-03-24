import About from "@/components/About";
import NavBar from "@/components/NavBar";
import SignIn from "@/components/SignIn";
import Statistics from "@/components/Statistics";
import { Contact, Home } from "lucide-react";
import {React,useState} from "react";

const Intro = () => {
    const [ActiveTab, setActiveTab] = useState(0);
    return (
        <div className=" bg-signin">
            <h1>Intro</h1>
        <NavBar onTabChange={setActiveTab}/>
        {ActiveTab===0 && <Home/>}
        {ActiveTab===1 && <About/>}
        {ActiveTab===2 && <Contact/>}
        {ActiveTab===3 && <Statistics/>}
        </div>
    );
    }
    export default Intro;