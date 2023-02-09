import React, { LegacyRef, MouseEventHandler, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { playlistDataType, trackType } from "@/data/types";
import styles from "@/styles/playlist.module.css"
import Loader from "@/components/loader"
import Playlist from "@/components/playlist"
import { getPlaylistById } from "@/functions/requests";

export default function PlaylistPage({user} : any) {

    const [playlist, setPlaylist] = useState<playlistDataType>()
    const router = useRouter()

    useEffect(() => {
        async function getPlaylist() {
            let playlist_id;
            if (router.query._id) {
                playlist_id = router.query._id as string
            }
            else {
                playlist_id = window.location.pathname.split("/").pop() as string
            }
            const playlistObject = await getPlaylistById(playlist_id)
            setPlaylist(playlistObject)
        } getPlaylist()
    }, [])

    return playlist ? <Playlist playlist={playlist}/> : <Loader text="Just a moment..."/>
}