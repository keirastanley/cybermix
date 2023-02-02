import { trackType } from "@/data/types"
import Image from "next/image"

type propsType = {
    track: trackType;
}

export default function AddSong({track} : propsType) {
    return <div className="add-song">
        <Image src={track.image} alt={track.album} width={100} height={100}/>
        <div className="add-songs-info">
            <p>{track.name} - {track.artist} 
                <br></br>
                {track.album}
            </p>
        </div>
    <button>Add Song</button>
    </div>
}