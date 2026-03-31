import { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import TrackRow from './TrackRow';
import { Music2 } from 'lucide-react';

type SortField = 'title' | 'artist' | 'album' | 'duration';

export default function Library() {
  const { tracks, currentTrack, isPlaying, playTrack } = usePlayer();
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortAsc(p => !p);
    else { setSortField(field); setSortAsc(true); }
  };

  const sorted = [...tracks].sort((a, b) => {
    let va = a[sortField] ?? '';
    let vb = b[sortField] ?? '';
    if (typeof va === 'number' && typeof vb === 'number') {
      return sortAsc ? va - vb : vb - va;
    }
    va = String(va).toLowerCase();
    vb = String(vb).toLowerCase();
    return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const SortHeader = ({ field, label, className = '' }: { field: SortField; label: string; className?: string }) => (
    <button
      onClick={() => handleSort(field)}
      className={`text-left text-xs font-semibold text-white/30 uppercase tracking-widest hover:text-white/60 active:text-white/60 transition-colors ${className}`}
    >
      {label}{sortField === field ? (sortAsc ? ' ↑' : ' ↓') : ''}
    </button>
  );

  if (tracks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-white/20">
        <Music2 size={48} />
        <p className="text-lg">Your library is empty</p>
        <p className="text-sm">Import music using "Add to Library"</p>
      </div>
    );
  }

  return (
    <div className="px-0 sm:px-2">
      <h1 className="text-2xl sm:text-3xl font-bold text-white px-2 sm:px-4 mb-4 sm:mb-6">Songs</h1>

      {/* Header */}
      <div className="flex items-center gap-3 px-2 sm:px-4 pb-2 border-b border-white/5 mb-1">
        <div className="hidden sm:block w-8 text-xs text-white/30 text-center">#</div>
        <div className="w-9 flex-shrink-0" />
        <SortHeader field="title" label="Title" className="flex-1" />
        <SortHeader field="album" label="Album" className="hidden md:block w-40 flex-shrink-0" />
        <SortHeader field="duration" label="Time" className="w-12 text-right" />
      </div>

      <div className="space-y-0.5">
        {sorted.map((track, i) => (
          <TrackRow
            key={track.id}
            track={track}
            index={i}
            isCurrentTrack={currentTrack?.id === track.id}
            isPlaying={isPlaying && currentTrack?.id === track.id}
            onPlay={() => playTrack(track, sorted)}
          />
        ))}
      </div>
    </div>
  );
}
