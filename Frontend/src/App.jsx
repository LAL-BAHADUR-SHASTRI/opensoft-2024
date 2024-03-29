import Stylesheet from 'reactjs-stylesheet';
import './App.css'
import Nav from './components/Navbar'
import HomePage from './pages/Home';
import MoviePage from './pages/MoviePage';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from './pages/404page';
import SignIn from './components/Signin';
import Footer from './components/Footer';
import Intro from './pages/Intro';
import Purchase from './pages/Purchase';
import SignUp from './components/Signup';
// import useWindowDimensions from './hooks/useWindowDimensions'

function App() {
  const [ActiveTab, setActiveTab] = useState(0);
  return (
    <Router>
      <Nav onTabChange={setActiveTab}/>
      <Routes>
        <Route path="/" element={<Intro ActiveTab={ActiveTab} />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="*" element={<ErrorPage text="404 Page Not Found :(" />} />
      </Routes>
      <Footer />
    </Router>
  )
}
export default App;

const styles=Stylesheet.create({
  mainContainer: {
    flex: 1,
  },
})
