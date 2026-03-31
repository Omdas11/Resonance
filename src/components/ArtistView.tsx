import { usePlayer } from '../context/PlayerContext';
import { demoArtists } from '../context/demoData';
import { Mic2 } from 'lucide-react';

export default function ArtistView() {
  const { setCurrentView, setSelectedArtistId } = usePlayer();

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Artists</h1>

      {demoArtists.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3 text-white/20">
          <Mic2 size={48} />
          <p className="text-lg">No artists yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {demoArtists.map(artist => (
            <button
              key={artist.id}
              onClick={() => {
                setSelectedArtistId(artist.id);
                setCurrentView('artist-detail');
              }}
              className="group flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl active:bg-white/10 hover:bg-white/5 transition-colors"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-[#3a3a3c] relative">
                {artist.image
                  ? <img src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  : <div className="w-full h-full bg-gradient-to-br from-[#fc3c44] to-[#3a0ca3] flex items-center justify-center">
                      <Mic2 size={32} className="text-white/40" />
                    </div>
                }
              </div>
              <div className="text-center">
                <p className="text-white text-xs sm:text-sm font-semibold">{artist.name}</p>
                <p className="text-white/40 text-[11px] sm:text-xs">{artist.albums.length} album{artist.albums.length !== 1 ? 's' : ''}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
