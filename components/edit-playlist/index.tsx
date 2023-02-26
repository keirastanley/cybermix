import Link from "next/link"
import { IoReturnUpBackOutline } from "react-icons/io5"
import { TiDeleteOutline } from "react-icons/ti"
import AccessPopup from "@/components/popups/access-popup"
import Image from "next/image"
import Song from "@/components/song"
import { v4 as uuidv4 } from "uuid"
import EditPlaylistPopup from "@/components/popups/edit-playlist-popup"
import styles from "@/styles/edit_playlist.module.css"
import { playlistDataType, spotifyUserType } from "@/data/types"

type propsObj = {
  user: spotifyUserType;
  updatePlaylistDetails: Function;
  playlist: playlistDataType;
  saveUpdates: Function;
  removeAccess: Function;
  grantAccess: Function;
  handleAction: Function;
  addCommentToTrack: Function;
  removeCommentFromTrack: Function;
}

export default function EditPlaylist({ user, updatePlaylistDetails, playlist, saveUpdates, removeAccess, grantAccess, handleAction, addCommentToTrack, removeCommentFromTrack }: propsObj) {

  return <div className={styles.playlist_container}>
    <div className={styles.done_button}>
      <Link href={`/my-mixes/${playlist._id}/`}>
        <button>
          <IoReturnUpBackOutline />
        </button>
      </Link>
      <h2>Edit playlist</h2>
      <EditPlaylistPopup
        playlist={playlist}
        updatePlaylistDetails={updatePlaylistDetails}
        saveUpdates={saveUpdates}
      />
    </div>
    <div className={styles.playlist_details}>
      <Image
        src={playlist.image}
        alt="Playlist image"
        width={120}
        height={120}
      />
      <div className={styles.name_description}>
        <h3>{playlist.name}</h3>
        <h4>{playlist.description}</h4>
        <div className={styles.access_container}>
          Shared with:
          {playlist.access.slice(1).map(user =>
            <div className={styles.access_user} key={uuidv4()}>
              {user}
              <button onClick={() => removeAccess(user)}>
                <TiDeleteOutline />
              </button>
            </div>
          )}
          <AccessPopup
            user={user}
            initialAccess={playlist.access}
            grantAccess={grantAccess}
          />
        </div>
      </div>
    </div>
    <div className={styles.playlist_tracks}>
      {playlist.tracks.length > 0 ?
        playlist.tracks.map(track =>
          <Song
            track={track}
            action="Remove"
            handleAction={handleAction}
            addCommentToTrack={addCommentToTrack}
            removeCommentFromTrack={removeCommentFromTrack}
            user={user}
            key={uuidv4()}
          />) : null}
    </div>
  </div>
}