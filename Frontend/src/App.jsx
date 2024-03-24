import "./App.css";
//import { Button } from './components/ui/button'
import useWindowDimensions from "./hooks/useWindowDimensions";
import Footer from "./components/ui/Footer";
import SignUp from "./components/ui/SignUp";
import NavBar from "./components/ui/NavBar";
// import SignIn from "./components/ui/SignIn";

function App() {
  const { height, width } = useWindowDimensions();

  return (
    <>
      {/* <div style={{ height: height, backgroundColor: 'gray'}}>
      <Button style={{ margin: '50%'}}> hello </Button>
    </div> */}
      <NavBar />
      <SignUp/>
      {/* <SignIn /> */}
      <Footer />
    </>
  );
}

export default App;
