import Stylesheet from "reactjs-stylesheet";
import VideoJS from "@/components/videojs";
import { useEffect, useRef, useState } from "react";
import {
  useParams
} from "react-router"
import videojs from "video.js";
import Nav from "@/components/Navbar";
import { MoviePage_ } from "@/components/Movie_page";


const Player = () => {
  
  const playerRef = useRef(null);

  const userTier = parseInt(localStorage.getItem('userTier'));
  // const userTier = 2
  const [maxqual, setmaxQual] = useState(240);

  useEffect(() => {
    if(userTier == 3) {
      setmaxQual(720)
    }
    if(userTier == 2) {
      setmaxQual(480)
    }
    if(userTier == 1) {
      setmaxQual(360)
    }
  })

  const src = userTier == 0? {
    'src' : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    'type' : 'video/mp4'
  }: {
        'src': "https://vz-b4f1e97e-483.b-cdn.net/65c65840-de66-4c27-afd0-a3b5a904b768/playlist.m3u8", 
       'type': "application/x-mpegURL" ,
    }
 
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    resposive: true,
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },   
    fluid: true,
    playbackRates: [0.25,0.5,0.75,1.25,1.5,1.75,2],
    plugins: {
    },
    sources: [
      src
    ]
  }
    

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };


  return (
  <div style={styles.player}>
      <VideoJS max={maxqual}  options={videoJsOptions} onReady={handlePlayerReady} />
  </div>
  )
}

const MoviePage = (props) => {

  const [data, setData] = useState([]);
  const params = useParams()

  const movie_id = params.id;
  console.log("movie id :" , movie_id);

  let url = `${import.meta.env.VITE_BHOST}/movie/id/${movie_id}`;
  // if (movie_id) {
  //   url += `id/${props.id}`;
  // }
  // else {
  //   url += '1'
  // }
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log('Success fetching Single Movie Data:', data);
      })
      .catch(error => {
        console.error('Error fetching Single Movie Data:', error);
        Toast.error('Error Fetching Single Movie Data');
      });
  }, []);

  return (
  <div style={styles.container}>
    <Player />
    <MoviePage_ data={data} />
    <div style={{height : 10}} />
  </div>
  )
}

export default MoviePage;


const styles = Stylesheet.create({
  container: {
    display: 'flex',
    flexDirection:  'column'
  },
  player: {
    width: '75vw',
    minheight: 'calc(70*(1vw + 1vh)/4)',
    maxWidth: '90vw',
    margin: 'auto',
    marginTop: 10
  },
})
