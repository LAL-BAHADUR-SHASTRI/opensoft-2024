import "./index.css"
import logo from '../../assets/logo.svg'
//import { useEffect, useState } from "react"
import { LuSearch } from "react-icons/lu";
import Stylesheet from "reactjs-stylesheet";
import { COLORS } from "@/constants/themes";
import { motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import React, { useState, useCallback, useEffect } from 'react';
//<--buttons-->


const NavButtons = () => {
  const [selected, setSelected] = useState('Home')

  const buttons = ['Home','Movies','Series','Watchlist'];

  const handlePress = (goto) => {
    setSelected(goto);
  }

   
  return (
    <div className="menuButtons" >
      {buttons.map((item,index) => (
        <ul
          key={index}
        >
          <li>
          <p 
            style={item == selected ? styles.selectedStyle : {}}
            onClick={() => handlePress(item)}
            className="menuButton" >
            {item}
          </p>
          {item == selected && <motion.div layoutId="selected" className="selected-bottom-bar"/> }
          </li>
        </ul>
      ))}
    </div>
  )
}

//<--search-->

const Search = ({isActive, setActive,isTyping, setTyping}) => {  // yar isko animate bhi karna hai .... baad me karunga
  
  const [search, setsearch] = useState('');
  var socket = null;
    const [socketUrl, setSocketUrl] = useState('ws://10.145.59.41:8080/ws');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);


  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];



  useEffect(() => {
    if(search.length > 0) setTyping(true); else setTyping(false);
    console.log(search)
    sendMessage(
     JSON.stringify({type: "search", msg: search})
      );
  },[search])
  
  const handleEnter = (e) => {
    if(e.key === 'Enter'){
      sendMessage(
        JSON.stringify({type: "click", msg: search})
         );
    }
  }

  return isActive ?(
    <>
      <div />
      <motion.div 
        onClick={() => setActive(true)}
        animate={{scaleX: [1,1.1,1]}}
        transition={{duration: 0.1}}
        style={{...styles.searchContainer, right: '26%' , position: "absolute", minWidth: '55%',zIndex: 10}} >
        <LuSearch 
          size={20}
          color={COLORS.offwhite}
        />
        <input name="search" onChange={(data) => setsearch(data.target.value)} placeholder="Search for Movies, Series and more..." className="dark:text-input searchbox " onKeyDown={handleEnter}/>
      </motion.div>
    </>
  ) :(
      <motion.div
        layout
        onClick={() => setActive(!isActive)} style={styles.searchContainer}>
        <LuSearch 
          color={COLORS.offwhite}
        />
      </motion.div>
    )
}

//<--User-->
const UserData = ({isLoggedin}) => {
  if(isLoggedin){
    return (
      <div style={{display: 'flex', flexDirection: "row", paddingRight: 30}}>
        <FaCircleUser size={32} style={{color: COLORS.yellow}} />
      </div>
    )
  }
  else {
    return (
      <div style={{display: 'flex', flexDirection: "row", paddingRight: 30}}>
        <div className="signin" >Sign in</div>
        <div className="signup" >Sign up</div>
      </div>
    )
  }
}

//<--main-->

const Nav = ({isActive,setActive,setTyping,isTyping}) => {



  const isLoggedin = false;
  
  return (
    <nav className="navbar">
      <img className="logo" src={logo} /> {/*logo*/}
      <div style={styles.buttonContainer}>
        <NavButtons />
        <Search isActive={isActive} setActive={setActive} isTyping={isTyping} setTyping={setTyping}/>
      </div>
      <div />
      <UserData isLoggedin={isLoggedin}/>
    </nav>
  )
}

export default Nav;

//<--styles--> // maybe remove these in future ?

const styles = Stylesheet.create({
  selectedStyle : {
    color: COLORS.white,
  },
 searchContainer : {
    display: 'flex',
    zIndex: 10,
    flexDirection: 'row',
    padding: 8,
    margin: 12,
    backgroundColor: 'rgba(20,20,20,1)',
    borderWidth: 1,
    borderColor: 'rgba(50,50,50,1)',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonContainer :{
    display: 'flex',
    flex: 1, 
    flexDirection:'row', 
    alignItems: 'center', 
    justifyContent: 'space-evenly'
  }, 
})

