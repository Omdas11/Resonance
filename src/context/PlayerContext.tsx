import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import type { Track, RepeatMode } from '../types/music';
import { demoTracks } from './demoData';

interface PlayerContextType {
  // Library
  tracks: Track[];
  addTracks: (newTracks: Track[]) => void;

  // Playback state
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  queue: Track[];

  // Actions
  playTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  likedTracks: Set<string>;
  toggleLike: (id: string) => void;

  // Navigation
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedAlbumId: string | null;
  setSelectedAlbumId: (id: string | null) => void;
  selectedArtistId: string | null;
  setSelectedArtistId: (id: string | null) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [tracks, setTracks] = useState<Track[]>(demoTracks);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('resonance-volume');
    return saved ? parseFloat(saved) : 0.8;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>('off');
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());
  const [currentView, setCurrentView] = useState('home');
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const shuffledQueueRef = useRef<Track[]>([]);

  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => handleEnded();
    const onCanPlay = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const handleEnded = useCallback(() => {
    const audio = audioRef.current;
    if (repeat === 'one') {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      return;
    }

    const activeQueue = shuffle ? shuffledQueueRef.current : queue;
    const nextIndex = queueIndex + 1;

    if (nextIndex < activeQueue.length) {
      setQueueIndex(nextIndex);
      loadAndPlay(activeQueue[nextIndex]);
    } else if (repeat === 'all' && activeQueue.length > 0) {
      setQueueIndex(0);
      loadAndPlay(activeQueue[0]);
    } else {
      setIsPlaying(false);
    }
  }, [repeat, shuffle, queue, queueIndex]);

  // Re-attach ended handler when dependencies change
  useEffect(() => {
    const audio = audioRef.current;
    const onEnded = () => handleEnded();
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, [handleEnded]);

  const loadAndPlay = (track: Track) => {
    const audio = audioRef.current;
    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(track.duration || 0);

    if (track.src) {
      audio.src = track.src;
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      audio.src = '';
      // Demo track: simulate playing state without real audio
      setIsPlaying(true);
    }
  };

  const playTrack = (track: Track, newQueue?: Track[]) => {
    const q = newQueue || tracks;
    const idx = q.findIndex(t => t.id === track.id);
    setQueue(q);
    setQueueIndex(idx >= 0 ? idx : 0);

    if (shuffle) {
      const rest = q.filter(t => t.id !== track.id);
      shuffledQueueRef.current = [track, ...rest.sort(() => Math.random() - 0.5)];
    }

    loadAndPlay(track);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!currentTrack) return;

    if (currentTrack.src) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      // Demo track toggle
      setIsPlaying(prev => !prev);
    }
  };

  const nextTrack = () => {
    const activeQueue = shuffle ? shuffledQueueRef.current : queue;
    if (activeQueue.length === 0) return;
    const nextIndex = (queueIndex + 1) % activeQueue.length;
    setQueueIndex(nextIndex);
    loadAndPlay(activeQueue[nextIndex]);
  };

  const prevTrack = () => {
    const audio = audioRef.current;
    if (currentTrack?.src && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    const activeQueue = shuffle ? shuffledQueueRef.current : queue;
    if (activeQueue.length === 0) return;
    const prevIndex = (queueIndex - 1 + activeQueue.length) % activeQueue.length;
    setQueueIndex(prevIndex);
    loadAndPlay(activeQueue[prevIndex]);
  };

  const seek = (time: number) => {
    setCurrentTime(time);
    if (currentTrack?.src) {
      audioRef.current.currentTime = time;
    }
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    setIsMuted(v === 0);
    localStorage.setItem('resonance-volume', String(v));
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const toggleShuffle = () => {
    setShuffle(prev => {
      if (!prev && queue.length > 0 && currentTrack) {
        const rest = queue.filter(t => t.id !== currentTrack.id);
        shuffledQueueRef.current = [currentTrack, ...rest.sort(() => Math.random() - 0.5)];
      }
      return !prev;
    });
  };

  const toggleRepeat = () => {
    setRepeat(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const toggleLike = (id: string) => {
    setLikedTracks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addTracks = (newTracks: Track[]) => {
    setTracks(prev => {
      const existingIds = new Set(prev.map(t => t.id));
      const fresh = newTracks.filter(t => !existingIds.has(t.id));
      return [...prev, ...fresh];
    });
  };

  return (
    <PlayerContext.Provider value={{
      tracks, addTracks,
      currentTrack, isPlaying, currentTime, duration, volume, isMuted, shuffle, repeat, queue,
      playTrack, togglePlay, nextTrack, prevTrack, seek, setVolume, toggleMute, toggleShuffle, toggleRepeat,
      likedTracks, toggleLike,
      currentView, setCurrentView, selectedAlbumId, setSelectedAlbumId, selectedArtistId, setSelectedArtistId,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
