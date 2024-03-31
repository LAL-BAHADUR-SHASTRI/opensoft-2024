import Stylesheet from 'reactjs-stylesheet';
import './App.css'
import Nav from './components/Navbar'
import HomePage from './pages/Home';
import MoviePage from './pages/MoviePage';
import React, { useEffect, useState, createContext } from 'react';
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
import userStore from './stores/user_store';
// import useWindowDimensions from './hooks/useWindowDimensions'

const MovieListContext = createContext({
  genre: '',
  setGenre: () => {}
}) 

function App() {    
  const [genre, setGenre] = useState('');
  const [ActiveTab, setActiveTab] = useState(0);
  const data=[
    { year: "Hello", number: 30 },
    { year: 2021, number: 40 },
    { year: 2022, number: 25 },
    { year: 2023, number: 35 },
    // Add more data entries as needed
  ];

 async function getUserWithJwt() {
   const userToken = localStorage.getItem('accessToken')
   if (!userToken) {
     return;
   }
   
    console.log(userToken)
    const response = await fetch(`${import.meta.env.VITE_BHOST}/user/with_token`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": userToken
        }
    }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
   console.log('Success:', data);
    localStorage.setItem('userTier',data?.tier)
    localStorage.setItem('userId',data["ID"])
    userStore.setState({email: data.email, bookmarks: data.bookmarks, id: data["ID"], tier: data.tier})
    console.log(userStore.getState())
  }
   
  useEffect(() => {
  
    
   getUserWithJwt()
  }, []);

  return (
    <>
    <MovieListContext.Provider
        value={{
          genre,
          setGenre
        }}
      >
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
              <Intro ActiveTab={ActiveTab} onTabChange={setActiveTab}/>
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
      </MovieListContext.Provider>
    </>
  )
}
export {App, MovieListContext};

const styles=Stylesheet.create({
  mainContainer: {
    display: 'flex'
  },
})
