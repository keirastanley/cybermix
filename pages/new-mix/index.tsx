import { useEffect, useState } from "react";

export default function NewMix(){

    const [playlistSettings, setPlaylistSettings] = useState<{[key: string]: string}>()

    function getPlaylistSettings(event: { target: { name: string; value: string } }){
        const newPlaylistSettings = {...playlistSettings}
        newPlaylistSettings[event.target.name] = event.target.value
        setPlaylistSettings(newPlaylistSettings)
    }

    return <div>
        <h1>Make a playlist</h1>
        <p>Name</p>
        <input onBlur={getPlaylistSettings} name="name"></input>
        <p>Description</p>
        <input onBlur={getPlaylistSettings} name="description"></input>
        <p>Select a setting</p>
        <select onChange={getPlaylistSettings} name="setting">
            <option>Public</option>
            <option>Private</option>
        </select>
</div>
}