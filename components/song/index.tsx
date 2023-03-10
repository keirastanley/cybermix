import Image from "next/image"
import styles from "@/styles/song.module.css"
import { spotifyUserType, trackType } from "@/data/types"
import CommentPopup from "../popups/comment-popup";
import { MdPlaylistAdd } from "react-icons/md"
import { BsTrash } from "react-icons/bs"
import { v4 as uuidv4 } from "uuid"
import { use, useState } from "react";
import { CgMoreO } from "react-icons/cg"
import { useRouter } from "next/router";
import Link from "next/link"
import Comment from "@/components/comment"

type propsType = {
  track: trackType;
  action: string;
  handleAction?: Function;
  addCommentToTrack?: Function;
  removeCommentFromTrack?: Function;
  user: spotifyUserType;
}

/** A component that displays a song and its necessary buttons / icons for adding, deleting, adding comments or navigating to full song view */
export default function Song({ track, action, handleAction, addCommentToTrack, removeCommentFromTrack, user }: propsType) {
  const [showComments, setShowComments] = useState(false)
  const router = useRouter()

  function Action() {
    if (handleAction) {
      if (action === "Remove") {
        return <button onClick={() => { handleAction(track, action) }}><BsTrash /></button>
      }
      else {
        return <button onClick={() => { handleAction(track, action) }} style={{ "cursor": "pointer", "fontSize": "20px" }}><MdPlaylistAdd /></button>
      }
    }
    else {
      let actionText = ""
      let numberOfComments = 0
      let last = ""
      if (showComments) {
        actionText = "Hide"
      }
      else {
        actionText = "Show"
      }
      if (track.comments) {
        numberOfComments = track.comments.filter(el => el.text).length
      }
      if (numberOfComments === 1) {
        last = "comment"
      }
      else {
        last = "comments"
      }
      let buttonText = actionText + " " + numberOfComments + " " + last
      return numberOfComments > 0 ?
        <button onClick={() => setShowComments(!showComments)} style={{ "cursor": "pointer", "fontSize": "12px", "width": "100px" }}>
          {buttonText}
        </button> :
        <></>
    }
  }

  function Comments() {
    return <div className={styles.comment_container}>
      {track.comments ? track.comments.map(comment =>
        comment.text && removeCommentFromTrack ?
          <Comment
            key={uuidv4()}
            comment={comment}
            track={track}
            removeCommentFromTrack={removeCommentFromTrack}
            user={user}
          />
          : null)
        : null}
    </div>
  }

  return <>
    <div className={styles.song_container}>
      <div className={styles.song_details}>
        {track.image ?
          <Link href={{ pathname: `/tracks/${track.id}`, query: { _id: router.query._id } }}>
            <Image src={track.image} alt={track.album} width={70} height={70} />
          </Link> : null}
        <Link
          href={{ pathname: `/tracks/${track.id}`, query: { _id: router.query._id } }}><div className={styles.song_info}>
            <p>{track.name} - {track.artist}
              <br></br>
              <i>{track.album}</i>
            </p>
          </div>
        </Link>
      </div>
      <div className={styles.buttons}>
        {action === "Remove" ?
          <CommentPopup
            user={user}
            track={track}
            addCommentToTrack={addCommentToTrack}
          /> : null}
        <Action />
      </div>
    </div>
    <div>
      {showComments ? <Comments /> : null}
    </div>
  </>
}