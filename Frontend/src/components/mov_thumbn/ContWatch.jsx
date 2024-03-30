import { Imgurl } from "@/constants/themes";
import "./index.css"
import { FaPlay } from "react-icons/fa6";

const ContWatch = (props) => {
    const prog_bar = {
        height: '100%',
        width: `${props?.data?.watchLen || 30}%`,
        background: '#F0AB00',
        borderBottomLeftRadius: 10
      }
  return(
    <div className="ContWatch_">
        <div className="divimg">
            <img
                src={props?.data?.poster || Imgurl}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = Imgurl;
                  }}
                className="img_"
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
