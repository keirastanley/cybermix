import Image from "next/image"
import styles from "@/styles/song.module.css"
import { trackType } from "@/data/types"

type propsType = {
    track: trackType;
    action: string;
    handleAction: Function;
}

export default function Song({track, action, handleAction} : propsType) {

    return <div className={styles.song_container}>
        <Image src={track.image} alt={track.album} width={70} height={70}/>
        <div className={styles.song_info}>
            <p>{track.name} - {track.artist} 
                <br></br>
                <i>{track.album}</i>
            </p>
        </div>
        <button onClick={() => {handleAction(track, action)}}>{action}</button>
    </div>
}