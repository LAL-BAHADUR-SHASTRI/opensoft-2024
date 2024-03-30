import Stylesheet from "reactjs-stylesheet";
import { useCallback, useEffect, jseRef, useState } from "react"
import { LuCreditCard, LuLogOut, LuSearch, LuUser } from "react-icons/lu";
import { COLORS } from "@/constants/themes";
import { motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

import "./index.css"
import logo from '../../assets/logo.svg'
import SearchResultCard from "./SearchResultCard";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import Trie from "./trie";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


//<--buttons-->


const NavButtons = ({selected,setSelected,onTabChange}) => {

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

const Search = () => {  

  
  const [isTyping, setTyping] = useState(false);
  const [isActive, setActive] = useState(false);
  const [prefix,setPrefix] = useState("");
  const [suggestion, setSuggestion ] = useState("");
  const [socketUrl, setSocketUrl] = useState('ws://10.145.128.28:8080/ws') 
  const [messageHistory, setMessageHistory] = useState([]);

  const {sendMessage, lastMessage, readyState} = useWebSocket(socketUrl);

  useEffect(() => {
    if(lastMessage){
      setMessageHistory((prev) => prev.concat(lastMessage));
      console.log('array',JSON.parse(lastMessage?.data).autocomplete)
      let words =JSON.parse(lastMessage?.data).autocomplete; 
      words =  words ? words : [];
      if(words.length > 0){
        setDictionary(words)
      }
    }
  },[lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING] : 'Connection',
    [ReadyState.OPEN] : 'Open',
    [ReadyState.CLOSING] : 'Closing',
    [ReadyState.CLOSED] : 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const [dictionary, setDictionary] = useState([]);
  const [myTrie, setTrie] = useState(new Trie())


  useEffect(() => {
    var newTrie = myTrie;
    console.log('making trie');
    (async()=>{
    // const dictionary = await getWords();
    for (let i = 0; i < dictionary.length; i++) {
      const word = dictionary[i];
      console.log('inserting word');
      myTrie.insert(word)
    }
    setTrie(newTrie)
  })();
  },[dictionary])

  useEffect(( ) => {
    console.log('i am here')
    var value = prefix;
    var found_words = myTrie.find(value).sort((a, b) => {
      return a.length - b.length;
    });
    console.log('found',found_words)
    var first_word = found_words[0];
    if (
      found_words.length !== 0 &&
        value !== "" &&
        value[value.length - 1] !== " "
    ) {
      if (first_word != null) {
        var remainder = first_word.slice(prefix.length);
        setSuggestion(value + remainder);
      }
    } else {
      setSuggestion(value);
    }
  },[])

  const onChange = (e) => {
    var value = e.target.value;
    setPrefix(value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 39 || e.keyCode === 9) {
      e.preventDefault();
      setPrefix(suggestion);
    }
    if(e.key === 'Enter'){
      sendMessage(
        JSON.stringify({type: "click", msg: prefix})
      );
    }
  };

  useEffect(() => {
    if(prefix.length > 0) setTyping(true); else setTyping(false);
    console.log(prefix) ;

    sendMessage(
      JSON.stringify({type: "search", msg: prefix})
    );
  },[prefix]);
  
  const searchinput = useCallback((inputel) => {
    if(inputel) {
      inputel.focus();
    }
  },[])

  const hideShadow = () => {
    setActive(false);
    setTyping(false); 
  }

  useEffect(() => {
    isActive ? 
      document.body.classList.add("stop-scrolling") 
      : 
      document.body.classList.remove("stop-scrolling");
  },[isActive])
  
  return isActive ?(
    <>
      <div />
      {isActive && (
        <div style={styles.backShadow} >
          <div style={{width: '100%', height: '100%', zIndex: 1}} onClick={hideShadow} ></div>
          <div  style={styles.searchResults} >
          {Array.from({length: 5}).map((item,index) => (
            <SearchResultCard />
            ))}
          </div>
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
        className="dark:text-input searchbox inputnev "

      />
      <input
        type="text"
        id="search-bar2"
        className="inputnev"
        tabIndex={-1}
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaCircleUser size={32} style={{color: COLORS.yellow}} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='dark:bg-gray-50' >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='hover:bg-gray-100' ><LuUser className="mr-2" /> Profile</DropdownMenuItem>
            <DropdownMenuItem  className='hover:bg-gray-100' ><LuCreditCard  className="mr-2" />  Subscription</DropdownMenuItem>
            <DropdownMenuItem  className='hover:bg-gray-100' ><LuLogOut className="mr-2" /> Log Out </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
  else {
    return (
      <div style={{display: 'flex', flexDirection: "row", paddingRight: 30}}>
        <Link to='/signin'><div className="signin" >Sign in</div></Link>
        <Link to='/signup'>
        <div className="signup" >Sign up</div>
        </Link>
      </div>
    )
  }
}

//<--main-->

const Nav = ({onTabChange, simpleNav = false}) => {

  const [selected, setSelected] = useState(0)
  const navigate = useNavigate();

  const isLoggedin = false;
  
  return (
    <nav className="navbar">
      <img onClick={() => { navigate('/'); onTabChange(0); setSelected(0); }} className="logo" src={logo} /> {/*logo*/}
      {!simpleNav && <div style={styles.buttonContainer}>
        <NavButtons onTabChange={onTabChange} selected={selected} setSelected={setSelected} />
        <Search />
      </div>}
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
    backgroundColor: COLORS.lightBlack,
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
    position: 'absolute',
    width: '100vw',
    height: 'calc(100vh)',
    bottom: -80,
    left: 0,
    zIndex: 10,
    background: 'linear-gradient(rgba(50,50,50,0.5),rgba(60,60,60,0.6),rgba(60,60,60,0.8))',
  },
  searchResults: {
    position: 'absolute',
    top: 5,
    width: '49%',
    backgroundColor: COLORS.lightBlack,
    border: '1px solid gray',
    marginLeft: '20%',
    marginRight: '29%',
    padding: '2%',
    borderRadius: 15,
    zIndex: 2
  }
})
