import Stylesheet from "reactjs-stylesheet";
import { COLORS, Imgurl } from "@/constants/themes";
import { FaPlay } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom';


const SearchResultCard = ({data, hideShadow}) => {
  const navigate = useNavigate();
  data = {
    name : data?.title,
    release: 2001,
    duration: data?.duration,
    id: data['_id']
  }
  return (
    <div onClick={() => console.log('click')} className="searchResultCard" style={styles.container}>
      <img style={styles.banner} src={Imgurl} />
      <div style={styles.details} >
        <p style={styles.name}>{data.name}</p>
        <p style={styles.subtext}>
          <p style={{paddingRight: 10, borderRightWidth: 1, borderRightColor: COLORS.offwhite }} >
            {data.release} 
          </p>
          <p style={{paddingLeft: 10}} > {data.duration} </p>

        </p>
      </div>
      <div style={styles.playbutton} onClick={() => {navigate(`/movie/${data.id}`); hideShadow();}} >
        <FaPlay />
        <p style={{marginLeft: 8}} >Play</p>
      </div>
    </div>
  )
} 

export default SearchResultCard;

const styles = Stylesheet.create({
  container: {
    display: 'flex',
    height: "100px",
    color: 'white',
    zIndex: 1,
    padding: 10,
    flexDirection: 'row',
    position: 'relative',
  },
  banner : {
    height: '100%',
    borderRadius: 10,
  },
  details : {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 20,
    justifyContent: 'space-evenly',

  },
  playbutton: {
    display: 'flex',
    flex: 1,
  },
  name : {
    fontWeight :"bold",
    fontSize: 24
  },
  subtext: {
    color: COLORS.offwhite,
    fontSize: 15,
    display: 'flex',
    flexDirection: 'row'

  },
  playbutton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
    alignItems: 'center',
    background: COLORS.yellow,
    height: 40,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 10,
    color: 'black'
  }
})
