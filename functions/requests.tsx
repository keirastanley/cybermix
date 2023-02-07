import { playlistType, playlistDataType, trackType } from "@/data/types";

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
    return data.payload[0]
}

/** Add new playlist to database
 * @param playlist See playlistType in "@data/types.tsx"
 * @return The newly added playlist
 */
export async function postPlaylist(playlist : playlistType) {
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
export async function updatePlaylist(playlist : playlistDataType, update : {[key: string]: string}) {
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${playlist._id}?action=update`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    })
    const data = await response.json()
    return data.payload[0]
}

export async function addTrackToPlaylist(playlist : playlistDataType, track : trackType){
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${playlist._id}?action=add-track`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(track)
    })
    const data = await response.json()
    return data.payload[0];
}

export async function deleteTrackFromPlaylist(playlist : playlistDataType, track : trackType){
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${playlist._id}?action=delete`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: track.id})
    })
    const data = await response.json()
    return data.payload[0];
}

export async function deletePlaylistById(id : string){
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${id}`,
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json()
    console.log(data)
}

export async function addComment(playlist : playlistDataType, track_id : string, comment : {text: string, author: string, date: string}){
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${playlist._id}?action=comment`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{track_id: track_id}, comment])
    })
    const data = await response.json()
    return data.payload[0];
}