import styles from "@/styles/comment.module.css"

export default function Comment({comment} : any) {
    return <ul className={styles.comment}>
                <li className={styles.comment_text}>{comment.text}</li>
                <li className={styles.comment_info}>{comment.author}</li>
                <li className={styles.comment_info}>{comment.date}</li>
            </ul>
}