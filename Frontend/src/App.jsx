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
import Success from './components/Success';
import SignUp from './components/Signup';
import About from './pages/About';
import { LineChart } from 'lucide-react';
// import useWindowDimensions from './hooks/useWindowDimensions'

function App() {
  const data=[
    { year: "Hello", number: 30 },
    { year: 2021, number: 40 },
    { year: 2022, number: 25 },
    { year: 2023, number: 35 },
    // Add more data entries as needed
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro/>} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/linechart" element={
            <LineChart data={data} type="Year"/>
        } />
        <Route path="*" element={<ErrorPage text="404 Page Not Found :(" />} />
      </Routes>
      <Footer />
    </Router>
  )
}
export default App;

const styles=Stylesheet.create({
  mainContainer: {
    display: 'flex'
  },
})
