import MakePlaylist from "@/components/make-playlist";
import { useState } from "react";
import { postPlaylist } from "@/functions/requests";
import { makeSpotifyPlaylist } from "@/functions/spotify";
import { playlistType, spotifyUserType } from "@/data/types";
import { useRouter } from "next/router";

type propsObj = {
    user: spotifyUserType
}

export default function NewMix({user} : propsObj){
    const [access, setAccess] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [playlistSettings, setPlaylistSettings] = useState<{[key: string]: string}>()
    const router = useRouter()

    /** Sets the playlist's name and description */
    function getPlaylistSettings(event: { target: { name: string; value: string } }){
        const newPlaylistSettings = {...playlistSettings}
        newPlaylistSettings[event.target.name] = event.target.value
        setPlaylistSettings(newPlaylistSettings)
    }

    async function makeNewPlaylist(){
        setLoading(true)
        const d = new Date
        const date = d.toString()
        if (user) {
            const addedSpotifyPlaylist = await makeSpotifyPlaylist(user.id, {
                name: playlistSettings?.name || "A Cyber-Mix Playlist",
                description: playlistSettings?.description || "Playlist made with Cyber-Mix.", 
                settings: true
            })
            if (addedSpotifyPlaylist) {
                const newPlaylist : playlistType = {
                    spotify_id: addedSpotifyPlaylist.id,
                    name: playlistSettings?.name || "A Cyber-Mix Playlist",
                    description: playlistSettings?.description || "Playlist made with Cyber-Mix.",
                    image: "/cyber-mix-logo.png",
                    link: addedSpotifyPlaylist.external_urls.spotify,
                    created_by: addedSpotifyPlaylist.owner.id,
                    tracks: [],
                    date: date,
                    access: access
                }
                const addedPlaylist = await postPlaylist(newPlaylist)
                router.push(`/my-mixes/${addedPlaylist._id}`)
                if (addedPlaylist) {
                    setLoading(false)
                }
            }
        }
    }

    return <MakePlaylist 
                user={user} 
                loading={loading}
                access={access}
                setAccess={setAccess}
                getPlaylistSettings={getPlaylistSettings}
                makeNewPlaylist={makeNewPlaylist}
            />
}