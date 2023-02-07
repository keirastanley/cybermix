import Search from "@/components/search"
import Image from "next/image"
import Song from "@/components/song"
import { v4 as uuidv4 } from "uuid"
import styles from "@/styles/edit_playlist.module.css"
import EditPlaylistPopup from "../edit-playlist-popup"
import { playlistDataType, spotifyUserType, trackType } from "@/data/types";
import {IoMdCheckmark} from "react-icons/io"

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
    <Search handleAction={handleAction} />
    <div className={styles.playlist_container}>
        <div className={styles.playlist_details}>
            <div className={styles.name_edit}>
                <h3>{playlist.name}</h3>               
                <EditPlaylistPopup playlist={playlist} updatePlaylistDetails={updatePlaylistDetails} saveUpdates={saveUpdates}/>
                <button onClick={() => {setView("view")}}><IoMdCheckmark/></button>
            </div>
            <h4>{playlist.description}</h4> 
            <Image src={playlist.image} alt="Playlist image" width={120} height={120} />
        </div>
        <div className={styles.playlist_tracks}>
            {playlist.tracks.length > 0 ? playlist.tracks.map(track => <Song track={track} action="Remove" handleAction={handleAction} addCommentToTrack={addCommentToTrack} user={user} key={uuidv4()} />) : null}
        </div>
    </div>
</div>
}