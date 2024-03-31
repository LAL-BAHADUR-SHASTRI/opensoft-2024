import { Imgurl } from "@/constants/themes";
import "./index.css"
import { FaCirclePlay, FaRegCirclePlay } from "react-icons/fa6";
import Stylesheet from "reactjs-stylesheet";
import { useState } from "react";
import { LuClock3 } from "react-icons/lu";

// Replace data with props.data
// Or replace props with {data} -> preferred
const TrailerCard = ({data}) => {
    // let data = {
    //     mm: '2',
    //     ss: '30'
    // }
    const [hovering, sethovering] = useState(false)
    const [hoverply, sethoverply] = useState(false)
  return(
    <div 
        className="TrailerCard_"
        onMouseEnter={() => sethovering(true)}
        onMouseLeave={() => sethovering(false)}
    >
        <img
            src={data?.url || Imgurl}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = Imgurl;
              }}
            className="trCim"
            style={hovering ? styles.scale : {}}
        />
        <div className="dur_pl">
            <div className="ti_dur">
                <LuClock3 className="ti" />
                <p className="dur">{Math.round(data.runtime/60)}:{data.runtime%60}</p>
            </div>
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

export default TrailerCard;

const styles = Stylesheet.create({
    scale: {
        transform: 'scale(1.15'
    },
    op_max: {
        opacity: '100%'
    },
    op_min: {
        opacity: '0%'
    }
})