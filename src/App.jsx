import { useEffect, useState } from 'react';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import SongCard from './components/SongCard.jsx'; // Create or rename from MovieCard
import { useDebounce } from 'react-use';
import { getAccessToken, searchTracks } from './utils/spotify.js';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [songList, setSongList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const token = await getAccessToken();
        const results = await searchTracks(debouncedSearchTerm, token);
        setSongList(results);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setErrorMessage('Something went wrong fetching songs.');
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedSearchTerm) {
      fetchTracks();
    }
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="wrapper">
        <header>
          <h1>🎵 Search <span className="text-gradient">Spotify</span> Songs</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-songs">
          <h2>Results</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {songList.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
