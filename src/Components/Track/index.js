import React from 'react';
import styles from './Track.module.css';

function Track({ track, onRemove }) {
    // Verifica que track esté definido antes de acceder a sus propiedades
    if (!track) {
        return null; // O muestra un mensaje de error, o un placeholder
    }

    return (
        <div className={styles.Track}>
            <div className={styles.TrackInformation}>
                <li>
                    {track.name} by {track.artist} ({track.album})
                    <button className={styles.TrackAction}  onClick={onRemove}> - </button>
                </li>
            </div>
        </div>
    );
}

export default Track;