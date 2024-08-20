import React, { useState } from 'react';
import SearchBar from '../SearchBar'; 
import SearchResults from '../SearchResults'; 
import Playlist from '../Playlist'; 
// import Tracklist from '../Tracklist'; 
// import Track from '../Track';
import styles from './App.module.css';
import Spotify from '../../util/Spotify/Spotify';


const mockTracks = [
  { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1', uri: 'uri' },
  { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2', uri: 'uri' },
  { id: 3, name: 'Song 3', artist: 'Artist 3', album: 'Album 3', uri: 'uri' }
];

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState('');
  const [playlistName, setPlaylistName] = useState('');

  const handleAddTrack = (track) => {
    setPlaylistTracks((prev) => {
      // Verifica si la pista ya está en la playlist
      if (prev.some(savedTrack => savedTrack.id === track.id)) {
        alert('Track already on Playlist');
        return prev; // Retorna el array sin cambios si la pista ya está
      }
      // Agrega la pista al principio del array si no está ya en la playlist
     
      return [track, ...prev];
    });
  };

  const handleRemoveTrack = (trackId) => {
    setPlaylistTracks((prev) => {
      return prev.filter((track) => track.id !== trackId);
    });
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    
    playlistName(playlistName, trackURIs).then(() => {
      setPlaylistName({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
    alert('Playlist saved to Spotify');
    setPlaylistTracks([]);
  };

  const handleSearch = (searchTerm) => {
    Spotify.search(searchTerm).then(result => {
      setSearchResults(result);
    })
    
  };

  return (
    <div className={styles.App}>
      <div  className={styles.container}>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      </div>
    <div >
      <SearchBar onSearch={handleSearch} />    
      <div className={styles.AppPlaylist}>        
        <SearchResults onAddTrack={handleAddTrack} tracks={searchResults} />
        <Playlist onSavePlaylist={Spotify.savePlaylist} tracks={playlistTracks} onRemoveTrack={handleRemoveTrack} />
      </div>
    </div>
  </div>
    );
  }

export default App;

