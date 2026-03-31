import { Home, Search, Music2, Disc3, Mic2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const TABS = [
  { id: 'home', label: 'For You', icon: Home },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'library', label: 'Songs', icon: Music2 },
  { id: 'albums', label: 'Albums', icon: Disc3 },
  { id: 'artists', label: 'Artists', icon: Mic2 },
];

export default function BottomTabBar() {
  const { currentView, setCurrentView } = usePlayer();

  return (
    <div
      className="flex bg-[#1c1c1e]/95 backdrop-blur-xl border-t border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {TABS.map(({ id, label, icon: Icon }) => {
        const active = currentView === id || (currentView === 'recently-added' && id === 'library');
        return (
          <button
            key={id}
            onClick={() => setCurrentView(id)}
            className={`flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] gap-0.5 transition-colors active:opacity-70 ${
              active ? 'text-[#fc3c44]' : 'text-white/40'
            }`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
