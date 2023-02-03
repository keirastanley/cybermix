import { getTokenFromUrl } from "@/functions/spotify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Callback() {

    const [user, setUser] = useState<string>()
    const [token, setToken] = useState<string>()
    const router = useRouter()
  
    useEffect(() => {
        /**
         * This function stores the authentication token that we receive after the user logs in to their Spotify account in local storage
         */
        async function getSpotifyToken(){
            const _spotifyToken = getTokenFromUrl().access_token;
            window.location.hash = "";
            if (_spotifyToken) {
                localStorage.setItem('spotifyToken', _spotifyToken)
            setToken(_spotifyToken)
            }
        }
        getSpotifyToken()
      }, []);
    
    useEffect(() => {
        if (token) {
            router.push("/")
        }
    }, [token])
}