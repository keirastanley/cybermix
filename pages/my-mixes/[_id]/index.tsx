import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { playlistDataType } from "@/data/types";
import Loader from "@/components/loader"
import Playlist from "@/components/playlist"
import { deletePlaylistById, getPlaylistById } from "@/functions/requests";
import { deleteSpotifyPlaylist } from "@/functions/spotify";
import Link from "next/link";

export default function PlaylistPage({user} : any) {

    const [playlist, setPlaylist] = useState<playlistDataType>()
    const [deleting, setDeleting] = useState({started: false, done: false})
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

    async function deletePlaylist(playlist : playlistDataType) {
        if (window.confirm(`Are you sure you want to delete ${playlist.name}?`)) {
            setPlaylist(undefined)
            setDeleting({started: true, done: false})
            await deleteSpotifyPlaylist(playlist.spotify_id)
            await deletePlaylistById(playlist._id)
            setDeleting({started: true, done: true})
        }
    }

    return playlist ?
        <Playlist playlist={playlist} deletePlaylist={deletePlaylist}/>
        :
            deleting.started ? 
                <Loader text="Deleting..."/>
            :
                deleting.done ?
                    <Link href="/my-mixes">Back to playlists</Link>
                :
                    <Loader text="Just a moment..."/>
}