import { FocusEventHandler, MouseEventHandler, useState } from "react";
import Loader from "../loader";
import Access from "../access";
import styles from "@/styles/new_mix.module.css"
import { spotifyUserType } from "@/data/types";

type propsType = {
    user: spotifyUserType;
    loading: boolean;
    access: string[];
    setAccess: Function;
    getPlaylistSettings: FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
    makeNewPlaylist: MouseEventHandler<HTMLButtonElement>;
}

/** A component that contains the input fileds to select the playlist's name and description, renders the Access component that handles which Spotify users can view the playlist and a button that makes the POST requests to Spotify and the database. */
export default function MakePlaylist({user, loading, access, setAccess, getPlaylistSettings, makeNewPlaylist} : propsType){

    return loading ? <Loader text="Making your mix..."/> : 
    <div className={styles.new_mix_container}>
    <h1>Make a playlist</h1>
    <p>Name</p>
    <input onBlur={getPlaylistSettings} name="name"></input>
    <p>Description</p>
    <input onBlur={getPlaylistSettings} name="description" placeholder="(Optional)"></input>
    {/* <p>Select a setting</p>
    <select onBlur={getPlaylistSettings} name="setting">
        <option>Public</option>
        <option>Private</option>
    </select> */}
        <Access currentUser={user} access={access} setAccess={setAccess}/>
    <button onClick={makeNewPlaylist}>Done</button>
    </div>
}