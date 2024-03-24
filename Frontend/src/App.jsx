import "./App.css";
//import { Button } from './components/ui/button'
import useWindowDimensions from "./hooks/useWindowDimensions";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";

function App() {
  const { height, width } = useWindowDimensions();

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
