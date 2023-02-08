import MakePlaylist from "@/components/make-playlist";
import { spotifyUserType } from "@/data/types";
import { useState } from "react";

type propsObj = {
    user: spotifyUserType
}

export default function NewMix({user} : propsObj){

    const [playlistSettings, setPlaylistSettings] = useState<{[key: string]: string}>()

    function getPlaylistSettings(event: { target: { name: string; value: string } }){
        const newPlaylistSettings = {...playlistSettings}
        newPlaylistSettings[event.target.name] = event.target.value
        setPlaylistSettings(newPlaylistSettings)
    }

    return <MakePlaylist user={user} playlistSettings={playlistSettings} getPlaylistSettings={getPlaylistSettings}/>
}