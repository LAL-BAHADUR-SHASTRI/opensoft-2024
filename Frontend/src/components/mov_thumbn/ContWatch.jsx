import "./index.css"
import { FaPlay } from "react-icons/fa6";
import Stylesheet from "reactjs-stylesheet";

let Imgurl = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8uK1L5G7UwQfdiartTL4sg-QtDgo8wsUBnRZ6V9foaCBlTOd8NZQyexTr0xiPsZlpKKJkrCfTtRhTD8gcfHwxNGrKSgi2bqwaiKpolFVr3chDgkRtVKL_fNwHScrKfEiZhYlCO9_FEu_m/w1920-h1080-c/avengers-endgame-uhdpaper.com-8K-94.jpg;' 

const ContWatch = (props) => {
    const prog_bar = {
        height: '100%',
        width: `${props?.watchLen || 30}%`,
        background: '#F0AB00'
      }
  return(
    <div class="ContWatch_">
        <div className="divimg">
            <img
                src={props?.obj?.img || Imgurl} className="img_"
            />
        </div>
        <div className="play-button">
            <FaPlay className="playimg_"/>
            <div className="playtxt_">Play</div>
        </div>
        <div className="progress">
            <div style={prog_bar}></div>
        </div>
    </div>
  )
}

export default ContWatch;