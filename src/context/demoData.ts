import type { Track, Album, Artist } from '../types/music';

// SVG gradient album art data URIs
const makeArt = (c1: string, c2: string, c3: string, label: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${c1}"/>
    <stop offset="50%" style="stop-color:${c2}"/>
    <stop offset="100%" style="stop-color:${c3}"/>
  </linearGradient></defs>
  <rect width="300" height="300" fill="url(#g)" rx="4"/>
  <text x="150" y="165" font-family="system-ui,sans-serif" font-size="80" text-anchor="middle" fill="rgba(255,255,255,0.25)">${label}</text>
</svg>`)}`;

const art = {
  midnightEchoes: makeArt('#1a1a2e', '#16213e', '#0f3460', '♫'),
  solarWaves:     makeArt('#ff6b35', '#f7c59f', '#efefd0', '☀'),
  neonCity:       makeArt('#7209b7', '#3a0ca3', '#4361ee', '⚡'),
  quietStorms:    makeArt('#2d6a4f', '#40916c', '#74c69d', '🌿'),
  crimsonTide:    makeArt('#9d0208', '#d62828', '#f77f00', '🔥'),
};

export const demoAlbums: Album[] = [
  {
    id: 'album-1',
    title: 'Midnight Echoes',
    artist: 'Luna Vex',
    albumArt: art.midnightEchoes,
    year: 2024,
    tracks: [
      { id: 't1', title: 'Into the Dark', artist: 'Luna Vex', album: 'Midnight Echoes', duration: 214, albumArt: art.midnightEchoes, genre: 'Indie', year: 2024, src: '' },
      { id: 't2', title: 'Fading Signal', artist: 'Luna Vex', album: 'Midnight Echoes', duration: 198, albumArt: art.midnightEchoes, genre: 'Indie', year: 2024, src: '' },
      { id: 't3', title: 'Hollow Ground', artist: 'Luna Vex', album: 'Midnight Echoes', duration: 243, albumArt: art.midnightEchoes, genre: 'Indie', year: 2024, src: '' },
      { id: 't4', title: 'Silver Thread', artist: 'Luna Vex', album: 'Midnight Echoes', duration: 187, albumArt: art.midnightEchoes, genre: 'Indie', year: 2024, src: '' },
    ],
  },
  {
    id: 'album-2',
    title: 'Solar Waves',
    artist: 'The Drift',
    albumArt: art.solarWaves,
    year: 2023,
    tracks: [
      { id: 't5', title: 'Coastline', artist: 'The Drift', album: 'Solar Waves', duration: 232, albumArt: art.solarWaves, genre: 'Electronic', year: 2023, src: '' },
      { id: 't6', title: 'Golden Hour', artist: 'The Drift', album: 'Solar Waves', duration: 275, albumArt: art.solarWaves, genre: 'Electronic', year: 2023, src: '' },
      { id: 't7', title: 'Undertow', artist: 'The Drift', album: 'Solar Waves', duration: 201, albumArt: art.solarWaves, genre: 'Electronic', year: 2023, src: '' },
    ],
  },
  {
    id: 'album-3',
    title: 'Neon City',
    artist: 'Parallax',
    albumArt: art.neonCity,
    year: 2024,
    tracks: [
      { id: 't8', title: 'Pulse', artist: 'Parallax', album: 'Neon City', duration: 189, albumArt: art.neonCity, genre: 'Synthwave', year: 2024, src: '' },
      { id: 't9', title: 'Overdrive', artist: 'Parallax', album: 'Neon City', duration: 224, albumArt: art.neonCity, genre: 'Synthwave', year: 2024, src: '' },
      { id: 't10', title: 'Ghost Protocol', artist: 'Parallax', album: 'Neon City', duration: 263, albumArt: art.neonCity, genre: 'Synthwave', year: 2024, src: '' },
    ],
  },
  {
    id: 'album-4',
    title: 'Quiet Storms',
    artist: 'Moss & Rain',
    albumArt: art.quietStorms,
    year: 2023,
    tracks: [
      { id: 't11', title: 'Petrichor', artist: 'Moss & Rain', album: 'Quiet Storms', duration: 317, albumArt: art.quietStorms, genre: 'Ambient', year: 2023, src: '' },
      { id: 't12', title: 'Root System', artist: 'Moss & Rain', album: 'Quiet Storms', duration: 285, albumArt: art.quietStorms, genre: 'Ambient', year: 2023, src: '' },
      { id: 't13', title: 'After Rain', artist: 'Moss & Rain', album: 'Quiet Storms', duration: 253, albumArt: art.quietStorms, genre: 'Ambient', year: 2023, src: '' },
    ],
  },
  {
    id: 'album-5',
    title: 'Crimson Tide',
    artist: 'Ember & Ash',
    albumArt: art.crimsonTide,
    year: 2022,
    tracks: [
      { id: 't14', title: 'Ignition', artist: 'Ember & Ash', album: 'Crimson Tide', duration: 198, albumArt: art.crimsonTide, genre: 'Rock', year: 2022, src: '' },
      { id: 't15', title: 'Wildfire', artist: 'Ember & Ash', album: 'Crimson Tide', duration: 221, albumArt: art.crimsonTide, genre: 'Rock', year: 2022, src: '' },
    ],
  },
];

export const demoTracks: Track[] = demoAlbums.flatMap(a => a.tracks);

export const demoArtists: Artist[] = [
  { id: 'artist-1', name: 'Luna Vex', image: art.midnightEchoes, albums: [demoAlbums[0]] },
  { id: 'artist-2', name: 'The Drift', image: art.solarWaves, albums: [demoAlbums[1]] },
  { id: 'artist-3', name: 'Parallax', image: art.neonCity, albums: [demoAlbums[2]] },
  { id: 'artist-4', name: 'Moss & Rain', image: art.quietStorms, albums: [demoAlbums[3]] },
  { id: 'artist-5', name: 'Ember & Ash', image: art.crimsonTide, albums: [demoAlbums[4]] },
];
