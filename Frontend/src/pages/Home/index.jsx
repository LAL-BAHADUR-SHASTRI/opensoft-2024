import Stylesheet from "reactjs-stylesheet";
import { useEffect,useState } from "react";
import './index.css'
import Carousel from "@/components/carousel";
import { ContWatch, GenreCard } from "@/components/mov_thumbn";
import Toast from "@/components/Toast";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BHOST}/movie/`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
        console.log('Success:', data);
        Toast.success('Data Loaded Successfully');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
        Toast.error('Error Fetching Data');
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BHOST}/movie/genres`)
      .then(response => response.json())
      .then(data => {
        setGenres(data);
        console.log('Success:', data);
        Toast.success('Data Loaded Successfully');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        Toast.error('Error Fetching Data');
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  return (
    <div style={styles.container}>
      <Carousel />
      <h2 style={styles.heading}>Continue Watching</h2>
      <div className="scroller" style={styles.scroller} >
        <ContWatch />
        <ContWatch />
        <ContWatch />
      </div>
      <h2 style={styles.heading}>Top Genres</h2>
      <div className="scroller" style={styles.scroller} >
          <GenreCard />
          <GenreCard />
          <GenreCard />
          <GenreCard />
          <GenreCard />
          <GenreCard />
      </div>
      <div style={{height: 100}}/>
    </div>
  )
}

export default HomePage;

const styles = Stylesheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    margin: 20, 
    color: 'white',
    fontWeight: 'bold', 
    fontSize: 32,
    width: "fit-content",
    
  },
  scroller: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
  }
})
