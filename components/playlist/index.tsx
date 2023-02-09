import {CiEdit} from "react-icons/ci"
import Image from "next/image"
import Song from "../song"
import { playlistDataType } from "@/data/types"
import styles from "@/styles/playlist.module.css"
import { v4 as uuidv4 } from "uuid"
import {BsSpotify} from "react-icons/bs"
import Link from "next/link"
import { useRouter } from "next/router";

type propsObj = {
    playlist: playlistDataType,
}

export default function Playlist({playlist} : propsObj) {
    const router = useRouter()

    return <div className={styles.playlist_container}>
        <div className={styles.main_details_button}>
            <Image 
                src={playlist.image} 
                alt="Image associated with the playlist on Spotify" 
                width={200} 
                height={200}
            />
            <div className={styles.main_details}>
                <Link href={`${router.query._id}/edit`}>
                    <button>
                        <CiEdit/>
                    </button>
                </Link>
                <h1>{playlist.name}</h1>
                <h3>{playlist.description}</h3>
                <h3>
                    Made by {playlist.created_by} on {playlist.date.split(" ").slice(0, 4).join(" ")}
                </h3>
                <a href={playlist.link} className={styles.playlist_link}>
                    <BsSpotify/> 
                        Play on Spotify
                </a>
            </div>
        </div>
        <div className={styles.playlist_tracks}>
            {playlist.tracks.length > 0 ? playlist.tracks.map(track => 
                <Song 
                    track={track} 
                    action="View" 
                    key={uuidv4()}
                />) : null}
        </div>
    </div>
}