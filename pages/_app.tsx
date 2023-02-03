import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header'
import Footer from '@/components/footer'
import {getCurrentUser, loginUrl} from '@/functions/spotify'
import { useEffect, useReducer, useState } from 'react'
import { spotifyUserType } from '@/data/types'

export default function App({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState<spotifyUserType>()

  useEffect(() => {
    async function getUserData() {
      if (localStorage.getItem('spotifyToken')) {
        const userData = await getCurrentUser()
        setUser(userData)
      }
    } getUserData()
  }, [])

  return <div className="page_container">
    <Header/>
    {user ? <p>Logged in as {user.display_name}</p> : <a href={loginUrl}>Login to Spotify</a>}
    <Component {...pageProps} />
    <Footer/>
  </div>
}