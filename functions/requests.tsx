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
 * @param playlist See playlistType in "@/data/types.tsx"
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
 * @param playlist See playlistType in "@/data/types.tsx"
 * @param update The property and value of the item to be updated
 * @return The updated playlist
 */
export async function updatePlaylist(playlist : playlistDataType, update : {[key: string]: string}) {
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${playlist._id}?action=update-playlist`,
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

/** Function to a delete a playlist
 * @param id The id of the playlist you want to delete
 * @return The deleted playlist
 */
 export async function deletePlaylistById(id : string){
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${id}`,
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json()
    return data.payload[0]
}

/** Function add a new track to a playlist
 * @param playlist See playlistType in "@/data/types.tsx"
 * @param track See trackType in "@/data/types.tsx"
 * @return The updated playlist
 */
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

/** Function to delete a track from a playlist
 * @param playlist See playlistType in "@/data/types.tsx"
 * @param track See trackType in "@/data/types.tsx"
 * @return The updated playlist
 */
export async function deleteTrackFromPlaylist(playlist : playlistDataType, track : trackType){
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${playlist._id}?action=delete-track`,
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

/** Function add a new comment to a track
 * @param playlist See playlistType in "@/data/types.tsx"
 * @param track_id The id of the track you want to add a comment to
 * @param comment The comment's text, author and date in an object
 * @return The updated playlist
 */
export async function addComment(playlist : playlistDataType, track_id : string, comment : {text: string, author: string, date: string}){
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${playlist._id}?action=add-comment`,
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

/** Function grant a user access to a playlist
 * @param playlist See playlistType in "@/data/types.tsx"
 * @param user_id The Spotify id of the user whow ill be granted access
 * @return The updated playlist
 */
export async function addAccessUser(playlist : playlistDataType, user_id : string){
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${playlist._id}?action=add-access`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: user_id})
    })
    const data = await response.json()
    return data.payload[0];
}

/** Function remove a user from having access to a playlist
 * @param playlist See playlistType in "@/data/types.tsx"
 * @param user_id The Spotify id of the user who will be removed from having access
 * @return The updated playlist
 */
export async function removeAccessUser(playlist : playlistDataType, user_id : string){
    const response = await fetch(`https://cybermix-backend.onrender.com/api/playlists/${playlist._id}?action=remove-access`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: user_id})
    })
    const data = await response.json()
    return data.payload[0];
}