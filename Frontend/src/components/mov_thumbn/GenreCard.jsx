import { Imgurl, Img2url } from "@/constants/themes";
import "./index.css"
import Stylesheet from "reactjs-stylesheet";
import { useState } from "react";

const Roll = (subprops) => {
  let varStyle = subprops.dir ? styles.initdir0 : styles.initdir1;
  let varStyle_ = subprops.dir ? styles.trans1 : styles.trans0;
  let varStyle2 = subprops.hovering ? varStyle_ : '';
  return(
    <div style={{...styles.roll_static,...varStyle, ...varStyle2  }}>
      <img
        src={subprops?.img1 || Img2url}
        className="rollimg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = Img2url;
        }}
      />
      <img
        src={subprops?.img2 || Img2url}
        className="rollimg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = Img2url;
        }}
      />
    </div>
  )
}

const GenreCard = (props) => {

  const [hovering, sethovering] = useState(false)
  return(
    <div>
    <div 
      className="GenreCard_" 
      onMouseEnter={() => sethovering(true)}
      onMouseLeave={() => sethovering(false)}
    >
      <div className="genre_txt_o">
        <div className="genre_txt">{props?.data?.genre || 'Genre_title'}</div>
      </div>
      {/* {console.log(props?.data?.posters[0]?.poster || Img2url)} */}
      <Roll img1={props?.data?.posters[0]?.poster || Img2url} img2={props?.data?.posters[1]?.poster || Img2url} dir={true} hovering={hovering} />
      <Roll img1={props?.data?.posters[2]?.poster || Img2url} img2={props?.data?.posters[3]?.poster || Img2url} dir={false} hovering={hovering} />
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
