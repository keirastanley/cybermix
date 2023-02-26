import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { playlistDataType, spotifyUserType } from "@/data/types";
import Loader from "@/components/loader"
import Playlist from "@/components/playlist"
import { deletePlaylistById, getPlaylistById, removeComment } from "@/functions/requests";
import { deleteSpotifyPlaylist } from "@/functions/spotify";
import Link from "next/link";

export default function PlaylistPage({ user }: { user: spotifyUserType }) {

  const [playlist, setPlaylist] = useState<playlistDataType>()
  const [deleting, setDeleting] = useState({ started: false, done: false })
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

  async function removeCommentFromTrack(track_id: string, comment_id: string) {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const updatedPlaylist = await removeComment(playlist as playlistDataType, track_id, comment_id);
      setPlaylist(updatedPlaylist)
    }
  }

  async function deletePlaylist(playlist: playlistDataType) {
    if (window.confirm(`Are you sure you want to delete ${playlist.name}?`)) {
      setPlaylist(undefined)
      setDeleting({ started: true, done: false })
      await deleteSpotifyPlaylist(playlist.spotify_id)
      await deletePlaylistById(playlist._id)
      setDeleting({ started: true, done: true })
    }
  }

  return playlist ?
    <Playlist user={user} playlist={playlist} deletePlaylist={deletePlaylist} removeCommentFromTrack={removeCommentFromTrack} />
    :
    deleting.started ?
      <Loader text="Deleting..." />
      :
      deleting.done ?
        <Link href="/my-mixes">Back to playlists</Link>
        :
        <Loader text="Just a moment..." />
}