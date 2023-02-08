import { spotifyUserType } from "@/data/types";
import { getSpotifyUser, spotify } from "@/functions/spotify";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from "@/styles/access.module.css"
import { TiDeleteOutline } from "react-icons/ti"
import Image from "next/image";
import { BsSearch } from "react-icons/bs"
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

type propsObj = {
    currentUser: spotifyUserType;
    access: string[];
    setAccess: Function;
}

export default function Access({ currentUser, access, setAccess }: propsObj) {
    const [accessInput, setAccessInput] = useState("")
    const [spotifyUser, setSpotifyUser] = useState<spotifyUserType | undefined>()

    useEffect(() => {
        if (currentUser && access.includes(currentUser.id) === false) {
            setAccess([currentUser.id])
        }
    }, [])

    /** Take in "Access" input and store it as state */
    function getAccessInput(event: any) {
        if (event.target.value.length > 0) {
            setAccessInput(event.target.value)
        }
    }

    function handleSearch(event: any) {
        if (event.key === "Enter") {
            validateUser(accessInput)
        }
    }

    /**Check if the user's "Access" input matches a valid Spotify user. If yes, set "isValidUser" to true and set the access user details. If no, set "isValidUser" to false */
    async function validateUser(user: string) {
        if (user.length > 0) {
            const response: { success: boolean, payload: spotifyUserType | string } = await getSpotifyUser(user)
            if (response.success) {
                setSpotifyUser(response.payload as spotifyUserType)
            }
            else {
                setSpotifyUser(undefined)
            }
        }
    }

    function DisplayUser() {
        return spotifyUser ? <div className={styles.access_user_container}>
            <div className={styles.access_names_button}>
                <a href={spotifyUser.external_urls.spotify}>{spotifyUser.display_name}</a>
                <p>{spotifyUser.id}</p>
                <button onClick={shareWithUser}>Add</button>
            </div>
            {spotifyUser.images && spotifyUser.images.length > 0 ?
                <img src={spotifyUser.images[0].url} alt="" width={85} height={85} /> : null}
        </div> : null
    }

    function DisplayAddedUser() {
        return <div className={styles.added_access_users_container}>{access.slice(1).map(user =>
            <div className={styles.added_access_user} key={uuidv4()}>
                <p>{user}</p>
                <p onClick={() => removeUser(user)}><TiDeleteOutline /></p>
            </div>)}</div>
    }

    function shareWithUser() {
        if (spotifyUser && access.includes(spotifyUser.id) === false) {
            const newAccess = [...access, spotifyUser?.id]
            setAccess(newAccess)
            setSpotifyUser(undefined)
        }
    }

    function removeUser(id: string) {
        const newAccess = access.filter(user => user !== id)
        setAccess(newAccess)
    }

    return <div className={styles.access_container}>
        <Tooltip anchorId="tooltip" style={{ "opacity": "1" }} place="top" >
            <h2 style={{ "fontFamily": "Indie Flower" }}>How to find a Spotify user&#39;s id:</h2>
            <Image src="/spotify_id_help.png" alt="How to find a Spotify user's id" width={400} height={320} />
        </Tooltip>
        <p>Share <i style={{ "color": "gray" }} id="tooltip">Need help?</i></p>
        {access.length > 1 ? <DisplayAddedUser /> : null}
        {spotifyUser ? <DisplayUser /> : null}
        <div className={styles.search_input_section}>
            <input
                onChange={getAccessInput}
                onKeyDown={handleSearch}
                placeholder="(Optional) Enter a spotify user's id"
            >
            </input>
            <BsSearch />
        </div>
    </div>
}