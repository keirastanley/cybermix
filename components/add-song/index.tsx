import { trackType } from "@/data/types"

type propsType = {
    track: trackType;
}

export default function AddSong({track} : propsType) {
    return <div className="add-song">
    {/* <img src={track.album.images[2].url} alt={track.album.name}></img>
        <div className="add-songs-info">
            <p>{track.name} - {track.artists[0].name} 
                <br></br>
                {track.album.name}
            </p>
        </div>
    <button 
        onClick={() => {context.addTracks(track.uri, playlist.id)}}>Add Song
    </button> */}
    </div>
}