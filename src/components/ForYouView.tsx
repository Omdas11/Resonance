import { usePlayer } from '../context/PlayerContext';
import AlbumCard from './AlbumCard';
import TrackRow from './TrackRow';
import { demoAlbums } from '../context/demoData';
import { Play } from 'lucide-react';

export default function ForYouView() {
  const { tracks, currentTrack, isPlaying, playTrack, setCurrentView, setSelectedAlbumId } = usePlayer();

  const featured = demoAlbums[0];
  const recentAlbums = demoAlbums.slice(0, 6);
  const recentTracks = tracks.slice(0, 5);

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Good evening</h1>
          <p className="text-white/40 text-sm">Here's what we think you'll love</p>
        </div>
        <a
          href="/Resonance.apk"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#fc3c44] text-white text-sm font-semibold shadow-md active:bg-[#e0333b] hover:bg-[#e0333b] transition-colors min-h-[44px]"
        >
          Download APK
        </a>
      </div>

      {/* Featured */}
      <div
        className="relative h-48 sm:h-56 rounded-2xl overflow-hidden cursor-pointer group active:opacity-90"
        onClick={() => {
          setSelectedAlbumId(featured.id);
          setCurrentView('album-detail');
        }}
      >
        {featured.albumArt && (
          <img
            src={featured.albumArt}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 sm:p-6">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Featured Album</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{featured.title}</h2>
          <p className="text-white/70 text-sm">{featured.artist}</p>
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            if (featured.tracks[0]) playTrack(featured.tracks[0], featured.tracks);
          }}
          className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 w-12 h-12 bg-[#fc3c44] active:bg-[#e0333b] hover:bg-[#e0333b] rounded-full flex items-center justify-center shadow-lg transition-colors"
        >
          <Play size={20} className="text-white fill-white ml-0.5" />
        </button>
      </div>

      {/* Recently Added */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">Recently Added</h2>
          <button
            onClick={() => setCurrentView('albums')}
            className="text-[#fc3c44] text-sm active:opacity-70 hover:opacity-80 transition-opacity"
          >
            See All
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1 sm:gap-2">
          {recentAlbums.map(album => (
            <AlbumCard
              key={album.id}
              album={album}
              onClick={() => {
                setSelectedAlbumId(album.id);
                setCurrentView('album-detail');
              }}
            />
          ))}
        </div>
      </div>

      {/* Top Picks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white">Top Picks</h2>
          <button
            onClick={() => setCurrentView('library')}
            className="text-[#fc3c44] text-sm active:opacity-70 hover:opacity-80 transition-opacity"
          >
            See All
          </button>
        </div>
        <div className="space-y-0.5">
          {recentTracks.map((track, i) => (
            <TrackRow
              key={track.id}
              track={track}
              index={i}
              isCurrentTrack={currentTrack?.id === track.id}
              isPlaying={isPlaying && currentTrack?.id === track.id}
              onPlay={() => playTrack(track, recentTracks)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
