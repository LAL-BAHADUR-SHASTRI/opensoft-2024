import "./index.css"
import logo from '../../assets/logo.svg'
import { useState } from "react"
import { LuSearch } from "react-icons/lu";
import Stylesheet from "reactjs-stylesheet";
import { COLORS } from "@/constants/themes";

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
        <text 
          key={index}
          style={item == selected ? styles.selectedStyle : {}}
          onClick={() => handlePress(item)}
          className="menuButton" >
          {item}
        </text>
      ))}
    </div>
  )
}

//<--search-->

const Search = ({isActive, setActive}) => {  // yar isko animate bhi karna hai .... baad me karunga
  return isActive ?(
    <>
      <div style={styles.searchContainer}/>
      <div style={{...styles.searchContainer, right: '25%' , position: "absolute", minWidth: '55%'}} >
        <LuSearch 
          size={28}
          color="rgba(153, 153, 153, 1)"
        />
        <input onChange={() => console.log('hi')} placeholder="Search for Movies, Series and more..." className="dark:text-input searchbox "/>
      </div>
    </>
  ) :(
      <div onClick={() => setActive(!isActive)} style={styles.searchContainer}>
        <LuSearch 
          color="rgba(153, 153, 153, 1)"
        />
      </div>
    )
}

//<--User-->
const UserData = ({isLoggedin}) => {
  if(isLoggedin){
    return (
    <></>
    )
  }
  else {
    return (
      <div style={{display: 'flex', flexDirection: "row"}}>
        <div className="signin" >Sign in</div>
        <div className="signup" >Sign up</div>
      </div>
    )
  }
}

//<--main-->

const Nav = () => {

  const [isActive, setActive] = useState(false)
  const isLoggedin = false;
  
  return (
    <nav className="navbar">
      <img className="logo" src={logo} /> {/*logo*/}
      <div style={{display: 'flex',flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <NavButtons />
        <Search isActive={isActive} setActive={setActive}/>
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
    borderBottomWidth: 3,
    color: COLORS.white,
    borderBottomColor: 'rgba(240, 171, 0, 1)', 
  },
 searchContainer : {
    display: 'flex',
    zIndex: 10,
    flexDirection: 'row',
    padding: 10,
    margin: 12,
    backgroundColor: 'rgba(20,20,20,1)',
    borderWidth: 1,
    borderColor: 'rgba(50,50,50,1)',
    borderRadius: 20,
    alignItems: 'center'
  },
})

