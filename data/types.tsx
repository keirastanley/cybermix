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
    }],
    uri: string
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

export type spotifyUserType = {
    country: string,
    display_name?: string | undefined,
    email: string,
    explicit_content?: {
        filter_enabled: boolean, 
        filter_locked: boolean
    },
    external_urls: {
      spotify: string;
    },
    followers?: {
        href: string, total: number
    } | undefined,
    href: string,
    id: string,
    images?: {    
      height?: number;
      url: string;
      width?: number;
    }[] | undefined,
    product: string,
    type: string
    uri: string
}