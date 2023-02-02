import { useRouter } from "next/router"
import { playlistExample } from "@/data/playlistData"
import { playlistType } from "@/data/types"
import { useState } from "react"

export default function Playlist(){
    const [playlist, setPlaylist] = useState<playlistType>()
    const router = useRouter()
    const playlist_Id = router.query._id

    //Get playlist by id

    return <h1>Playlist</h1>
}