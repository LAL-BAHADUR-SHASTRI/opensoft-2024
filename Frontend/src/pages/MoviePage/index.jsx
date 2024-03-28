import Stylesheet from "reactjs-stylesheet";
import VideoJS from "@/components/videojs";
import { useRef } from "react";
import videojs from "video.js";

const Player = () => {
  
  const playerRef = useRef(null);
 
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    resposive: true,
    fluid: true,
    sources: [
      {
        src: "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8", 
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
  player: {
    width: '90vw',
    minheight: 'calc(70*(1vw + 1vh)/3)',
    margin: 'auto'
  },
  container: {
    flex: 1,
  }
})
