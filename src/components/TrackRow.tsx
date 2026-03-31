import type { Track } from '../types/music';
import { Play, Pause } from 'lucide-react';

interface Props {
  track: Track;
  index: number;
  isPlaying: boolean;
  isCurrentTrack: boolean;
  onPlay: () => void;
  showAlbum?: boolean;
}

function formatTime(sec: number) {
  if (!isFinite(sec) || isNaN(sec) || sec === 0) return '--:--';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function TrackRow({ track, index, isPlaying, isCurrentTrack, onPlay, showAlbum = true }: Props) {
  return (
    <div
      onDoubleClick={onPlay}
      onClick={onPlay}
      className={`group flex items-center gap-3 px-4 py-2 rounded-lg cursor-default transition-colors active:bg-white/10 hover:bg-white/5 ${
        isCurrentTrack ? 'bg-white/[0.07]' : ''
      }`}
    >
      {/* Index / play indicator - hidden on mobile */}
      <div className="hidden sm:flex w-8 flex-shrink-0 items-center justify-center">
        <span className={`text-sm group-hover:hidden ${isCurrentTrack ? 'text-[#fc3c44]' : 'text-white/40'}`}>
          {isCurrentTrack && isPlaying ? '♪' : index + 1}
        </span>
        <button onClick={(e) => { e.stopPropagation(); onPlay(); }} className="hidden group-hover:flex items-center justify-center w-6 h-6">
          {isCurrentTrack && isPlaying
            ? <Pause size={14} className="text-white fill-white" />
            : <Play size={14} className="text-white fill-white ml-0.5" />
          }
        </button>
      </div>

      {/* Album art */}
      <div className="w-9 h-9 rounded flex-shrink-0 overflow-hidden bg-[#3a3a3c] relative">
        {track.albumArt
          ? <img src={track.albumArt} alt="" className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-gradient-to-br from-[#fc3c44] to-[#3a0ca3]" />
        }
        {/* Mobile play overlay */}
        {isCurrentTrack && (
          <div className="sm:hidden absolute inset-0 bg-black/40 flex items-center justify-center">
            {isPlaying
              ? <Pause size={12} className="text-white fill-white" />
              : <Play size={12} className="text-white fill-white" />
            }
          </div>
        )}
      </div>

      {/* Title + Artist */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isCurrentTrack ? 'text-[#fc3c44]' : 'text-white'}`}>
          {track.title}
        </p>
        <p className="text-xs text-white/50 truncate">{track.artist}</p>
      </div>

      {/* Album - hidden on mobile */}
      {showAlbum && (
        <p className="hidden md:block text-sm text-white/40 truncate w-40 flex-shrink-0">{track.album}</p>
      )}

      {/* Duration */}
      <p className="text-sm text-white/40 flex-shrink-0 w-12 text-right">{formatTime(track.duration)}</p>
    </div>
  );
}
