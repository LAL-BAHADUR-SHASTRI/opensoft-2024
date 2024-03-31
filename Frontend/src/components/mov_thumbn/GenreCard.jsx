import { Imgurl, Img2url } from "@/constants/themes";
import "./index.css"
import Stylesheet from "reactjs-stylesheet";
import { useContext, useState } from "react";
import { getRandImg } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { MovieListContext } from "@/App";

const Roll = (subprops) => {
  let varStyle = subprops.dir ? styles.initdir0 : styles.initdir1;
  let varStyle_ = subprops.dir ? styles.trans1 : styles.trans0;
  let varStyle2 = subprops.hovering ? varStyle_ : '';
  return(
    <div style={{...styles.roll_static,...varStyle, ...varStyle2  }}>
      <img
        src={subprops?.img1 || getRandImg()}
        className="rollimg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = getRandImg();
        }}
      />
      <img
        src={subprops?.img2 || getRandImg()}
        className="rollimg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = getRandImg();
        }}
      />
    </div>
  )
}

const GenreCard = (props) => {
  const {setGenre} = useContext(MovieListContext);
  const navigate = useNavigate();
  const [hovering, sethovering] = useState(false);
  return(
    <div>
    <div 
      className="GenreCard_" 
      onMouseEnter={() => sethovering(true)}
      onMouseLeave={() => sethovering(false)}
      onClick={() => {console.log("Setting to :",props?.data?.genre); setGenre((prev) => props.data.genre) ;props.onTabChange(1);navigate(`/`); hideShadow();}}
    >
      <div className="genre_txt_o">
        <div className="genre_txt">{props?.data?.genre || 'Genre_title'}</div>
      </div>
      {/* {console.log(props?.data?.posters[0]?.poster || Img2url)} */}
      <Roll img1={props?.data?.posters[0]?.poster || getRandImg()} img2={props?.data?.posters[1]?.poster || getRandImg()} dir={true} hovering={hovering} />
      <Roll img1={props?.data?.posters[2]?.poster || getRandImg()} img2={props?.data?.posters[3]?.poster || getRandImg()} dir={false} hovering={hovering} />
    </div>
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
