import { useRouter } from "next/router"
import { playlistExample } from "@/data/playlistData"
import LoadingIcons from 'react-loading-icons'
import { playlistType, trackType } from "@/data/types";
import { useEffect, useState } from "react"
import { deleteTrackFromPlaylist, getPlaylistById } from "@/functions/requests"
import Song from "@/components/song"
import Image from "next/image"
import {v4 as uuidv4} from "uuid"
import Search from "@/components/search"
import { addTrackSpotifyPlaylist, deleteTrackSpotify } from "@/functions/spotify";
import { addTrackToPlaylist } from "@/functions/requests";

export default function Playlist(){
    const [playlist, setPlaylist] = useState<playlistType>()
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

    async function handleAction(track : trackType, action: string) {
        if (playlist) {
            if (action === "Remove") {
                if (await deleteTrackSpotify(`${track.name} by ${track.artist}`, playlist.spotify_id, track.uri)) {
                    const updatedPlaylist = await deleteTrackFromPlaylist(playlist, track)
                    setPlaylist(updatedPlaylist)
                }
            }
            else {
                if (playlist.tracks.some(element => element.uri === track.uri)) {
                    window.alert(`You've already added ${track.name} by ${track.artist}`)
                }
                else {
                    await addTrackSpotifyPlaylist(track.uri, playlist.spotify_id)
                    const updatedPlaylist = await addTrackToPlaylist(playlist, track)
                    setPlaylist(updatedPlaylist)
                }
            }
        }
    }

    return playlist ?
        <div>
            <div>
                <h3>{playlist.name}</h3>
                <h4>{playlist.description}</h4>
                <Image src={playlist.image} alt="Playlist image" width={100} height={100}/>
            </div>
            {playlist.tracks.length > 0 ? playlist.tracks.map(track => <Song track={track} action="Remove" handleAction={handleAction} key={uuidv4()}/>) : null}
            <Search playlistData={playlist} handleAction={handleAction}/>
        </div> 
        : 
        <LoadingIcons.Audio fill="black" speed=".5" height="60px"/>
}