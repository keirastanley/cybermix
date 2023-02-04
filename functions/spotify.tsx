import SpotifyWebApi from "spotify-web-api-js";

export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "https://cybermix.vercel.app/callback"
//const redirectUri = "http://localhost:3000/callback"

const clientId = "593d7fe3d674485392669714b0241c96"

export const spotify = new SpotifyWebApi();

const scopes = [
    "user-read-private", 
    "user-read-email", 
    "user-top-read", 
    "playlist-modify-public", 
    "playlist-modify-private"
]

export const loginUrl = `${authEndpoint}?
client_id=${clientId}
&redirect_uri=${redirectUri}
&scope=${scopes.join("%20")}
&response_type=token
&show_dialog=true`

export const getTokenFromUrl = () =>{
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial : any, item) =>{
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1])
            return initial
        }, {});
}

/** This function makes a GET request to Spotify's API that requests the playlist associated with the id provided by the user
 * @param id String id associated with spotify playlist
 */
export async function getSpotifyPlaylist(id : string){
    spotify.setAccessToken(localStorage.getItem('spotifyToken'));
    const spotifyPlaylist = await spotify.getPlaylist(id)
    return spotifyPlaylist
}

/**
* This function makes a POST request to Spotify's API that creates a playlist using the id of the user who's currently logged in and the playlist settings
* @param user_id string id associated with Spotify user
* @param playlistSettings name: string, description: string, settings: boolean
* @return The new playlist if playlistSettings.name, nothing otherwise
*/

export async function makeSpotifyPlaylist(user_id : string, playlistSettings : {name: string, description: string, settings: boolean}) {
    spotify.setAccessToken(localStorage.getItem('spotifyToken'));
    let data = {
       name: playlistSettings.name,
       description: playlistSettings.description,
       //DOESN'T WORK RIGHT NOW
       public: playlistSettings.settings,
    };
    if (playlistSettings.name.length > 0) {
       let playlistVariable = await spotify.createPlaylist(user_id, data);
       return playlistVariable;
    }
}

/** This function makes a PATCH request to Spotify's API that updates a playlist using its id 
 * @param uri string associated with a Spotify track
 * @param playlist_id string associated with Spotify playlist
 * @return The updated playlist
*/
export async function addTrackSpotifyPlaylist(uri : string, playlist_id : string) {
    spotify.setAccessToken(localStorage.getItem('spotifyToken'));
    const options = { position: 0 };
    await spotify.addTracksToPlaylist(
        playlist_id,
        [uri],
        options
    )
    const result = await spotify.getPlaylist(playlist_id)
    return result;
}

/** This function makes a PATCH request to Spotify's API and removes a track from a playlist given the playlist's id and the track's uri
 * @param name string, name of the song to be deleted
 * @param playlist_id string, id of the playlist on Spotify
 * @param uri string, uri associated with the song on Spotify
 * @return The updated playlist
  */
 export async function deleteTrackSpotify(name : string, playlist_id : string, uri : string) {
    spotify.setAccessToken(localStorage.getItem('spotifyToken'));
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
        await spotify.removeTracksFromPlaylist(playlist_id, [uri])
        return true;
    }
}

/** Searches for tracks matching a given search term
 * @param query string, term to be searched for
 * @return The top 50 songs that match the search term
 */
export async function searchTracksSpotify(query : string){
    spotify.setAccessToken(localStorage.getItem('spotifyToken'));
    const options = { limit: 50 }
    let result = await spotify.searchTracks(query, options)
    return result;
}

/** Changes the details of a playlist
 * @param playlist_id string
 * @param data object {name: string, description: string, public: boolean}
 * @return The updated playlist
 */
export async function updateSpotifyPlaylistDetails(playlist_id : string, data : {name: string, description: string, setting: boolean}){
    spotify.setAccessToken(localStorage.getItem('spotifyToken'));
    const updates = {
        name: data.name, 
        description: data.description, 
        public: data.setting
    }
    await spotify.changePlaylistDetails(playlist_id, updates)
    const result = await spotify.getPlaylist(playlist_id)
    return result;
}

/** Change the image associated with a Spotify playlist
 * @param playlist_id The id of the playlist
 * @param image Base64 encoded JPEG image data, maximum payload size is 256 KB.
 */
export async function updateSpotifyImage(playlist_id : string, image : any){
    spotify.setAccessToken(localStorage.getItem('spotifyToken'));
    spotify.uploadCustomPlaylistCoverImage(playlist_id, image)
}

/** Gets the currently logged in user's data
 * @return The current user's data
 */
export async function getCurrentUser(){
    spotify.setAccessToken(localStorage.getItem('spotifyToken'));
    return await spotify.getMe()
} 