import { usePlayer } from '../context/PlayerContext';
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1,
  Volume2, VolumeX, Heart, Airplay, ListMusic,
} from 'lucide-react';

function formatTime(sec: number) {
  if (!isFinite(sec) || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function NowPlayingBar() {
  const {
    currentTrack, isPlaying, currentTime, duration,
    volume, isMuted, shuffle, repeat,
    togglePlay, nextTrack, prevTrack, seek, setVolume, toggleMute,
    toggleShuffle, toggleRepeat,
    likedTracks, toggleLike,
    setCurrentView,
  } = usePlayer();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentTrack) {
    return (
      <div className="h-[90px] bg-[#1c1c1e]/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-center">
        <p className="text-white/20 text-sm">Nothing playing</p>
      </div>
    );
  }

  return (
    <div className="h-[90px] bg-[#1c1c1e]/80 backdrop-blur-xl border-t border-white/5 relative">
      {/* Seek bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          seek(pct * (duration || currentTrack.duration));
        }}
      >
        <div
          className="h-full bg-[#fc3c44] transition-none relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2" />
        </div>
      </div>

      <div className="flex items-center h-full px-4 gap-4">
        {/* Left: Track Info */}
        <div className="flex items-center gap-3 w-[280px] min-w-0">
          <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-[#3a3a3c]">
            {currentTrack.albumArt
              ? <img src={currentTrack.albumArt} alt="" className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-gradient-to-br from-[#fc3c44] to-[#3a0ca3]" />
            }
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-white/50 text-xs truncate">{currentTrack.artist}</p>
          </div>
          <button
            onClick={() => toggleLike(currentTrack.id)}
            className="flex-shrink-0 ml-1 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <Heart
              size={15}
              className={likedTracks.has(currentTrack.id) ? 'fill-[#fc3c44] text-[#fc3c44]' : 'text-white/40'}
            />
          </button>
        </div>

        {/* Center: Controls */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleShuffle}
              className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${shuffle ? 'text-[#fc3c44]' : 'text-white/40 hover:text-white'}`}
            >
              <Shuffle size={15} />
            </button>
            <button onClick={prevTrack} className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying
                ? <Pause size={16} className="text-black fill-black" />
                : <Play size={16} className="text-black fill-black ml-0.5" />
              }
            </button>
            <button onClick={nextTrack} className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <SkipForward size={20} />
            </button>
            <button
              onClick={toggleRepeat}
              className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${repeat !== 'off' ? 'text-[#fc3c44]' : 'text-white/40 hover:text-white'}`}
            >
              {repeat === 'one' ? <Repeat1 size={15} /> : <Repeat size={15} />}
            </button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-white/40 text-[10px] w-8 text-right">{formatTime(currentTime)}</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer relative group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                seek(pct * (duration || currentTrack.duration));
              }}
            >
              <div
                className="h-full bg-white/70 rounded-full transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white/40 text-[10px] w-8">{formatTime(duration || currentTrack.duration)}</span>
          </div>
        </div>

        {/* Right: Volume + extras */}
        <div className="w-[280px] flex items-center justify-end gap-3">
          <button
            onClick={() => setCurrentView('library')}
            className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ListMusic size={15} />
          </button>
          <button className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors">
            <Airplay size={15} />
          </button>
          <button onClick={toggleMute} className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors">
            {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 accent-[#fc3c44] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
