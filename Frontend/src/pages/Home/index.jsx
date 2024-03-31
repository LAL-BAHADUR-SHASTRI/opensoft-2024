import Stylesheet from "reactjs-stylesheet";
import { useEffect,useState } from "react";
import './index.css'
import Carousel from "@/components/carousel";
import { ContWatch, GenreCard, MovieCard } from "@/components/mov_thumbn";
import Toast from "@/components/Toast";
import ArrangeComp from "@/components/Movie_page/ArrangeCompn";

const HomePage = ({onTabChange}) => {
  const [carData, setCarData] = useState([]);
  const [topRated, setTR] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BHOST}/movie/latest`)
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
    fetch(`${import.meta.env.VITE_BHOST}/movie/topimdb`)
      .then(response => response.json())
      .then(data => {
        setTR(data);
        console.log('Success fetching Top Rated:', data);
      })
      .catch(error => {
        console.error('Error fetching Top Rated:', error);
        setLoading(false);
        Toast.error('Error Fetching Top Rated');
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

  function genContWatch () {
    return [topRated[4],topRated[8],topRated[0],topRated[5],topRated[6],topRated[3]];
  }

  return (
    <div style={styles.container}>
      <Carousel data={carData} />
      <h2 style={styles.heading}>Continue Watching</h2>
      <ArrangeComp dir="scroller" style={styles.scroller} Component={ContWatch} dat_arr={genContWatch()}/>
      <h2 style={styles.heading}>New Releases</h2>
      <ArrangeComp dir="scroller" style={styles.scroller} Component={MovieCard} dat_arr={carData}/>
      <h2 style={styles.heading}>Top Rated Movies</h2>
      <ArrangeComp dir="scroller" style={styles.scroller} Component={MovieCard} dat_arr={topRated}/>
      <h2 style={styles.heading}>Top Genres</h2>
      {genres.length > 0 ? <ArrangeComp dir="scroller" style={styles.scroller} Component={GenreCard} dat_arr={genres} onTabChange={onTabChange}/>: 
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>}
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
