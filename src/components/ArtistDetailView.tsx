import { usePlayer } from '../context/PlayerContext';
import { demoArtists } from '../context/demoData';
import TrackRow from './TrackRow';
import AlbumCard from './AlbumCard';
import { ChevronLeft, Mic2 } from 'lucide-react';

export default function ArtistDetailView() {
  const { selectedArtistId, setCurrentView, setSelectedAlbumId, currentTrack, isPlaying, playTrack } = usePlayer();

  const artist = demoArtists.find(a => a.id === selectedArtistId);
  if (!artist) return null;

  const allTracks = artist.albums.flatMap(a => a.tracks);

  return (
    <div>
      <button
        onClick={() => setCurrentView('artists')}
        className="flex items-center gap-1 text-[#fc3c44] text-sm mb-4 active:opacity-70 hover:opacity-80 transition-opacity min-h-[44px]"
      >
        <ChevronLeft size={16} /> Artists
      </button>

      {/* Artist hero */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 items-center sm:items-end">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden flex-shrink-0 shadow-2xl bg-[#3a3a3c]">
          {artist.image
            ? <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-gradient-to-br from-[#fc3c44] to-[#3a0ca3] flex items-center justify-center">
                <Mic2 size={48} className="text-white/40" />
              </div>
          }
        </div>
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <p className="text-white/50 text-xs uppercase tracking-widest">Artist</p>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">{artist.name}</h1>
          <p className="text-white/40 text-sm">{artist.albums.length} albums • {allTracks.length} songs</p>
        </div>
      </div>

      {/* Albums */}
      <h2 className="text-lg sm:text-xl font-bold text-white mb-3">Albums</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2 mb-6 sm:mb-8">
        {artist.albums.map(album => (
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

      {/* Top songs */}
      <h2 className="text-lg sm:text-xl font-bold text-white mb-3">Songs</h2>
      <div className="space-y-0.5">
        {allTracks.map((track, i) => (
          <TrackRow
            key={track.id}
            track={track}
            index={i}
            isCurrentTrack={currentTrack?.id === track.id}
            isPlaying={isPlaying && currentTrack?.id === track.id}
            onPlay={() => playTrack(track, allTracks)}
          />
        ))}
      </div>
    </div>
  );
}
