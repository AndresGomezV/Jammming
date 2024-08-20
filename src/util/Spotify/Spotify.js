let accessToken = '';

const clientID = 'd3dc90616b574eb3854469f9789dd3f5';

const redirectURI= 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
       const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
       if (urlAccessToken && urlExpiresIn) {
        accessToken = urlAccessToken[1]; //Set the Access Token:
        const expiresIn = Number(urlExpiresIn[1]); //Set the Expiration Time
        window.setTimeout(() => (accessToken = ''), expiresIn *10000); //Set the Access Token to Expire
        window.history.pushState('Access Token', null, '/'); //Clear the Parameters from the URL
        return accessToken;
       } else {
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = redirect;
       }
    },    
       search(searchTerm) {
            accessToken = Spotify.getAccessToken();
            return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }            
            })
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return []; // Devuelve un array vacío si no hay pistas
                }
                 // Mapea la respuesta JSON a un array de objetos con las propiedades requeridas
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    albumArt: track.album.images[0]?.url
                }));
            })
       },
    
savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !Array.isArray(trackURIs) || trackURIs.length === 0) {
        // Verifica si los argumentos están vacíos o inválidos.
        return;
    }

    const accessToken = Spotify.getAccessToken(); // Obtiene el token de acceso del usuario.
    const headers = { Authorization: `Bearer ${accessToken}` }; // Configura los encabezados de la solicitud.
    let userId = '';

    // Paso 1: Obtén el ID del usuario
    const userEndpoint = 'https://api.spotify.com/v1/me';

    return fetch(userEndpoint, { headers: headers })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed to get user ID');
        })
        .then(jsonResponse => {
            userId = jsonResponse.id; // Asigna el ID del usuario.
            
            // Paso 2: Crea una nueva lista de reproducción para el usuario
            const playlistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;

            return fetch(playlistEndpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: playlistName,
                    public: true // Puedes ajustar esta opción según tus necesidades.
                })
            });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed to create playlist');
        })
        .then(jsonResponse => {
            const playlistId = jsonResponse.id; // Obtén el ID de la lista de reproducción creada.

            // Paso 3: Agrega las pistas a la lista de reproducción
            const tracksEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

            return fetch(tracksEndpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    uris: trackURIs
                })
            });
        })
        .then(response => {
            if (response.ok) {
                console.log('Playlist saved successfully');
            } else {
                throw new Error('Request failed to add tracks to playlist');
            }
        })
        .catch(error => {
            console.error(error);
        });
}


};

export default Spotify;


