import { playlistType } from "@/data/types";

/** Get all playlists from database
 * @return An array of all playlists
 */
 export async function getAllPlaylists() {
    const response = await fetch('https://cybermix-backend.onrender.com/api/playlists')
    const data = await response.json();
    return data.payload;
}

/** Get playlist by id string from database 
 * @param _id String id associated with entry in mongoDB database
 * @return The playlist object
*/
export async function getPlaylistById(_id : string){
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${_id}`)
    const data = await response.json()    
    console.log(data)    
    return data.payload
}

/** Add new playlist to database
 * @param playlist See playlistType in "@data/types.tsx"
 * @return The newly added playlist
 */
export async function postPlaylist(playlist : playlistType) {
    console.log("The playlist in postPlaylist", playlist)
    const response = await fetch('https://cybermix-backend.onrender.com/api/playlists',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)
    })
    const data = await response.json()
    return data.payload;
}

/** Update an existing playlist in the database
 * @param playlist See playlistType in "@data/types.tsx"
 * @param update The property and value of the item to be updated
 */
export async function updatePlaylist(playlist : playlistType, update : {[key: string]: string}) {
    await fetch(`https://cybermix-backend.onrender.com/api/playlists/${playlist._id}`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    })
}