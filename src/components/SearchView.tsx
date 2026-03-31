import { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import TrackRow from './TrackRow';
import AlbumCard from './AlbumCard';
import { demoAlbums } from '../context/demoData';
import { Search as SearchIcon } from 'lucide-react';

const GENRES = ['Indie', 'Electronic', 'Synthwave', 'Ambient', 'Rock', 'Pop', 'Hip-Hop', 'Jazz', 'Classical'];

export default function SearchView() {
  const { tracks, currentTrack, isPlaying, playTrack, setCurrentView, setSelectedAlbumId } = usePlayer();
  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();

  const matchingTracks = q
    ? tracks.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.album.toLowerCase().includes(q)
      )
    : [];

  const matchingAlbums = q
    ? demoAlbums.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.artist.toLowerCase().includes(q)
      )
    : [];

  return (
    <div>
      {/* Search Input */}
      <div className="relative mb-6 sm:mb-8">
        <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Artists, songs, albums…"
          className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#fc3c44]/50 focus:bg-white/15 transition-all min-h-[44px]"
        />
      </div>

      {q ? (
        <div className="space-y-6 sm:space-y-8">
          {matchingTracks.length > 0 && (
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white mb-3">Songs</h2>
              <div className="space-y-0.5">
                {matchingTracks.map((track, i) => (
                  <TrackRow
                    key={track.id}
                    track={track}
                    index={i}
                    isCurrentTrack={currentTrack?.id === track.id}
                    isPlaying={isPlaying && currentTrack?.id === track.id}
                    onPlay={() => playTrack(track, matchingTracks)}
                  />
                ))}
              </div>
            </div>
          )}

          {matchingAlbums.length > 0 && (
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white mb-3">Albums</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-2">
                {matchingAlbums.map(album => (
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
          )}

          {matchingTracks.length === 0 && matchingAlbums.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 gap-2 text-white/20">
              <p className="text-lg">No results for "{query}"</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Browse by Genre</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {GENRES.map((genre, i) => {
              const colors = [
                'from-[#fc3c44] to-[#ff6b6b]',
                'from-[#7209b7] to-[#4361ee]',
                'from-[#2d6a4f] to-[#74c69d]',
                'from-[#ff6b35] to-[#f7c59f]',
                'from-[#9d0208] to-[#f77f00]',
                'from-[#0077b6] to-[#00b4d8]',
                'from-[#6d6875] to-[#c77dff]',
                'from-[#3a0ca3] to-[#4cc9f0]',
                'from-[#606c38] to-[#dda15e]',
              ];
              return (
                <button
                  key={genre}
                  onClick={() => setQuery(genre)}
                  className={`h-16 sm:h-20 rounded-xl bg-gradient-to-br ${colors[i % colors.length]} flex items-end p-3 active:opacity-80 hover:opacity-90 transition-opacity`}
                >
                  <span className="text-white font-bold text-sm">{genre}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
