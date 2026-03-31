import { usePlayer } from '../context/PlayerContext';
import AlbumCard from './AlbumCard';
import { demoAlbums } from '../context/demoData';
import { Disc3 } from 'lucide-react';

export default function AlbumView() {
  const { setCurrentView, setSelectedAlbumId, tracks } = usePlayer();

  // Derive albums from tracks (include imported ones) + demo albums
  const albumMap = new Map<string, { title: string; artist: string; albumArt?: string; year?: number; id: string }>();
  demoAlbums.forEach(a => albumMap.set(a.id, a));

  // Also collect albums from imported tracks
  tracks.forEach(t => {
    if (!Array.from(albumMap.values()).find(a => a.title === t.album && a.artist === t.artist)) {
      const id = `imported-album-${t.album}-${t.artist}`.replace(/\s+/g, '-');
      if (!albumMap.has(id)) {
        albumMap.set(id, { id, title: t.album, artist: t.artist, albumArt: t.albumArt, year: t.year });
      }
    }
  });

  const albums = Array.from(albumMap.values());

  if (albums.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-white/20">
        <Disc3 size={48} />
        <p className="text-lg">No albums yet</p>
      </div>
    );
  }

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold text-white mb-6">Albums</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {albums.map(album => (
          <AlbumCard
            key={album.id}
            album={{ ...album, tracks: [] }}
            onClick={() => {
              setSelectedAlbumId(album.id);
              setCurrentView('album-detail');
            }}
          />
        ))}
      </div>
    </div>
  );
}
