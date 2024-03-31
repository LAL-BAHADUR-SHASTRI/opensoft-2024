import Stylesheet from "reactjs-stylesheet";
import { useCallback, useEffect, jseRef, useState } from "react";
import { LuCreditCard, LuLogOut, LuSearch, LuUser } from "react-icons/lu";
import { COLORS } from "@/constants/themes";
import { motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { create } from "zustand";

import "./index.css";
import logo from "../../assets/logo.svg";
import SearchResultCard from "./SearchResultCard";
import Trie from "./trie";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userStore from "@/stores/user_store";


//<--buttons-->

const NavButtons = ({ selected, setSelected, onTabChange }) => {
  const buttons = ["Home", "Movies", "Watchlist", "About"];
  const navigate = useNavigate();

  const handlePress = (goto) => {
    onTabChange(goto);
    setSelected(goto);
    localStorage.removeItem('movieList');
    navigate("/");
  };

  return (
    <div className="menuButtons">
      {buttons.map((item, index) => (
        <ul key={index}>
          <li>
            <p
              style={item == selected ? styles.selectedStyle : {}}
              onClick={() => handlePress(index)}
              className="menuButton">
              {item}
            </p>
            {item == buttons[selected] && (
              <motion.div layoutId="selected" className="selected-bottom-bar" />
            )}
          </li>
        </ul>
      ))}
    </div>
  );
};

//<--search-->

const Search = ({ onTabChange, setSelected }) => {
  const [isActive, setActive] = useState(false);
  const [prefix,setPrefix] = useState("");
  const [suggestion, setSuggestion ] = useState("");
  const [socketUrl, setSocketUrl] = useState(`${import.meta.env.VITE_WS_HOST}`) 
  const [myTrie, setTrie] = useState(new Trie())
  const {sendMessage, lastMessage, readyState} = useWebSocket(socketUrl);
  const [fuzzyList, setFuzzy] = useState([]);

  const [final, setfinal] = useState([])

  useEffect(() => {
    let newtrie = myTrie;
    (async () => {
      if(lastMessage){

        console.log(lastMessage.data)
        let autoComp =JSON.parse(lastMessage?.data).fuzzy; 
        autoComp =  autoComp ? autoComp : [];
        if(autoComp.length > 0){
          setfinal([...final,...autoComp])
          autoComp.forEach(el => {
            newtrie.insert(el?.title.trim().toLowerCase());
          });
          setTrie(myTrie);
        }

        let fuzzy = JSON.parse(lastMessage?.data).fuzzy;
        fuzzy = fuzzy ? fuzzy : [];
        if (fuzzy.length > 0) {
          setfinal([...final,...fuzzy])
          fuzzy = autoComp.slice(0, 3).concat(fuzzy.slice(0, 4));
          fuzzy = fuzzy.filter((item, index) => fuzzy.indexOf(item) == index);
          setFuzzy(fuzzy);
        }

        let semantic =JSON.parse(lastMessage?.data).semantic;
        semantic = semantic ? semantic : [];
        if(semantic.length > 0){
          semantic=[...final,...semantic]
          console.log('semantic',semantic)
          localStorage.setItem('movieList', JSON.stringify({'semantic' : semantic}));
          setSelected(1);
          onTabChange(1);
          setfinal([]);
          hideShadow();
        }
      }
      console.log("suggest", newtrie.suggest(prefix));
      setSuggestion(myTrie.suggest(prefix.toLowerCase())[0]);
      let s = myTrie.suggest[0];
      if (!s.startsWith(prefix)) {
        setSuggestion("");
      }
    })();
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connection",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const onChange = (e) => {
    var value = e.target.value;
    setPrefix(value);
    if (connectionStatus == "Open") {
      console.log("hi");
      sendMessage(JSON.stringify({ type: "search", msg: value }));
    }
    if (!e) {
      setFuzzy([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 39 || e.keyCode === 9) {
      e.preventDefault();
      setPrefix(suggestion);
    }
    if (e.key === "Enter") {
      sendMessage(JSON.stringify({ type: "click", msg: prefix }));
    }
  };

  const searchinput = useCallback((inputel) => {
    if (inputel) {
      inputel.focus();
    }
  }, []);

  const hideShadow = () => {
    setPrefix("");
    setSuggestion("");
    console.log("cleanu");
    setActive(false);
    setFuzzy([]);
  };

  useEffect(() => {
    isActive
      ? document.body.classList.add("stop-scrolling")
      : document.body.classList.remove("stop-scrolling");
  }, [isActive]);

  return isActive ? (
    <>
      <div />
      {isActive && (
        <div style={styles.backShadow}>
          <div
            style={{ width: "100%", height: "100%", zIndex: 1 }}
            onClick={hideShadow}></div>
          {fuzzyList.length && (
            <div style={styles.searchResults}>
              {fuzzyList.map((item, index) => (
                <SearchResultCard hideShadow={hideShadow} data={item} />
              ))}
            </div>
          )}
        </div>
      )}
      <motion.div
        onClick={() => setActive(true)}
        animate={{ scaleX: [1, 1.1, 1] }}
        transition={{ duration: 0.3 }}
        style={{
          ...styles.searchContainer,
          right: "26%",
          position: "absolute",
          minWidth: "55%",
          zIndex: 10,
        }}>
        <motion.span>
          <LuSearch size={20} color={COLORS.offwhite} />
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
          value={prefix.length > 0 ? suggestion : ""}
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
const user = userStore.getState();
if(user.email){
  console.log(user.email)
}
if (user.id != "") { 
  console.log(user.id)
  
}
//<--User-->
const UserData = ({isLoggedin,setLoggedin}) => {
const navigate = useNavigate();
  if(isLoggedin){
    return (
      <div style={{ display: "flex", flexDirection: "row", paddingRight: 30 }}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaCircleUser size={32} style={{ color: COLORS.yellow }} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-gray-50">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='hover:bg-gray-100' ><LuUser className="mr-2" /> Profile</DropdownMenuItem>
            <DropdownMenuItem  className='hover:bg-gray-100' >
              <div onClick={() => navigate('/purchase')}
              style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <LuCreditCard  className="mr-2" />  Subscription
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem  className='hover:bg-gray-100' >
              <div 
                onClick={() => {localStorage.removeItem('accessToken'); setLoggedin(false)}} 
              style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                <LuLogOut className="mr-2" /> Log Out </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row", paddingRight: 30 }}>
        <Link to="/signin">
          <div className="signin">Sign in</div>
        </Link>
        <Link to="/signup">
          <div className="signup">Sign up</div>
        </Link>
      </div>
    );
  }
};

//<--main-->

const Nav = ({ onTabChange, simpleNav = false }) => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const [isLoggedin,setLoggedin] = useState(localStorage.getItem('accessToken'))
  
  // const isLoggedin = userStore.getState().id != "";
  // const
  // const  email = userStore((state) => state.getEmail());
  return (
    <nav className="navbar">
      <img
        onClick={() => {
          navigate("/");
          onTabChange(0);
          setSelected(0);
        }}
        className="logo"
        src={logo}
      />{" "}
      {/*logo*/}
      {!simpleNav && (
        <div style={styles.buttonContainer}>
          <NavButtons
            onTabChange={onTabChange}
            selected={selected}
            setSelected={setSelected}
          />
          <Search
            onTabChange={onTabChange}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      )}
      <UserData setLoggedin={setLoggedin} isLoggedin={isLoggedin} />
    </nav>
  );
};

export default Nav;

//<--styles--> // maybe remove these in future ?

const styles = Stylesheet.create({
  selectedStyle: {
    color: COLORS.white,
  },
  searchContainer: {
    display: "flex",
    zIndex: 10,
    flexDirection: "row",
    padding: 8,
    margin: 12,
    backgroundColor: COLORS.lightBlack,
    borderWidth: 1,
    borderColor: "rgba(50,50,50,1)",
    borderRadius: 20,
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  backShadow: {
    position: "absolute",
    width: "100vw",
    height: "calc(100vh)",
    bottom: -70,
    left: 0,
    zIndex: 10,
    background:
      "linear-gradient(rgba(50,50,50,0.5),rgba(60,60,60,0.6),rgba(60,60,60,0.8))",
  },
  searchResults: {
    position: "absolute",
    top: 5,
    width: "49%",
    backgroundColor: COLORS.lightBlack,
    border: "1px solid gray",
    marginLeft: "20%",
    marginRight: "29%",
    padding: "2%",
    borderRadius: 15,
    zIndex: 2,
  },
});
