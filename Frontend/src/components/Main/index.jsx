import Stylesheet from "reactjs-stylesheet";
import CarouselCard from "../carousel";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { COLORS } from "@/constants/themes";

const Carousel = (data) => {
  
  const [index, setindex] = useState(2);
  
  return (
    <div style={styles.container}>
      <LuChevronLeft size={'7%'} style={{...styles.arrows, left: '1%'}}/> 
      <CarouselCard cls={"left1"}   />
      <CarouselCard cls={"left2"}   />
      <CarouselCard cls={"front"}   />
      <CarouselCard cls={"right2"}  />
      <CarouselCard cls={"right1"}  />
      <LuChevronRight size={'7%'} style={{...styles.arrows, right: '1%'}}/>
    </div>
  )
}

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
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrows : {
    position: "absolute",
    zIndex: 99,
    color: COLORS.offwhite
  }
})
