import { Img2url } from "@/constants/themes";
import "./index.css"
import '../carousel/index.css'
import { FaCirclePlay, FaRegCirclePlay } from "react-icons/fa6";
import Stylesheet from "reactjs-stylesheet";
import { useState } from "react";

import imdb from '../../assets/imdb.svg'

const MovieCard = (props) => {
    const [hovering, sethovering] = useState(false)
    const [hovering2, sethovering2] = useState(false)
    let data = {
        rating: '8.8/10',
        tags: ['Action','Adventure','Fiction'],
        title: 'Avengers : Endgame',
        duration_hh: '2',
        duration_mm: '30',
    }
  return(
    <div
        className="MovieCard_"
        onMouseEnter={() => sethovering(true)}
        onMouseLeave={() => sethovering(false)}
    >
        <img
            src={data?.obj?.img || Img2url} 
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
                    <p className="duration_" >
                        {data.duration_hh}h {data.duration_mm}min
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
            style={hovering ? styles.layer_trans1 : {}}
        >
            <div 
                className="play_b"
                onMouseEnter={() => sethovering2(true)}
                onMouseLeave={() => sethovering2(false)}
            >
                <FaRegCirclePlay 
                    className="b b1" 
                    style={hovering2 ? styles.layer_trans2 : {}}
                />
                <FaCirclePlay 
                    className="b b2" 
                    style={hovering2 ? styles.layer_trans1 : {}}
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
    layer_trans1: {
        opacity: '100%'
    },
    layer_trans2: {
        opacity: '0%'
    }
})