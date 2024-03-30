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
import { ToastContainer } from 'react-toastify';
// import useWindowDimensions from './hooks/useWindowDimensions'

function App() {    
  const [ActiveTab, setActiveTab] = useState(0);
  const data=[
    { year: "Hello", number: 30 },
    { year: 2021, number: 40 },
    { year: 2022, number: 25 },
    { year: 2023, number: 35 },
    // Add more data entries as needed
  ];


  const [userToken,setUserToken] = useState(localStorage.getItem('accessToken'))
  console.log(userToken,'userToken')

  return (
    <>
      <Router>
        <ToastContainer />
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
          <Route simpleNav={true} path="/movie/:id" element={
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
                  <Route path="/about" element={<About/>}/>
        <Route path="/linechart" element={
            <LineChart data={data} type="Year"/>
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
