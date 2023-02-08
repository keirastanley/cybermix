import Search from "@/components/search"
import Image from "next/image"
import Song from "@/components/song"
import { v4 as uuidv4 } from "uuid"
import styles from "@/styles/edit_playlist.module.css"
import EditPlaylistPopup from "../edit-playlist-popup"
import { playlistDataType, spotifyUserType, trackType } from "@/data/types";
import {IoReturnUpBackOutline} from "react-icons/io5"
import {TiDeleteOutline} from "react-icons/ti"
import {IoIosAddCircleOutline} from "react-icons/io"
import { addAccessUser, removeAccessUser } from "@/functions/requests"
import AccessPopup from "../access-popup"
import { MouseEventHandler } from "react"

type propsObj = {
    user: spotifyUserType,
    playlist: playlistDataType, 
    handleAction: Function, 
    updatePlaylistDetails: Function, 
    saveUpdates: Function, 
    addCommentToTrack: Function,
    setView: Function;
    removeAccess: Function;
    grantAccess: Function;
}

export default function EditPlaylist({user, playlist, handleAction, updatePlaylistDetails, saveUpdates, addCommentToTrack, setView, removeAccess, grantAccess} : propsObj){

    return <div className={styles.edit_playlist_container}>
    <div className={styles.playlist_container}>
        <div className={styles.done_button}>
            <button onClick={() => {setView("view")}}><IoReturnUpBackOutline/></button>
            <h2>Edit playlist</h2>
            <EditPlaylistPopup playlist={playlist} updatePlaylistDetails={updatePlaylistDetails} saveUpdates={saveUpdates}/>
        </div>
        <div className={styles.playlist_details}>
            <Image src={playlist.image} alt="Playlist image" width={120} height={120} />
            <div className={styles.name_description}>
                <h3>{playlist.name}</h3>   
                <h4>{playlist.description}</h4>
                <div className={styles.access_container}>
                        Shared with:
                        {playlist.access.slice(1).map(user => 
                            <div className={styles.access_user} key={uuidv4()}>
                                {user}
                                <button onClick={() => removeAccess(user)}><TiDeleteOutline/></button>
                            </div>
                        )}
                        <AccessPopup user={user} initialAccess={playlist.access} grantAccess={grantAccess}/>
                </div>
            </div>
        </div>
        <div className={styles.playlist_tracks}>
            {playlist.tracks.length > 0 ? playlist.tracks.map(track => <Song track={track} action="Remove" handleAction={handleAction} addCommentToTrack={addCommentToTrack} user={user} key={uuidv4()} />) : null}
        </div>
    </div>
    <Search handleAction={handleAction} />
</div>
}