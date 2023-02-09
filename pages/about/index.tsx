import styles from "@/styles/about.module.css"

export default function About() {
    return <div className={styles.about_page}>
            <h2>Mixtape-making in the digital age</h2>
            <img src="https://64.media.tumblr.com/e602f81f97f9badba140d95b8c205262/tumblr_pt2vo0ZQna1tuvwugo1_500.gif" alt="Retro Spotify cassette gif"/>
            <p className={styles.main_text}>Cyber-Mix is a project by 
                <a href="https://github.com/keirastanley">Keira Stanley</a> and 
                <a href="https://github.com/gregrutnam">Greg Rutnam</a>. 
                <br></br>
                The tech-stack includes TypeScript, Next.js and MongoDB. Have a look at the 
                <a href="https://github.com/keirastanley/cybermix">repo</a>.
            </p>
    </div>
}