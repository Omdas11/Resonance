import type { Album } from '../types/music';

interface Props {
  album: Album;
  onClick: () => void;
}

export default function AlbumCard({ album, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col gap-2 text-left active:opacity-70 hover:bg-white/5 rounded-xl p-2 sm:p-3 transition-colors"
    >
      <div className="aspect-square w-full rounded-lg overflow-hidden bg-[#3a3a3c] relative">
        {album.albumArt
          ? <img src={album.albumArt} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          : <div className="w-full h-full bg-gradient-to-br from-[#fc3c44] to-[#3a0ca3]" />
        }
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>
      <div className="min-w-0">
        <p className="text-white text-xs sm:text-sm font-semibold truncate">{album.title}</p>
        <p className="text-white/50 text-[11px] sm:text-xs truncate">{album.artist}</p>
        {album.year && <p className="text-white/30 text-[10px] sm:text-xs">{album.year}</p>}
      </div>
    </button>
  );
}
