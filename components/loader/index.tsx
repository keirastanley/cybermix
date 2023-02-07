import LoadingIcons from 'react-loading-icons'
import Image from 'next/image'
import styles from "@/styles/loader.module.css"

export default function Loader(){
    return <div className={styles.loader_container}>
    <Image src="https://media1.giphy.com/media/kfReESemsfgWkiN1r3/giphy.gif?cid=ecf05e4701d43untnc44ua33caqqf76gtqmk1kbqb88bx2lw&rid=giphy.gif&ct=g" alt="Loader gif" width={150} height={100}/>
    <LoadingIcons.TailSpin stroke="black" speed="1" height="60px"/>
    <p>Just a moment...</p>
    </div>
}