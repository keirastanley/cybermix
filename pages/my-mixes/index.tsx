import { useEffect, useState } from "react"
import Link from "next/link"
import LoadingIcons from 'react-loading-icons'
import { getAllPlaylists, deletePlaylistById } from "@/functions/requests"
import { deleteSpotifyPlaylist } from "@/functions/spotify"
import { playlistArrType, playlistDataType } from "@/data/types"
import {v4 as uuidv4} from "uuid"
import styles from "@/styles/playlists.module.css"

export default function MyMixes({user} : any) {
    const [playlists, setPlaylists] = useState<playlistArrType>([])

    async function getPlaylists() {
        const playlistArray = await getAllPlaylists();
        setPlaylists(playlistArray)
    }

    useEffect(() => {
        getPlaylists()
    }, [])

    async function deletePlaylist(playlist : playlistDataType) {
        if (window.confirm(`Are you sure you want to delete ${playlist.name}?`)) {
            await deleteSpotifyPlaylist(playlist.spotify_id)
            await deletePlaylistById(playlist._id)
            getPlaylists()
        }
        // console.log(deletePlaylist(id))
    }

    return user ? <>
        <h1>My mixes</h1>
        <div className={styles.playlists_container}>
          {playlists.length > 0 ? playlists.map(el => 
            <div className={styles.playlist} key={uuidv4()}>
                <div className={styles.playlist_name_button}>
                  <h4>{el.name}</h4>
                  <div className="buttons">
                    <Link href={`/my-mixes/${el._id}`}><button>Edit</button></Link>
                    <button onClick={() => deletePlaylist(el)}>Delete</button>
                  </div> 
                </div>
                <img src={el.image}></img>
                <p>Made by {el.created_by}</p>
                <p>{el.date.split(" ").slice(0, 4).join(" ")}</p>
            </div>) : <LoadingIcons.Audio fill="black" speed=".5" height="60px"/>}
        </div>
    </> : null
}