import Stylesheet from "reactjs-stylesheet";
import { useState,useRef } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";

import './index.css'

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";


import Carousel from "../carousel";
import { COLORS } from "@/constants/themes";


const Main = () => {
  return (
    <div style={styles.container}>
      <Carousel />
    </div>
  )
}

export default Main;

const styles = Stylesheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  arrows : {
    position: "absolute",
    zIndex: 99,
    color: COLORS.offwhite
  }
})
