import Stylesheet from 'reactjs-stylesheet';
import './App.css'
import Nav from './components/Navbar'
import HomePage from './pages/Home';
import MoviePage from './pages/MoviePage';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from './pages/404page';
import SignIn from './components/Signin';
import Footer from './components/Footer';
// import useWindowDimensions from './hooks/useWindowDimensions'

function App() {
  return (
    <Router>
        <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/signin" element={<SignIn />} />
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
