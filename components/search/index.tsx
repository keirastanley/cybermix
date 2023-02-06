import { SetStateAction, useState } from "react";
import { searchTracksSpotify } from "@/functions/spotify";
import { v4 as uuidv4 } from "uuid";
import Song from "../song";
import { trackType } from "@/data/types";
import styles from "@/styles/search.module.css"

type propsObj = {
    handleAction: Function;
}

export default function Search({handleAction} : propsObj){
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<trackType[]>([])

    function handleQuery(event: { target: { value: SetStateAction<string> } }) {
		setQuery(event.target.value)
	}

    async function searchTracks() {
		const response = await searchTracksSpotify(query);
        const resultsArr = []
        for (let i of response.tracks.items) {
            const trackObj : trackType = {       
                id: i.id,
                name: i.name,
                artist: i.artists[0].name,
                album: i.album.name,
                image: i.album.images[0].url,
                comments: [{
                    text: "", 
                    author: "", 
                    date: ""
                }], 
                uri: i.uri
            }
            resultsArr.push(trackObj)
        }
		setResults(resultsArr)
	}

    return <div className={styles.search_container}>
        <h2>Add some songs</h2>
        <div className={styles.search_input}>
            <input 
                onChange={handleQuery} 
                placeholder="Search for songs">
            </input>
            <button 
                onClick={searchTracks}>Search
            </button>
        </div>
        <div className={styles.search_results}>
            {results.length > 0 ? results.map(track => 
                <Song track={track} action="Add song" handleAction={handleAction} key={uuidv4()}/>) : null}
        </div>
</div>
}