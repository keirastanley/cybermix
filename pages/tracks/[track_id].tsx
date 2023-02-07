import { playlistDataType, trackType } from "@/data/types"
import { getAllPlaylists, getPlaylistById } from "@/functions/requests"
import { getSpotifyTrack, spotify } from "@/functions/spotify"
import { useRouter } from "next/router"
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react"
import Image from "next/image"
import Link from "next/link"
import Loader from "@/components/loader"
import styles from "@/styles/track.module.css"
import {TbPlaylist} from "react-icons/tb"
import {v4 as uuidv4} from "uuid"

export default function SongPage() {
    const [playlists, setPlaylists] = useState<playlistDataType[]>()
    const [track, setTrack] = useState<any>()
    const router = useRouter()

    useEffect(() => {
        async function getTrack() {
            const result : playlistDataType[] = await getAllPlaylists()
            const playlistResults = result.filter(result => result.tracks.some(track => track.id === router.query.track_id))
            setPlaylists(playlistResults)
            const trackResults : any = playlistResults[0].tracks.filter(track => track.id === router.query.track_id)[0]
            const spotifyTrack : any = await getSpotifyTrack(router.query.track_id as string)
            console.log(spotifyTrack)
            const release = spotifyTrack.album.release_date.split("-")
            let extraProps : any = {
                link: spotifyTrack.external_urls.spotify,
                artist_id: spotifyTrack.artists[0].id,
                release: `${release[2]} ${release[1]} ${release[0]}`,
                duration: spotifyTrack.duration_ms
            }
            for (const property in extraProps) {
                trackResults[property] = extraProps[property]
            }
            setTrack(trackResults)
        } getTrack()
    }, [])

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
                <ul>{playlists ? playlists.map(result => <Link href={`/my-mixes/${result._id}`} key={uuidv4()}><li className={styles.playlist_li}><TbPlaylist/>{result.name}</li></Link>) : null}</ul>
            </div>
            <Image src={track.image} alt={track.name} width={200} height={200}/>
        </div>
        <div className={styles.comments}>
        {track.comments ? 
        track.comments.map((comment: { text: string; author: string; date: string }) => 
            comment.text ? 
                <ul className={styles.comment}>
                    <li className={styles.comment_text}>{comment.text}</li>
                    <li className={styles.comment_info}>{comment.author}</li>
                    <li className={styles.comment_info}>{comment.date}</li>
                </ul> : null) : null}
        </div>
    
    </div> : <Loader/>
}