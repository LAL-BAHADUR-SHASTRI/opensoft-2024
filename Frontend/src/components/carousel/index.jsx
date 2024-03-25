import Stylesheet from "reactjs-stylesheet"
import "./index.css"


let Imgurl = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8uK1L5G7UwQfdiartTL4sg-QtDgo8wsUBnRZ6V9foaCBlTOd8NZQyexTr0xiPsZlpKKJkrCfTtRhTD8gcfHwxNGrKSgi2bqwaiKpolFVr3chDgkRtVKL_fNwHScrKfEiZhYlCO9_FEu_m/w1920-h1080-c/avengers-endgame-uhdpaper.com-8K-94.jpg;' 

const CarouselCard = (props) => {
  return(
    <div style={styles.card} className={"card " + props.cls} >
      <img 
        src={props?.obj?.img || Imgurl}
        style={styles.image}
      />
    </div>
  )
}

export default CarouselCard;

const styles = Stylesheet.create({
  card : {
    width: '55%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  image: {
    borderRadius: 10,
  }
})
