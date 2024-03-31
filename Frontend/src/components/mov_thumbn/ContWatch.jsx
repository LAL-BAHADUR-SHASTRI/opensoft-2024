import { Imgurl } from "@/constants/themes";
import "./index.css"
import { FaPlay } from "react-icons/fa6";
import { genRand } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const ContWatch = (props) => {
    const navigate = useNavigate();
    const prog_bar = {
        height: '100%',
        width: `${genRand(0,80)}%`,
        // width: `${props?.data?.watchLen || 30}%`,
        background: '#F0AB00',
        borderBottomLeftRadius: 10
      }
    let id = '1';
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
        <div
            className="play-button" 
            onClick={() => {navigate(`/movie/${props?.data?._id || id}`); hideShadow();}}
        >
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
