import Stylesheet from "reactjs-stylesheet";
import { useState,useRef } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import './index.css'
import { FaPlay,FaPlus } from "react-icons/fa";

import imdb from '../../assets/imdb.svg'
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import { COLORS } from "@/constants/themes";

const Carousel = (props) => {

  let Imgurl = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8uK1L5G7UwQfdiartTL4sg-QtDgo8wsUBnRZ6V9foaCBlTOd8NZQyexTr0xiPsZlpKKJkrCfTtRhTD8gcfHwxNGrKSgi2bqwaiKpolFVr3chDgkRtVKL_fNwHScrKfEiZhYlCO9_FEu_m/w1920-h1080-c/avengers-endgame-uhdpaper.com-8K-94.jpg;' 

  const [index, setindex] = useState(2);

   let data = {
    rating: '8.8/10',
    tags: ['Action','Adventure','Fiction'],
    title: 'Avengers : Endgame',
    duration: '2:30',
    desc: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate '
  }

  return (
    <>
      <div style={styles.container} >
        <LuChevronLeft onClick={{}} className="swiper-button-prev" size={'7%'} style={{...styles.arrows, left: '1%'}}/> 

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
          {Array.from({length: 8}).map((item,index) => (
            <SwiperSlide >
              <div style={styles.card} >
                <img className="poster" src={Imgurl} />
                <span className="movie-details">
                  <div style={styles.row}>
                    <img src={imdb} className="imdb-logo" />
                    <p className="rating">{data.rating}</p>
                    {data?.tags.map((el) =>
                      <p className="tags">{el}</p>
                    )}
                  </div>
                  <p className="movie-title" >
                    {data.title}
                  </p>
                  <p className="movie-duration" >
                    {data.duration}min
                  </p>
                  <p className="movie-description" >
                    {data?.desc.length > 100 ? data?.desc.slice(0,100)+'...' : data?.desc}
                  </p>
                  <div style={styles.row}>
                    <p className="play-now">
                      <FaPlay style={{marginRight: 10}} size={12} /> Play Now
                    </p>
                    <p className="add-to-watchlist">
                      <FaPlus style={{marginRight: 10}} size={12} />  WatchList
                    </p>
                  </div>
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <LuChevronRight 
        onClick={{}}
        className="swiper-button-next"
        size={'7%'} 
        style={{...styles.arrows, right: '1%'}}/> 
      <div>
        hwllot
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
