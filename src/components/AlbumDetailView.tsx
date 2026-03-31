import { usePlayer } from '../context/PlayerContext';
import { demoAlbums } from '../context/demoData';
import TrackRow from './TrackRow';
import { Play, Shuffle, ChevronLeft } from 'lucide-react';

export default function AlbumDetailView() {
  const { selectedAlbumId, setCurrentView, currentTrack, isPlaying, playTrack, toggleShuffle } = usePlayer();

  const album = demoAlbums.find(a => a.id === selectedAlbumId);

  if (!album) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-white/20">
        <p>Album not found</p>
        <button onClick={() => setCurrentView('albums')} className="text-[#fc3c44] text-sm">Back</button>
      </div>
    );
  }

  const totalDuration = album.tracks.reduce((s, t) => s + t.duration, 0);
  const formatTotal = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return h > 0 ? `${h} hr ${m} min` : `${m} min`;
  };

  return (
    <div>
      {/* Back */}
      <button
        onClick={() => setCurrentView('albums')}
        className="flex items-center gap-1 text-[#fc3c44] text-sm mb-4 active:opacity-70 hover:opacity-80 transition-opacity min-h-[44px]"
      >
        <ChevronLeft size={16} /> Albums
      </button>

      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 items-center sm:items-end">
        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl overflow-hidden flex-shrink-0 shadow-2xl">
          {album.albumArt
            ? <img src={album.albumArt} alt={album.title} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-gradient-to-br from-[#fc3c44] to-[#3a0ca3]" />
          }
        </div>
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <p className="text-white/50 text-xs uppercase tracking-widest">Album</p>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">{album.title}</h1>
          <p className="text-white/70">{album.artist}</p>
          <p className="text-white/40 text-sm">
            {album.year && `${album.year} • `}{album.tracks.length} songs • {formatTotal(totalDuration)}
          </p>
          <div className="flex gap-3 mt-2 justify-center sm:justify-start">
            <button
              onClick={() => album.tracks[0] && playTrack(album.tracks[0], album.tracks)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#fc3c44] active:bg-[#e0333b] hover:bg-[#e0333b] text-white rounded-full text-sm font-semibold transition-colors min-h-[44px]"
            >
              <Play size={14} className="fill-white" /> Play
            </button>
            <button
              onClick={() => {
                toggleShuffle();
                if (album.tracks[0]) playTrack(album.tracks[0], album.tracks);
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-white/10 active:bg-white/20 hover:bg-white/20 text-white rounded-full text-sm font-semibold transition-colors min-h-[44px]"
            >
              <Shuffle size={14} /> Shuffle
            </button>
          </div>
        </div>
      </div>

      {/* Track list */}
      <div className="space-y-0.5">
        {album.tracks.map((track, i) => (
          <TrackRow
            key={track.id}
            track={track}
            index={i}
            isCurrentTrack={currentTrack?.id === track.id}
            isPlaying={isPlaying && currentTrack?.id === track.id}
            onPlay={() => playTrack(track, album.tracks)}
            showAlbum={false}
          />
        ))}
      </div>
    </div>
  );
}
