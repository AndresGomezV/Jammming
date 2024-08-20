import React from 'react';
import Track from '../Track';
import styles from './Tracklist.module.css';

function Tracklist({ tracks = [], onRemoveTrack }) {
    return (
        <div className={styles.Tracklist}>
            <ul>
                {tracks.map((track) => (
                    track && (
                        <Track
                            key={track.id}
                            track={track}
                            onRemove={() => onRemoveTrack(track.id)}
                        />
                    )
                ))}
            </ul>
        </div>
    );
}

export default Tracklist;