import { FocusEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { postPlaylist } from "@/functions/requests";
import { getCurrentUser, makeSpotifyPlaylist } from "@/functions/spotify";
import { playlistType, spotifyUserType } from "@/data/types";
import { Tooltip } from 'react-tooltip'
import Loader from "../loader";
import Access from "../access";
import styles from "@/styles/new_mix.module.css"
import Image from "next/image"

type propsType = {
    user: spotifyUserType;
    playlistSettings: {[key: string]: string} | undefined;
    getPlaylistSettings: FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
}

export default function MakePlaylist({user, playlistSettings, getPlaylistSettings} : propsType){
    const router = useRouter()
    const [access, setAccess] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    
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

    return <>
    {loading ? <Loader text="Making your mix..."/> : 
    <div className={styles.new_mix_container}>
    <h1>Make a playlist</h1>
    <p>Name</p>
    <input onBlur={getPlaylistSettings} name="name"></input>
    <p>Description</p>
    <input onBlur={getPlaylistSettings} name="description" placeholder="(Optional)"></input>
    {/* <p>Select a setting</p>
    <select onBlur={getPlaylistSettings} name="setting">
        <option>Public</option>
        <option>Private</option>
    </select> */}
        <Access currentUser={user} access={access} setAccess={setAccess}/>
    <button onClick={makeNewPlaylist}>Done</button>
    </div>}
    </>
}