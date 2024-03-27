import { Imgurl } from "@/constants/themes";
import "./index.css"
import { FaPlay } from "react-icons/fa6";

const ContWatch = (props) => {
    const prog_bar = {
        height: '100%',
        width: `${props?.watchLen || 30}%`,
        background: '#F0AB00'
      }
  return(
    <div className="ContWatch_">
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