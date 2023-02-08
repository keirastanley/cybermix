import React, { LegacyRef, MouseEventHandler, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Song from "@/components/song"
import { deleteTrackFromPlaylist, getPlaylistById, addTrackToPlaylist, updatePlaylist, addComment, removeAccessUser, addAccessUser } from "@/functions/requests"
import { addTrackSpotifyPlaylist, deleteTrackSpotify, updateSpotifyPlaylistDetails } from "@/functions/spotify";
import { playlistDataType, trackType } from "@/data/types";
import styles from "@/styles/playlist.module.css"
import EditPlaylistPopup from "@/components/edit-playlist-popup"

import Loader from "@/components/loader"
import EditPlaylist from "@/components/edit-playlist"
import ViewPlaylist from "@/components/view-playlist"

export default function Playlist({user} : any) {

    const [playlist, setPlaylist] = useState<playlistDataType>()
    const [details, setDetails] = useState<{[key: string]: string | boolean}>({name: "", description: ""})
    const [view, setView] = useState("view")
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
        if (window.confirm("Save changes?")) {
            if (playlist){
                await updateSpotifyPlaylistDetails(playlist.spotify_id, details as {name: string, description: string, public: boolean})
                await updatePlaylist(playlist, {name: details.name as string})
                await updatePlaylist(playlist, {description: details.description as string})
                const updatedPlaylist = await getPlaylistById(playlist._id)
                setPlaylist(updatedPlaylist)
                if (updatedPlaylist) {
                    return true;
                }
            }
        }
    }

    async function addCommentToTrack(track : any, comment : any) {
        const updatedPlaylist = await addComment(playlist as playlistDataType, track.id, comment);
        setPlaylist(updatedPlaylist)
    }

    async function removeAccess(id : string) {
        const result = await removeAccessUser(playlist as playlistDataType, id)
        console.log(result)
        setPlaylist(result)
    }

    async function grantAccess(id : string){
        console.log("hello")
        if (window.confirm("Done?")) {
          const result = await addAccessUser(playlist as playlistDataType, id)
          setPlaylist(result)
        //   setIsOpen(true)
        }
      }

    return playlist ? view === "view" ? 
        <ViewPlaylist playlist={playlist} setView={setView}/> :
        <EditPlaylist 
            user={user} 
            playlist={playlist} 
            handleAction={handleAction} 
            updatePlaylistDetails={updatePlaylistDetails} 
            saveUpdates={saveUpdates} 
            addCommentToTrack={addCommentToTrack} 
            setView={setView} 
            removeAccess={removeAccess} 
            grantAccess={grantAccess}/>
        :
        <Loader text="Just a moment..."/>
}