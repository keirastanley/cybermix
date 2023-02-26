import { spotifyUserType, trackType } from "@/data/types";
import styles from "@/styles/comment.module.css";
import { BsTrash } from "react-icons/bs";

type propsObj = {
  user: spotifyUserType;
  comment: { id: string, author: string, text: string, date: string };
  track: trackType;
  removeCommentFromTrack: Function;
}

/** An unordered list that displays the comment's content, author and date */
export default function Comment({ user, comment, track, removeCommentFromTrack }: propsObj) {

  return <ul className={styles.comment}>
    <li className={styles.comment_text}>{comment.text}</li>
    <li className={styles.comment_info}>{comment.author}</li>
    <li className={styles.comment_info}>{comment.date.slice(0, 21)}</li>
    {user.id === comment.author ? <div onClick={() => removeCommentFromTrack(track.id, comment.id)}><BsTrash /></div> : null}
  </ul>
}