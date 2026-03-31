export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  albumArt?: string;
  src?: string;
  genre?: string;
  year?: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  albumArt?: string;
  year?: number;
  tracks: Track[];
}

export interface Artist {
  id: string;
  name: string;
  image?: string;
  albums: Album[];
}

export type ViewType = 'home' | 'library' | 'albums' | 'artists' | 'search' | 'album-detail' | 'artist-detail';

export type RepeatMode = 'off' | 'all' | 'one';
