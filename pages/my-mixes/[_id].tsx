import React, { LegacyRef, MouseEventHandler, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Search from "@/components/search"
import Song from "@/components/song"
import LoadingIcons from 'react-loading-icons'
import { deleteTrackFromPlaylist, getPlaylistById, addTrackToPlaylist, updatePlaylist } from "@/functions/requests"
import { addTrackSpotifyPlaylist, deleteTrackSpotify, updateSpotifyPlaylistDetails } from "@/functions/spotify";
import { playlistDataType, trackType } from "@/data/types";
import { v4 as uuidv4 } from "uuid"
import styles from "@/styles/playlist.module.css"
import ModalPopup from "@/components/modal-popup"
import { stringify } from "querystring"



export default function Playlist() {
    const [playlist, setPlaylist] = useState<playlistDataType>()
    const [details, setDetails] = useState<{[key: string]: string | boolean}>({name: "", description: "", public: true})
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

    async function handleAction(track: trackType, action: string) {
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

    function updatePlaylistDetails(event : any) {
        const newDetails = {...details}
        newDetails[event.target.name] = event.target.value
        setDetails(newDetails)
    }

    async function saveUpdates(){
        if (playlist){
            await updateSpotifyPlaylistDetails(playlist._id, details as {name: string, description: string, public: boolean})
            await updatePlaylist(playlist, {name: details.name as string})
            await updatePlaylist(playlist, {description: details.description as string})
            const updatedPlaylist = await getPlaylistById(playlist._id)
            setPlaylist(updatedPlaylist)
            if (updatedPlaylist) {
                return true;
            }
        }
    }

    useEffect(() => {
        console.log(details)
    }, [details])


    return playlist ?
        <div className={styles.edit_playlist_container}>
            <Search handleAction={handleAction} />
            <div className={styles.playlist_container}>
                <div className={styles.playlist_details}>
                    <h3>{playlist.name}</h3>
                    <h4>{playlist.description}</h4>
                    <Image src={playlist.image} alt="Playlist image" width={120} height={120} />
                </div>
                <ModalPopup playlist={playlist} updatePlaylistDetails={updatePlaylistDetails} saveUpdates={saveUpdates}/>
                <div className={styles.playlist_tracks}>
                    {playlist.tracks.length > 0 ? playlist.tracks.map(track => <Song track={track} action="Remove" handleAction={handleAction} key={uuidv4()} />) : null}
                </div>
            </div>
        </div>
        :
        <LoadingIcons.Audio fill="black" speed=".5" height="60px" />
}