import Stylesheet from "reactjs-stylesheet";
import VideoJS from "@/components/videojs";
import { useRef } from "react";
import videojs from "video.js";
import Nav from "@/components/Navbar";


const Player = () => {
  
  const playerRef = useRef(null);
 
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
      {
        src: "https://vz-b4f1e97e-483.b-cdn.net/65c65840-de66-4c27-afd0-a3b5a904b768/playlist.m3u8", 
       type: "application/x-mpegURL" ,
      },
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
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
  </div>
  )
}

const MoviePage = () => {
  return (
  <div style={styles.container}>
    <Player />
    <div style={{height : 10}} />
  </div>
  )
}

export default MoviePage;


const styles = Stylesheet.create({
  container: {
    flex: 1,
  },
  player: {
    width: '75vw',
    minheight: 'calc(70*(1vw + 1vh)/4)',
    maxWidth: '90vw',
    margin: 'auto',
    marginTop: 10
  },
})
