import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const passTerm = () => {
        if (searchTerm) {
            onSearch(searchTerm);
            setSearchTerm(''); // Limpia el campo de búsqueda después de buscar
        } else {
            alert('Please enter a search term');
        }
    };

    return (
        <div className={styles.SearchBar}>
            <input
                onChange={handleSearch}
                id='searchBar'
                type='text'
                placeholder='Enter A Song, Artist or Album'
                value={searchTerm} // Asegura que el input esté controlado
            />
            <button
                onClick={passTerm}
                className={styles.SearchButton}
                aria-label='Search a Song or Artist'
            >
                SEARCH
            </button>
        </div>
    );
}

export default SearchBar;
