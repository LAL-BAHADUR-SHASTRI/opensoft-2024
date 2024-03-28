import Stylesheet from 'reactjs-stylesheet';
import './App.css'
import Main from './components/Main'
import Nav from './components/Navbar'
import { useState } from 'react';
// import { Button } from './components/ui/button'
// import useWindowDimensions from './hooks/useWindowDimensions'



function App() {
  const [isTyping, setTyping] = useState(false);
  const [isActive, setActive] = useState(false);
  return (
    <div style={styles.mainContainer}>
      {isTyping && <div style={styles.backShadow} onClick={() => {setActive(false);setTyping(false) }} />}
      <Nav 
        isTyping={isTyping} 
        isActive={isActive}
        setActive={setActive}
        setTyping={setTyping}/>
      <Main />
    </div>
  )
}
export default App;

const styles=Stylesheet.create({
  mainContainer: {
    flex: 1,
  },
  backShadow:  {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    zIndex: 9,
    background: 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.6),rgba(0,0,0,0.8))'
  }
})
