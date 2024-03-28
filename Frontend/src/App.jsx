import Stylesheet from 'reactjs-stylesheet';
import './App.css'
import Nav from './components/Navbar'
import HomePage from './pages/Home';
import MoviePage from './pages/MoviePage';
// import useWindowDimensions from './hooks/useWindowDimensions'



function App() {
  return (
    <div style={styles.mainContainer}>
      <Nav />
      {/* <HomePage /> */}
      <MoviePage />
    </div>
  )
}
export default App;

const styles=Stylesheet.create({
  mainContainer: {
    flex: 1,
  },
})
