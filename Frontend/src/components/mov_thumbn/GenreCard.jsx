import { Imgurl, Img2url } from "@/constants/themes";
import "./index.css"
import Stylesheet from "reactjs-stylesheet";
import { useState } from "react";
import {motion} from 'framer-motion'

const Roll = (subprops) => {
    let varStyle = subprops.dir ? styles.initdir0 : styles.initdir1;
    let varStyle_ = subprops.dir ? styles.trans1 : styles.trans0;
    let varStyle2 = subprops.hovering ? varStyle_ : '';
    return(
        <div style={{...styles.roll_static,...varStyle, ...varStyle2  }}>
            <img
                src={subprops?.img1 || Img2url} className="rollimg"
            />
            <img
                src={subprops?.img2 || Img2url} className="rollimg"
            />
        </div>
    )
}

const GenreCard = (props) => {

    const [hovering, sethovering] = useState(false)
  return(
    <div 
    className="GenreCard_" 
    onMouseEnter={() => sethovering(true)}
    onMouseLeave={() => sethovering(false)}
    >
        <div className="genre_txt_o">
            <div className="genre_txt">{props?.title || 'Genre_title'}</div>
        </div>
        <Roll img1={props.img1} img2={props.img2} dir={true} hovering={hovering} />
        <Roll img1={props.img3} img2={props.img4} dir={false} hovering={hovering} />
    </div>
  )
}

export default GenreCard;

const styles = Stylesheet.create({
    roll_static: {
        height: '284px',
        width: '142px',
        display: 'flex',
        zIndex: '0',
        flexDirection: 'column',
        transition: 'all 0.5s ease'
    },
    initdir0: {
        // top: 0
        justifyContent: "flex-start"
    },
    initdir1: {
        // bottom: 0
        justifyContent: "flex-end"
    },
    trans0: {
        transform: 'translateY(38%)'
    },
    trans1: {
        transform: 'translateY(-38%)'
    }

})