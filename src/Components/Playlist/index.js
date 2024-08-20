import React, { useState } from 'react';
import Tracklist from '../Tracklist';
import styles from './Playlist.module.css';

function Playlist({ tracks, onRemoveTrack, onSavePlaylist }) {
    const [playlistName, setPlaylistName] = useState('');

    const handleNameChange = (event) => {
        setPlaylistName(event.target.value);
    };

    const handleSavePlaylist = () => {
        if (!playlistName) {
            alert('Please provide a name for your playlist');
            return;
        }
        if (tracks.length === 0) {
            alert('Please add some tracks to your playlist before saving');
            return;
        }
    
        console.log('Attempting to save playlist...');
        console.log('Playlist Name:', playlistName);
        console.log('Tracks:', tracks);
    
        onSavePlaylist(); // Llama a la función sin pasar argumentos adicionales
    };

    return (
        <div className={styles.Playlist}>
            <label htmlFor='playlistName'><h2>Playlist Name: </h2></label>
            <input
                id='playlistName'
                type='text'
                value={playlistName}
                onChange={handleNameChange}
            />
            <Tracklist tracks={tracks} onRemoveTrack={onRemoveTrack} />
            <button onClick={handleSavePlaylist} className={styles.PlaylistSave}>SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;
