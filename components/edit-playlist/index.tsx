import Search from "@/components/search"
import Image from "next/image"
import Song from "@/components/song"
import { v4 as uuidv4 } from "uuid"
import styles from "@/styles/edit_playlist.module.css"
import EditPlaylistPopup from "../edit-playlist-popup"
import { playlistDataType, spotifyUserType, trackType } from "@/data/types";
import {IoReturnUpBackOutline} from "react-icons/io5"

type propsObj = {
    user: spotifyUserType,
    playlist: playlistDataType, 
    handleAction: Function, 
    updatePlaylistDetails: Function, 
    saveUpdates: Function, 
    addCommentToTrack: Function,
    setView: Function
}

export default function EditPlaylist({user, playlist, handleAction, updatePlaylistDetails, saveUpdates, addCommentToTrack, setView} : propsObj){
    return <div className={styles.edit_playlist_container}>
    <div className={styles.playlist_container}>
        <div className={styles.done_button}>
            <button onClick={() => {setView("view")}}><IoReturnUpBackOutline/></button>
        </div>
        <div className={styles.playlist_details}>
            <Image src={playlist.image} alt="Playlist image" width={120} height={120} />
            <div className={styles.name_edit}>
                <h3>{playlist.name}</h3> 
                <div className={styles.edit_buttons}>
                    <EditPlaylistPopup playlist={playlist} updatePlaylistDetails={updatePlaylistDetails} saveUpdates={saveUpdates}/>
                </div>           
            </div>
            <h4>{playlist.description}</h4> 
        </div>
        <div className={styles.playlist_tracks}>
            {playlist.tracks.length > 0 ? playlist.tracks.map(track => <Song track={track} action="Remove" handleAction={handleAction} addCommentToTrack={addCommentToTrack} user={user} key={uuidv4()} />) : null}
        </div>
    </div>
    <Search handleAction={handleAction} />
</div>
}