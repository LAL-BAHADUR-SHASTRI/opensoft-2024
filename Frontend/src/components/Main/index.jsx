import Stylesheet from "reactjs-stylesheet";

import { ContWatch, GenreCard } from '../mov_thumbn'
import './index.css'
import Carousel from "../carousel";

const Main = () => {
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

export default Main;

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
