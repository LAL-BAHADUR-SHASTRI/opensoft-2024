import { Img2url } from "@/constants/themes";
import "./index.css"
import '../carousel/index.css'
import { FaCirclePlay, FaRegCirclePlay } from "react-icons/fa6";

import imdb from '../../assets/imdb.svg'

const MovieCard = (props) => {
    let data = {
        rating: '8.8/10',
        tags: ['Action','Adventure','Fiction'],
        title: 'Avengers : Endgame',
        duration_hh: '2',
        duration_mm: '30',
    }
  return(
    <div className="MovieCard_">
        <img
            src={data?.obj?.img || Img2url} className="mov_img"
        />
        <div className="scroll_d">
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
        {/* <div className="play_b">
            <FaRegCirclePlay />
            <FaCirclePlay />
        </div> */}
    </div>
  )
}

export default MovieCard;