import { useRouter } from "next/router"
import { playlistExample } from "@/data/playlistData"
import LoadingIcons from 'react-loading-icons'
import { playlistType } from "@/data/types"
import { useEffect, useState } from "react"
import { getPlaylistById } from "@/functions/cybermix_backend"

export default function Playlist(){
    const [playlist, setPlaylist] = useState<playlistType>()
    const router = useRouter()
    const playlist_id = router.query._id as string;

    useEffect(() => {
        async function getPlaylist() {
            const playlistObject = await getPlaylistById(playlist_id)
            setPlaylist(playlistObject)
        } getPlaylist()
    }, [])
    //Get playlist by id fetch request goes here

    return playlist ?  <div>Playlist</div> : <LoadingIcons.Audio fill="black" speed=".5" height="60px"/>
}