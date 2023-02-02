import { playlistType } from "@/data/types";
import { getAllPlaylists, postPlaylist } from "@/functions/cybermix_backend";
import { ChangeEventHandler, FocusEventHandler } from "react";

type propsType = {
    playlistSettings: {[key: string]: string} | undefined;
    getPlaylistSettings: FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
}

export default function MakePlaylist({playlistSettings, getPlaylistSettings} : propsType){

    async function makeNewPlaylist(){
        const d = new Date
        const date = d.toString()
        const newPlaylist : playlistType = {
            spotify_id: "",
            name: playlistSettings?.name || "A Cyber-Mix Playlist",
            description: playlistSettings?.name || "Playlist made with Cyber-Mix.",
            image: "/cyber-mix-logo.png",
            link: "Get from Spotify",
            created_by: "Get from Spotify",
            tracks: [{       
                id: "Get from Spotify",
                name: "Get from Spotify",
                artist: "Get from Spotify",
                album: "Get from Spotify",
                image: "Get from Spotify",
                comments: [{
                    text: "This is an example of a comment.", 
                    author: "Comment author", 
                    date: "Date of comment"
                }]
            }],
            date: date,
            access: ["Get from user"]
        }
        await postPlaylist(newPlaylist)
        const playlists = await getAllPlaylists()
        console.log(playlists)
    }

    return <div>
    <h1>Make a playlist</h1>
    <p>Name</p>
    <input onBlur={getPlaylistSettings} name="name"></input>
    <p>Description</p>
    <input onBlur={getPlaylistSettings} name="description"></input>
    <p>Select a setting</p>
    <select onBlur={getPlaylistSettings} name="setting">
        <option>Public</option>
        <option>Private</option>
    </select>
    <button onClick={makeNewPlaylist}>Make playlist</button>
</div>
}