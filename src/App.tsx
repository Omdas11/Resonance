import { PlayerProvider } from './context/PlayerContext';
import Sidebar from './components/Sidebar';
import NowPlayingBar from './components/NowPlayingBar';
import BottomTabBar from './components/BottomTabBar';
import Library from './components/Library';
import AlbumView from './components/AlbumView';
import AlbumDetailView from './components/AlbumDetailView';
import ArtistView from './components/ArtistView';
import ArtistDetailView from './components/ArtistDetailView';
import SearchView from './components/SearchView';
import ForYouView from './components/ForYouView';
import { usePlayer } from './context/PlayerContext';

function MainContent() {
  const { currentView } = usePlayer();

  const renderView = () => {
    switch (currentView) {
      case 'home':
      case 'recently-added':
        return <ForYouView />;
      case 'library':
      case 'playlists':
        return <Library />;
      case 'albums':
        return <AlbumView />;
      case 'album-detail':
        return <AlbumDetailView />;
      case 'artists':
        return <ArtistView />;
      case 'artist-detail':
        return <ArtistDetailView />;
      case 'search':
        return <SearchView />;
      default:
        return <ForYouView />;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto min-h-0 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 py-6 pb-28 md:pb-6">
        {renderView()}
      </div>
    </main>
  );
}

function AppLayout() {
  return (
    <div
      className="flex h-screen bg-[#111111] overflow-hidden"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Sidebar: desktop only */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0 min-h-0">
        <MainContent />
        {/* Player bar: different on mobile vs desktop */}
        <NowPlayingBar />
        {/* Bottom tab bar: mobile only */}
        <div className="md:hidden">
          <BottomTabBar />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <AppLayout />
    </PlayerProvider>
  );
}
