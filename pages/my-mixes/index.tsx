import Link from "next/link"
import { playlistExample } from "@/data/playlistData"
import LoadingIcons from 'react-loading-icons'
import {v4 as uuidv4} from "uuid"
import { useEffect, useState } from "react"
import { playlistArrType } from "@/data/types"
import styles from "@/styles/playlists.module.css"
import { getAllPlaylists } from "@/functions/cybermix_backend"

export default function MyMixes() {
    const [playlists, setPlaylists] = useState<playlistArrType>([])

    useEffect(() => {
        async function getPlaylists() {
            const playlistArray = await getAllPlaylists();
            console.log(playlistArray)
            setPlaylists(playlistArray)
        } getPlaylists()
    }, [])

    return <>
        <h1>My mixes</h1>
        <div className={styles.playlists_container}>
          {playlists.length > 0 ? playlists.map(el => 
            <div className={styles.playlist} key={uuidv4()}>
                <div className={styles.playlist_name_button}>
                  <h4>{el.name}</h4> 
                  <Link href={`/my-mixes/${el._id}`}><button>Edit</button></Link>
                </div>
                <img src={el.image}></img>
                <p>Made by {el.created_by}</p>
                <p>{el.date.split(" ").slice(0, 4).join(" ")}</p>
            </div>) : <LoadingIcons.Audio fill="black" speed=".5" height="60px"/>}
        </div>
    </>
}