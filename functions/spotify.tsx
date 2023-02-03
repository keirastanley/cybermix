import SpotifyWebApi from "spotify-web-api-js";

export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "https://cybermix.vercel.app/callback"

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

