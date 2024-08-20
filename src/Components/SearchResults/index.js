import React from 'react';
import styles from './SearchResults.module.css';

function SearchResults({ tracks, onAddTrack }) {
    return (
        <div className={styles.SearchResults}>
            <h2>Results</h2>
            {Array.isArray(tracks) && tracks.length > 0 ? (
                <ul>
                    {tracks.map(track => (
                        <li key={track.id}>
                            <img 
                                src={track.albumArt || 'fallback-image-url'} 
                                alt={`${track.album} album art`} 
                                className={styles.albumArt}
                            />
                            <h3>{track.name} by {track.artist} ({track.album})</h3>
                            <button 
                                className={styles.AddButton} 
                                onClick={() => onAddTrack(track)} 
                                aria-label={`Add ${track.name} by ${track.artist} to playlist`}
                            > 
                                + 
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default SearchResults;
