import React, {useState} from 'react';
import Sound from 'react-sound';
import JingleBells from './jingle_bells_instrumental.mp3';
import { GoMute, GoUnmute } from 'react-icons/go';

const SoundControl = () => {
  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => setPlaying(!playing);

  return (
    <>
      <button onClick={() => togglePlaying()}
        style={{position: 'absolute', top: 0, right: 0, border: 'none', padding: '0'}}  
      >
        {playing ? <GoUnmute/> : <GoMute /> }
      </button>
      <Sound 
        url={JingleBells}
        playStatus={(playing) ? Sound.status.PLAYING : Sound.status.STOPPED}
        playFromPosition={0}
        volume={7}
        loop={true}
      />
    </>
  );
};

export default SoundControl;