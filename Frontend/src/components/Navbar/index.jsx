import Stylesheet from "reactjs-stylesheet";
import { useCallback, useEffect, jseRef, useState } from "react"
import { LuSearch } from "react-icons/lu";
import { COLORS } from "@/constants/themes";
import { motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "./index.css"
import logo from '../../assets/logo.svg'
import SearchResultCard from "./SearchResultCard";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import Trie from "./trie";
//<--buttons-->


const NavButtons = ({onTabChange}) => {
  const [selected, setSelected] = useState(0)

  const buttons = ['Home','Movies','Watchlist','About'];
  const navigate = useNavigate();

  const handlePress = (goto) => {
    onTabChange(goto);
    setSelected(goto);
    navigate('/');
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
  const [prefix,setPrefix] = useState("");
  const [suggestion, setSuggestion ] = useState("");

  const dictionary = {
    words: ['hello','helium','world','car','carpet','test','this','that','those','working','is']
  }

  var myTrie = new Trie();

  (async()=>{
    // const dictionary = await getWords();
    const words = dictionary.words;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      myTrie.insert(word)
    }
  })();

  const onChange = (e) => {
    var value = e.target.value;
    setPrefix(value);
    var words = value.split(" ");
    var trie_prefix = words[words.length - 1].toLowerCase();
    var found_words = myTrie.find(trie_prefix).sort((a, b) => {
      return a.length - b.length;
    });
    var first_word = found_words[0];
    if (
      found_words.length !== 0 &&
        value !== "" &&
        value[value.length - 1] !== " "
    ) {
      if (first_word != null) {
        var remainder = first_word.slice(trie_prefix.length);
        setSuggestion(value + remainder);
      }
    } else {
      setSuggestion(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      setPrefix(suggestion);
    }
  };

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
      {isActive && (
        <div style={styles.backShadow} onClick={() => {setActive(false);setTyping(false) }} >
          {/* {[Array.of(4)].map} */}
          <SearchResultCard />
        </div>
      )}
      <motion.div 
        onClick={() => setActive(true)}
        animate={{scaleX: [1,1.1,1]}}
        transition={{duration: 0.3}}
        style={{...styles.searchContainer, right: '26%' , position: "absolute", minWidth: '55%',zIndex: 10}} >
        <motion.span><LuSearch 
          size={20}
          color={COLORS.offwhite}
        />
        </motion.span>
      <input
        type="text"
        ref={searchinput}
        name="search-bar"
        id="search-bar"
        placeholder="Search for Movies, Series and more..."
        value={prefix}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="dark:text-input searchbox "
      />
      <input
        type="text"
        name="search-bar"
        id="search-bar2"
        value={suggestion}
      />
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
        <Link to='/signin'><div className="signin" >Sign in</div></Link>
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

