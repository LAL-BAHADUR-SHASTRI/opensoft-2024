import { Imgurl, Img2url } from "@/constants/themes";
import "./index.css"
import '../carousel/index.css'
import { FaCirclePlay, FaRegCirclePlay } from "react-icons/fa6";
import Stylesheet from "reactjs-stylesheet";
import { useState } from "react";

import imdb from '../../assets/imdb.svg'

const MovieCard = (props) => {
    const [hovering, sethovering] = useState(false)
    const [hoverply, sethoverply] = useState(false)
    let data = {
        rating: '8.8/10',
        tags: ['Action','Adventure','Fiction'],
        title: 'Avengers : Endgame',
        duration_hh: '2',
        duration_mm: '30',
        series: false,
        // series: true,
        episodes: '8'
    }
  return(
    <div
        className={`MovieCard_ ${data.series ? 'landscape' : 'portrait'}`}
        onMouseEnter={() => sethovering(true)}
        onMouseLeave={() => sethovering(false)}
    >
        <img
            src={data?.obj?.img || data.series ? Imgurl : Img2url} 
            className="mov_img"
        />
        <div 
            className='scroll_d'
            style={hovering ? styles.scroll_trans : {}}
        >
            <div className="blk"></div>
            <div className="data">
                <span className="movie-details">
                    <div className="row_">
                        <img src={imdb} className="imdb_l" />
                        <p className="rating_">{data.rating}</p>
                    </div>
                    <p className="title_" >
                        {data.title}
                    </p>
                    <p className="dur_ep" >
                        {data.series ? `${data.episodes} episodes` : `${data.duration_hh}h ${data.duration_mm}min`}
                    </p>
                    <div className="row_">
                        {data?.tags.map((el) =>
                        <p className="tag_">{el}</p>
                        )}
                    </div>
                </span>
            </div>
        </div>
        <div
            className="play_layer" 
            style={hovering ? styles.op_max : {}}
        >
            <div 
                className="play_b"
                onMouseEnter={() => sethoverply(true)}
                onMouseLeave={() => sethoverply(false)}
            >
                <FaRegCirclePlay 
                    className="b" 
                    style={hoverply ? styles.op_min : styles.op_max}
                />
                <FaCirclePlay 
                    className="b" 
                    style={hoverply ? styles.op_max : styles.op_min}
                />
            </div>
        </div>
    </div>
  )
}

export default MovieCard;

const styles = Stylesheet.create({
    scroll_trans: {
        transform: 'translateY(-50%)'
    },
    op_max: {
        opacity: '100%'
    },
    op_min: {
        opacity: '0%'
    }
})