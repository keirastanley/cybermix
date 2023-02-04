import { playlistType, trackType } from "@/data/types"
import Image from "next/image"
import styles from "@/styles/song.module.css"

type propsType = {
    track: trackType;
    action: string;
    handleAction: Function;
}

export default function Song({track, action, handleAction} : propsType) {

    return <div className={styles.song_container}>
        <Image src={track.image} alt={track.album} width={80} height={80}/>
        <div className={styles.song_info}>
            <p>{track.name} - {track.artist} 
                <br></br>
                {track.album}
            </p>
        </div>
        <button onClick={() => {handleAction(track, action)}}>{action}</button>
    </div>
}