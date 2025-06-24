import React from 'react'

const SongCard = ({ song }) => {
  const {
    name,
    artists,
    album,
    external_urls,
    duration_ms,
  } = song;

  const artistNames = artists.map((a) => a.name).join(', ');
  const albumImage = album?.images[0]?.url;
  const albumName = album?.name;
  const spotifyUrl = external_urls?.spotify;

  // Convert duration from ms to mm:ss
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="song-card">
      <img
        src={albumImage || '/no-album.png'}
        alt={name}
        className="w-20 h-20 rounded object-cover"
      />

      <div className="flex-1">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600 text-sm">{artistNames}</p>
        <p className="text-gray-400 text-xs">{albumName}</p>
        <p className="text-xs mt-1 text-gray-500">⏱ {formatDuration(duration_ms)}</p>
        {spotifyUrl && (
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm underline mt-1 inline-block"
          >
            Listen on Spotify
          </a>
        )}
      </div>
    </div>
  )
}

export default SongCard
