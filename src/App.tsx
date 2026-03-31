import { PlayerProvider } from './context/PlayerContext';
import Sidebar from './components/Sidebar';
import NowPlayingBar from './components/NowPlayingBar';
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
    <main className="flex-1 overflow-y-auto min-h-0">
      <div className="max-w-6xl mx-auto py-8 pb-4">
        {renderView()}
      </div>
    </main>
  );
}

function AppLayout() {
  return (
    <div className="flex h-screen bg-[#111111] overflow-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <MainContent />
        <NowPlayingBar />
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
