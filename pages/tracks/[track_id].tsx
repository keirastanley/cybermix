import { playlistDataType, spotifyUserType } from "@/data/types"
import { getAllPlaylists, removeComment } from "@/functions/requests"
import { getSpotifyTrack } from "@/functions/spotify"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Loader from "@/components/loader"
import styles from "@/styles/track.module.css"
import { TbPlaylist } from "react-icons/tb"
import { v4 as uuidv4 } from "uuid"
import Comment from "@/components/comment"

type propsObj = {
  user: spotifyUserType;
}

export default function SongPage({ user }: propsObj) {
  const [playlists, setPlaylists] = useState<playlistDataType[]>()
  const [track, setTrack] = useState<any>()
  const router = useRouter()

  async function getTrack() {
    const result: playlistDataType[] = await getAllPlaylists()
    const playlistResults = result.filter(result => result.tracks.some(track => track.id === router.query.track_id))
    setPlaylists(playlistResults)
    const trackResults: any = playlistResults[0].tracks.filter(track => track.id === router.query.track_id)[0]
    const spotifyTrack: any = await getSpotifyTrack(router.query.track_id as string)
    const release = spotifyTrack.album.release_date.split("-")
    let extraProps: any = {
      link: spotifyTrack.external_urls.spotify,
      artist_id: spotifyTrack.artists[0].id,
      release: `${release[2]} ${release[1]} ${release[0]}`,
      duration: spotifyTrack.duration_ms
    }
    for (const property in extraProps) {
      trackResults[property] = extraProps[property]
    }
    setTrack(trackResults)
  }

  useEffect(() => {
    getTrack()
  }, [])

  async function removeCommentFromTrack(track_id: string, comment_id: string) {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const playlist = playlists?.find(playlist => playlist.tracks.some(track => track.comments.some(comment => comment.id === comment_id)));
      const updatedPlaylist = await removeComment(playlist as playlistDataType, track_id, comment_id);
      getTrack();
    }
  }

  return track ? <div className={styles.track_container}>
    <div className={styles.details_image}>
      <div className={styles.track_details}>
        <div className={styles.track_main}>
          <h1 className={styles.track_name}>{track.name}</h1>
          <h2 className={styles.track_main}>{track.artist}</h2>
        </div>
        <div className={styles.album_details}>
          <h4>{track.album}</h4>
          <h4>{track.release}</h4>
        </div>
        <ul>{playlists ? playlists.map(result => <Link href={`/my-mixes/${result._id}`} key={uuidv4()}><li className={styles.playlist_li}><TbPlaylist />{result.name}</li></Link>) : null}</ul>
      </div>
      <Image src={track.image} alt={track.name} width={200} height={200} />
    </div>
    <div className={styles.comments}>
      {track.comments ?
        track.comments.map((comment: { id: string, text: string; author: string; date: string }) =>
          comment.text ?
            <Comment key={uuidv4()} track={track} removeCommentFromTrack={removeCommentFromTrack} comment={comment} user={user} /> :
            null) : null}
    </div>
  </div> : <Loader text="Just a moment..." />
}