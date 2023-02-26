import Search from "@/components/search"
import styles from "@/styles/edit_playlist.module.css"
import { playlistDataType, spotifyUserType, trackType } from "@/data/types";
import { deleteTrackFromPlaylist, getPlaylistById, addTrackToPlaylist, updatePlaylist, addComment, removeAccessUser, addAccessUser, removeComment } from "@/functions/requests"
import { addTrackSpotifyPlaylist, deleteTrackSpotify, updateSpotifyPlaylistDetails } from "@/functions/spotify";
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Loader from "@/components/loader"
import EditPlaylist from "@/components/edit-playlist";

type propsObj = {
  user: spotifyUserType,
}

export default function EditPage({ user }: propsObj) {
  const [playlist, setPlaylist] = useState<playlistDataType>()
  const [details, setDetails] = useState<{ [key: string]: string | boolean }>({ name: "", description: "" })
  const router = useRouter()

  useEffect(() => {
    async function getPlaylist() {
      let playlist_id;
      if (router.query._id) {
        playlist_id = router.query._id as string
        const playlistObject = await getPlaylistById(playlist_id)
        setPlaylist(playlistObject)
      }
    } getPlaylist()
  }, [router.query._id])


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

  function updatePlaylistDetails(event: any) {
    const newDetails = { ...details }
    newDetails[event.target.name] = event.target.value
    setDetails(newDetails)
  }

  async function saveUpdates() {
    if (window.confirm("Save changes?")) {
      if (playlist) {
        await updateSpotifyPlaylistDetails(playlist.spotify_id, details as { name: string, description: string, public: boolean })
        await updatePlaylist(playlist, { name: details.name as string })
        await updatePlaylist(playlist, { description: details.description as string })
        const updatedPlaylist = await getPlaylistById(playlist._id)
        setPlaylist(updatedPlaylist)
        if (updatedPlaylist) {
          return true;
        }
      }
    }
  }

  async function addCommentToTrack(track: any, comment: any) {
    const updatedPlaylist = await addComment(playlist as playlistDataType, track.id, comment);
    setPlaylist(updatedPlaylist)
  }

  async function removeCommentFromTrack(track_id: string, comment_id: string) {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const updatedPlaylist = await removeComment(playlist as playlistDataType, track_id, comment_id);
      setPlaylist(updatedPlaylist)
    }
  }

  async function removeAccess(id: string) {
    const result = await removeAccessUser(playlist as playlistDataType, id)
    setPlaylist(result)
  }

  async function grantAccess(id: string) {
    if (window.confirm("Done?")) {
      const result = await addAccessUser(playlist as playlistDataType, id)
      setPlaylist(result)
    }
  }

  return playlist ? <div className={styles.edit_playlist_container}>
    <EditPlaylist
      user={user}
      updatePlaylistDetails={updatePlaylistDetails}
      playlist={playlist}
      saveUpdates={saveUpdates}
      removeAccess={removeAccess}
      grantAccess={grantAccess}
      handleAction={handleAction}
      addCommentToTrack={addCommentToTrack}
      removeCommentFromTrack={removeCommentFromTrack}
    />
    <Search handleAction={handleAction} />
  </div> : <Loader text="Just a moment..." />
}