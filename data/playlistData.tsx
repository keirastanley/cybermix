import { playlistArrType } from "./types"

export const playlistExample : playlistArrType = [
    {
    _id: "Id on Mongodb",
    spotify_id: "Id on Spotify",
    name: "Playlist name",
    description: "Playlist description",
    image: "Image src",
    link: "Spotify external url",
    created_by: "Spotify username of playlist creator",
    tracks: [{       
        id: "Spotify id of the track",
        name: "Track name",
        artist: "Artist name",
        album: "Album name",
        image: "Src of album art",
        comments: [{
            text: "Comment text", 
            author: "Comment author", 
            date: "Comment date"
        }]
    }],
    date: "Date the playlist was made",
    access: ["Spotify usernames allowed access to the playlist"]
},
{
    _id: "Id on Mongodb",
    spotify_id: "Id on Spotify",
    name: "Playlist name",
    description: "Playlist description",
    image: "Image src",
    link: "Spotify external url",
    created_by: "Spotify username of playlist creator",
    tracks: [{       
        id: "Spotify id of the track",
        name: "Track name",
        artist: "Artist name",
        album: "Album name",
        image: "Src of album art",
        comments: [{
            text: "Comment text", 
            author: "Comment author", 
            date: "Comment date"
        }]
    }],
    date: "Date the playlist was made",
    access: ["Spotify usernames allowed access to the playlist"]
},
]