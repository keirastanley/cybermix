import styles from "@/styles/comment.module.css"

/** An unordered list that displays the comment's content, author and date */
export default function Comment({comment} : any) {
    return <ul className={styles.comment}>
                <li className={styles.comment_text}>{comment.text}</li>
                <li className={styles.comment_info}>{comment.author}</li>
                <li className={styles.comment_info}>{comment.date}</li>
            </ul>
}