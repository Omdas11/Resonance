import { useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  Home, Music2, Disc3, Mic2, Search, Clock, ListMusic, Plus,
} from 'lucide-react';
import type { Track } from '../types/music';

const NAV_ITEMS = [
  { id: 'home', label: 'For You', icon: Home },
  { id: 'search', label: 'Search', icon: Search },
];

const LIBRARY_ITEMS = [
  { id: 'library', label: 'Songs', icon: Music2 },
  { id: 'albums', label: 'Albums', icon: Disc3 },
  { id: 'artists', label: 'Artists', icon: Mic2 },
  { id: 'recently-added', label: 'Recently Added', icon: Clock },
  { id: 'playlists', label: 'Playlists', icon: ListMusic },
];

export default function Sidebar() {
  const { currentView, setCurrentView, addTracks } = usePlayer();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newTracks: Track[] = files.map((file, i) => {
      const src = URL.createObjectURL(file);
      const name = file.name.replace(/\.[^/.]+$/, '');
      return {
        id: `local-${Date.now()}-${i}`,
        title: name,
        artist: 'Unknown Artist',
        album: 'Unknown Album',
        duration: 0,
        src,
        genre: 'Unknown',
      };
    });

    addTracks(newTracks);
    e.target.value = '';
  };

  const navItem = (id: string, label: string, Icon: React.ElementType) => {
    const active = currentView === id;
    return (
      <button
        key={id}
        onClick={() => setCurrentView(id)}
        className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          active
            ? 'bg-white/10 text-white'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        <Icon
          size={16}
          className={active ? 'text-[#fc3c44]' : 'text-white/40'}
        />
        {label}
      </button>
    );
  };

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col h-full bg-[#1c1c1e] border-r border-white/5">
      {/* Logo */}
      <div className="px-4 pt-6 pb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#fc3c44] to-[#ff6b6b] flex items-center justify-center">
          <Music2 size={16} className="text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">Resonance</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 space-y-5 py-2">
        {/* Discover */}
        <div>
          <p className="px-3 pb-1 text-xs font-semibold text-white/30 uppercase tracking-widest">Discover</p>
          <div className="space-y-0.5">
            {NAV_ITEMS.map(({ id, label, icon }) => navItem(id, label, icon))}
          </div>
        </div>

        {/* Library */}
        <div>
          <p className="px-3 pb-1 text-xs font-semibold text-white/30 uppercase tracking-widest">Library</p>
          <div className="space-y-0.5">
            {LIBRARY_ITEMS.map(({ id, label, icon }) => navItem(id, label, icon))}
          </div>
        </div>
      </nav>

      {/* Import Button */}
      <div className="p-3 border-t border-white/5">
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3,.flac,.wav,.ogg,.m4a,.aac"
          multiple
          className="hidden"
          onChange={handleFileImport}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Plus size={16} className="text-white/40" />
          Add to Library
        </button>
      </div>
    </aside>
  );
}
