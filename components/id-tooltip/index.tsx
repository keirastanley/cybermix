import { Tooltip } from 'react-tooltip'
import Image from "next/image";
import 'react-tooltip/dist/react-tooltip.css'

/** A div that appears on hover of "Need help?" to provide the user with instructions to find a user's Spotify id if needed */
export default function IdTooltip() {
    return <>
        <Tooltip anchorId="tooltip" style={{ "opacity": "1" }} place="top" >
            <h2 style={{ "fontFamily": "Indie Flower" }}>How to find a Spotify user&#39;s id:</h2>
            <Image src="/spotify_id_help.png" alt="How to find a Spotify user's id" width={400} height={320} />
        </Tooltip>
        <p>Share <i style={{ "color": "gray" }} id="tooltip">Need help?</i></p>
    </>
}