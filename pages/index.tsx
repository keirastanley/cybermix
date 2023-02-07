import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Cyber-Mix</title>
        <meta name="description" content="Mixtape-making in the digital age" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cyber-mix-logo.png" />
      </Head>
      <>
        {/* <h2>Mixtape-making in the digital age</h2>
        {/* <img src="http://dangerousminds.net/content/uploads/images/cass1sdfsdfsdfsdfsdf.jpg?138506508"></img> */}
        {/*<img src="https://cdn.shopify.com/s/files/1/0021/6360/5571/articles/pexels-photo-3642351_1024x1024.jpg?v=1601903886"/> */}
      </>
    </>
  )
}
