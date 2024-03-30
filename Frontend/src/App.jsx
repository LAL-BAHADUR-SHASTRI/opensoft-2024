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
// import useWindowDimensions from './hooks/useWindowDimensions'

function App() {
  const [ActiveTab, setActiveTab] = useState(0);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" element={
            <>
              <Nav simpleNav={true} onTabChange={setActiveTab}/>
              <SignIn />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Nav simpleNav={true} onTabChange={setActiveTab}/>
              <SignUp />
            </>
          } />
          <Route path="*" element={<ErrorPage text="404 Page Not Found :(" />} />
          <Route path="/" element={
            <>
              <Nav onTabChange={setActiveTab}/>
              <Intro ActiveTab={ActiveTab} />
            </>
          } />
          <Route path="/movie/:id" element={
            <>
              <Nav onTabChange={setActiveTab}/>
              <MoviePage />
            </>
          } />
          <Route path="/:id/success" element={
            <>
              <Nav simpleNav={true} onTabChange={setActiveTab}/>
              <Success />
            </>
          } />
          <Route path="/purchase" element={
            <>
              <Nav simpleNav={true} onTabChange={setActiveTab}/>
              <Purchase />
            </>
          } />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}
export default App;

const styles=Stylesheet.create({
  mainContainer: {
    display: 'flex'
  },
})
