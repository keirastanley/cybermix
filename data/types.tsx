export type trackType = {       
    id: string,
    name: string,
    artist: string,
    album: string,
    image: string,
    comments: [{
        text: string, 
        author: string, 
        date: string
    }]
}

export type playlistType = {
    _id?: string,
    spotify_id: string,
    name: string,
    description: string,
    image: string,
    link: string,
    created_by: string,
    tracks: trackType[],
    date: string,
    access: string[]
}

export type playlistArrType = playlistType[]

