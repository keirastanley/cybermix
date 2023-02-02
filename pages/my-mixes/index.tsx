import Link from "next/link"
import { playlistExample } from "@/data/playlistData"
import { playlistType } from "@/data/types"

export default function MyMixes() {

    return <>
        <h1>My mixes</h1>
        <Link href={`/my-mixes/${playlistExample.id}`}>{playlistExample.name}</Link>
    </>
}