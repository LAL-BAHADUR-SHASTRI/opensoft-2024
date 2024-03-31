import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import _ from 'videojs-contrib-quality-levels';
import 'videojs-max-quality-selector'

const SpeedControl = ({ onChange }) => {
  return (
    <select
      onChange={(e) => onChange(parseFloat(e.target.value))}
      defaultValue="1"
    >
      <option value="0.5">0.5x</option>
      <option value="0.75">0.75x</option>
      <option value="1">Normal</option>
      <option value="1.25">1.25x</option>
      <option value="1.5">1.5x</option>
      <option value="2">2x</option>
    </select>
  );
};

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady, max} = props;

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // let player = videojs('my-video')
  // console.log(player)

  // useEffect(() => {
  //   if (player) {
  //     consle.log(player.qualityLevels())
  //     player.hlsQualitySelector({ displayCurrentQuality: true });
  //   }
  // }, [player]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    console.log('hi')
    let qualityLevels = player.qualityLevels();
    videojs.log(qualityLevels)

    console.log(max)
    
    player.maxQualitySelector({
      'maxHeight': max,
      'minHeight': 360,
    });

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);


  return (
    <div data-vjs-player>
      <div id='my-video' ref={videoRef} />
      <div
        style={{
          marginTop: "20px",
        }}
      >
        {/* <SpeedControl onChange={(value) => setPlaybackRate(value)} /> */}
      </div>
    </div>
  );
}

export default VideoJS;
