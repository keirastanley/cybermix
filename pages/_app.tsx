import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header'
import {getCurrentUser, loginUrl} from '@/functions/spotify'
import { useEffect, useReducer, useState } from 'react'
import { spotifyUserType } from '@/data/types'
import { getTokenFromUrl } from "@/functions/spotify";
import {BsSpotify} from "react-icons/bs"

export default function App({ Component, pageProps }: AppProps) {
  const [token, setToken] = useState<string>()
  const [user, setUser] = useState<spotifyUserType>()

  useEffect(() => {
    if (localStorage.getItem('spotifyToken')) {
      const spotifyToken = localStorage.getItem('spotifyToken') as string;
      setToken(spotifyToken)
    }
  }, [])

  useEffect(() => {
    /**
     * This function stores the authentication token that we receive after the user logs in to their Spotify account in local storage
     */
    async function getSpotifyToken(){
        const spotifyToken = getTokenFromUrl().access_token;
        window.location.hash = "";
        if (spotifyToken) {
            localStorage.setItem('spotifyToken', spotifyToken)
        setToken(spotifyToken)
        }
    }
    getSpotifyToken()
  }, []);

  useEffect(() => {
    async function getUserData() {
      if (token) {
        const userData = await getCurrentUser()
        setUser(userData)
      }
    } getUserData()
  }, [token])

  function logUserOut(){
    if (window.confirm("Would you like to log out?")) {
      localStorage.removeItem("spotifyToken")
      setToken(undefined)
      setUser(undefined)
    }
  }

  return <div className="page_container">
    <Header/>
    {user ? <>
      <p>Logged in as {user.display_name} <span onClick={logUserOut} style={{"cursor" : "pointer", "color": "grey"}}>(Log out)</span></p>
      <Component {...pageProps} user={user}/>
    </> : 
        <a href={loginUrl} style={{"fontSize": "20px"}} className="login_button">
            <BsSpotify style={{"fontSize": "30px"}}/>
              Login to Spotify
        </a>}
  </div>
}