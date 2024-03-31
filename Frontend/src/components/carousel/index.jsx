import Stylesheet from "reactjs-stylesheet";
import { useState,useRef } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlay,FaPlus } from "react-icons/fa";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import './index.css'
import imdb from '../../assets/imdb.svg'
import { COLORS, Imgurl, Img2url } from "@/constants/themes";
import { calcDur } from "@/lib/utils"
import { useNavigate } from "react-router-dom";


const Carousel = (props) => {

  const navigate = useNavigate();
  const [index, setindex] = useState(2);

   let data = {
    id: 1,
    rating: '8.8/10',
    tags: ['Action','Adventure','Fiction'],
    title: 'Avengers : Endgame',
    runtime: 150,
    desc: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi...'
  }

  return (
    <>
      <div style={styles.container} >
        <LuChevronLeft onClick={{}} className="swiper-button-prev" size={'7vh'} style={{...styles.arrows, left: '1%'}}/> 
        <Swiper
          effect={"coverflow"}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            depth: 350,
            modifier: 2.5,
            slideShadows: true,
          }}
          pagination={{
            enabled: true,
          }}
          navigation={{
            enabled: true,
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper"
          loop={true}
          autoplay={true}
        >
          {(props?.data || Array.from({length: 8})).map((item,index) => (
            <SwiperSlide >
              <div style={styles.card} >
                <img className="poster" src={item?.poster || Imgurl} onError={(e) => {
                    e.target.onerror = null; // To avoid infinite loop
                    e.target.src = Imgurl; // Provides fallback image URL
                  }} />
                <span className="movie-details">
                  <div style={styles.row}>
                    <img src={imdb} className="imdb-logo" />
                    <p className="rating">{item?.imdb.rating || data.rating}</p>
                    {(item?.genres || data.tags).map((el) =>
                      <p className="tags">{el}</p>
                    )}
                  </div>
                  <p className="movie-title" >
                    {(item?.title || data.title)}
                  </p>
                  <p className="movie-duration" >
                    {(calcDur(item?.runtime || data.runtime))}
                  </p>
                  <p className="movie-description" >
                    {item?.plot?.length > 100 ? item?.plot.slice(0,100)+'...' : item?.plot || data.desc}
                  </p>
                  <div style={styles.row}>
                    <div onClick={() => {navigate(`/movie/${item?._id || data.id}`); hideShadow();}} >
                      <p className="play-now">
                        <FaPlay style={{marginRight: 10}} size={12} /> Play Now
                      </p>
                    </div>
                    <p className="add-to-watchlist">
                      <FaPlus style={{marginRight: 10}} size={12} />  WatchList
                    </p>
                  </div>
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      <LuChevronRight 
        onClick={{}}
        className="swiper-button-next"
        size={'7vh'} 
        style={{...styles.arrows, right: '1%'}}/> 
      </div>
    </>
  )
}

export default Carousel;

const styles = Stylesheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '30%'
  },
  arrows : {
    position: "absolute",
    zIndex: 9,
    color: COLORS.offwhite,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  card : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})
