import "./index.css"
import logo from '../../assets/logo.svg'
import { useCallback, useEffect, useRef, useState } from "react"
import { LuSearch } from "react-icons/lu";
import Stylesheet from "reactjs-stylesheet";
import { COLORS } from "@/constants/themes";
import { motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { document } from "postcss";

//<--buttons-->


const NavButtons = ({onTabChange}) => {
  const [selected, setSelected] = useState(0)

  const buttons = ['Home','Movies','Watchlist','About'];

  const handlePress = (goto) => {
    onTabChange(goto);
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
            onClick={() => handlePress(index)}
            className="menuButton" >
            {item}
          </p>
          {item == buttons[selected] && <motion.div layoutId="selected" className="selected-bottom-bar"/> }
          </li>
        </ul>
      ))}
    </div>
  )
}

//<--search-->

const Search = () => {  // yar isko animate bhi karna hai .... baad me karunga
  
  const [search, setsearch] = useState('');
  const [isTyping, setTyping] = useState(false);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if(search.length > 0) setTyping(true); else setTyping(false);
    console.log(search)
  },[search]);
  
  const searchinput = useCallback((inputel) => {
    if(inputel) {
      inputel.focus();
    }
  },[])
  
  return isActive ?(
    <>
      <div />
      {isActive && <div style={styles.backShadow} onClick={() => {setActive(false);setTyping(false) }} />}
      <motion.div 
        style={{...styles.searchContainer, right: '26%' , position: "absolute", minWidth: '55%',zIndex: 10}} >
        <motion.span><LuSearch 
          size={20}
          color={COLORS.offwhite}
        />
        </motion.span>
        <input ref={searchinput} name="search" onChange={(data) => setsearch(data.target.value)} placeholder="Search for Movies, Series and more..." className="dark:text-input searchbox "/>
      </motion.div>
    </>
  ) :(
      <motion.div
        onClick={() => {setActive(!isActive); }} style={styles.searchContainer}>
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

const Nav = ({onTabChange}) => {



  const isLoggedin = false;
  
  return (
    <nav className="navbar">
      <img className="logo" src={logo} /> {/*logo*/}
      <div style={styles.buttonContainer}>
        <NavButtons onTabChange={onTabChange}/>
        <Search />
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
  backShadow:  {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    bottom: 0,
    left: 0,
    zIndex: 10,
    background: 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.6),rgba(0,0,0,0.8))'
  }
})

