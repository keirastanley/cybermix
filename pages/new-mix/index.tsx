import MakePlaylist from "@/components/make-playlist";
import { useState } from "react";

export default function NewMix(){

    const [playlistSettings, setPlaylistSettings] = useState<{[key: string]: string}>()

    function getPlaylistSettings(event: { target: { name: string; value: string } }){
        const newPlaylistSettings = {...playlistSettings}
        newPlaylistSettings[event.target.name] = event.target.value
        setPlaylistSettings(newPlaylistSettings)
    }

    return <MakePlaylist playlistSettings={playlistSettings} getPlaylistSettings={getPlaylistSettings}/>
}