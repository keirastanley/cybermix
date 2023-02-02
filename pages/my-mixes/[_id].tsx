import { useRouter } from "next/router"
import { playlistExample } from "@/data/playlistData"
import LoadingIcons from 'react-loading-icons'
import { playlistType } from "@/data/types"
import { useEffect, useState } from "react"
import { getPlaylistById } from "@/functions/cybermix_backend"
import AddSong from "@/components/add-song"
import Image from "next/image"
import {v4 as uuidv4} from "uuid"

export default function Playlist(){
    const [playlist, setPlaylist] = useState<playlistType>()
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

    return playlist ?  
        <div>
            <div>
                <h3>{playlist.name}</h3>
                <h4>{playlist.description}</h4>
                <Image src={playlist.image} alt="Playlist image" width={100} height={100}/>
            </div>
            {playlist?.tracks?.map(track => <AddSong track={track} key={uuidv4()}/>)}
        </div> 
        : 
        <LoadingIcons.Audio fill="black" speed=".5" height="60px"/>
}