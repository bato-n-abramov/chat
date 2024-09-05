import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Button from '../Button/Button';
import Download from '../Icons/Download';
import Play from '../Icons/Play';
import Pause from '../Icons/Pause';
import screenfull from 'screenfull';
import VolumeOff from '../Icons/VolumeOff';
import Volume from '../Icons/Volume';
import Fullscreen from '../Icons/Fullscreen';

import './styles.scss';

const Video = ({ href }) => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [seeking, setSeeking] = useState(false);
  const playerRef = React.useRef(null); 

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e) => {
    setVolume(prevVolume => (prevVolume === 0 ? 0.5 : 0));
  };

  const handleClickFullscreen = () => {
    screenfull.request(document.querySelector('.react-player'));
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value)); 
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    const seekTo = parseFloat(e.target.value);
    playerRef.current.seekTo(seekTo); 
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played); 
    }
  };

  return (
    <div className='video'>
      <ReactPlayer
        ref={playerRef} 
        url={href}
        playing={playing}
        className='react-player'
        controls
        volume={volume}
        onProgress={handleProgress}
      />
      <div className="player-controls">
        <div className='player-buttons'>
            <Button
            className="player-button btn-secondary play-pause"
            onClick={handlePlayPause}
            
            >
            {playing ? <Pause /> : <Play />}
            </Button>
            <input
            type='range'
            min={0}
            max={1}
            className='player-seek'
            step='any'
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp} 
            style={{
                background: `linear-gradient(to right, #FAFAFA ${played * 100}%, #404040B2 0%)`
            }}
            />
            <div className='button-wrapper'>
                <Button
                className="player-button volume"
                onClick={handleVolumeChange}
                >
                    {volume === 0 ? <VolumeOff /> : <Volume />}
                {/* <input
                    type='range'
                    min={0}
                    max={1}
                    step='any'
                    value={volume}
                    onChange={handleVolumeChange}
                /> */}
                </Button>
                <Button
                className="player-button  fullscreen"
                onClick={handleClickFullscreen}
                >
                <Fullscreen />
                </Button>
            </div>
        </div>
        <a href={href} download className='btn btn-secondary video-download'><Download /></a>
      </div>
    </div>
  );
};

export default Video;
