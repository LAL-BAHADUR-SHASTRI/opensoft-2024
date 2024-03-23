import "./App.css";
//import { Button } from './components/ui/button'
import useWindowDimensions from "./hooks/useWindowDimensions";
import Footer from "./components/ui/Footer";
import SignIn from "./components/ui/SignIn";
import NavBar from "./components/ui/NavBar";

function App() {
  const { height, width } = useWindowDimensions();

  return (
    <>
      {/* <div style={{ height: height, backgroundColor: 'gray'}}>
      <Button style={{ margin: '50%'}}> hello </Button>
    </div> */}
      <NavBar />
      <SignIn />
      <Footer />
    </>
  );
}

export default App;
