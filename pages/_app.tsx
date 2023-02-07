import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header'
import Footer from '@/components/footer'
import {getCurrentUser, loginUrl} from '@/functions/spotify'
import { useEffect, useReducer, useState } from 'react'
import { spotifyUserType } from '@/data/types'
import { getTokenFromUrl } from "@/functions/spotify";
import { useRouter } from "next/router";

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

  return <div className="page_container">
    <Header/>
    {user ? <>
      <p>Logged in as {user.display_name}</p>
      <Component {...pageProps} user={user}/>
    </> : 
      <a href={loginUrl}>Login to Spotify</a>}
    {/* <Footer/> */}
  </div>
}