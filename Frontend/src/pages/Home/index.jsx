import Stylesheet from "reactjs-stylesheet";
import { useEffect,useState } from "react";
import './index.css'
import Carousel from "@/components/carousel";
import { ContWatch, GenreCard } from "@/components/mov_thumbn";
import Toast from "@/components/Toast";
import ArrangeComp from "@/components/Movie_page/ArrangeCompn";

const HomePage = () => {
  const [carData, setCarData] = useState([]);
  const [contWData, setCW] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BHOST}/movie/topimdb`)
    .then(response => response.json())
    .then(data => {
        setCarData(data);
        setLoading(false);
        console.log('Success fetching Carousel:', data);
      })
      .catch(error => {
        console.error('Error fetching Carousel:', error);
        setLoading(false);
        Toast.error('Error Fetching Carousel');
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BHOST}/movie/latest`)
      .then(response => response.json())
      .then(data => {
        setCW(data);
        console.log('Success fetching Continue Watching:', data);
      })
      .catch(error => {
        console.error('Error fetching Continue Watchingta:', error);
        setLoading(false);
        Toast.error('Error Fetching Continue Watching');
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BHOST}/movie/genres`)
      .then(response => response.json())
      .then(data => {
        setGenres(data);
        console.log('Success fetching Genres:', data);
      })
      .catch(error => {
        console.error('Error fetching Genres:', error);
        Toast.error('Error Fetching Genres');
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
      <Carousel data={carData} />
      <h2 style={styles.heading}>Continue Watching</h2>
      <ArrangeComp dir="scroller" style={styles.scroller} Component={ContWatch} dat_arr={contWData}/>
      <h2 style={styles.heading}>Top Genres</h2>
      <ArrangeComp dir="scroller" style={styles.scroller} Component={GenreCard} dat_arr={genres}/>
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
    marginTop: "30px",
  },
  scroller: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
  }
})
