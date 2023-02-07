import { useEffect, useState } from "react";
import Popup from "reactjs-popup"
import styles from "@/styles/comment.module.css"
import {VscSaveAs} from "react-icons/vsc"
import {CiEdit} from "react-icons/ci"
import {BiCommentAdd} from "react-icons/bi"
import {FaRegCommentDots} from "react-icons/fa"
import { createNoSubstitutionTemplateLiteral } from "typescript";

export default function CommentPopup({user, track, addCommentToTrack} : any){
    const [isOpen, setIsOpen] = useState(false)
    const [comment, setComment] = useState({text: "", author: "", date: ""})

    function handleMenu(){
        if (window.confirm("Close without saving?")){
            setIsOpen(false)
        }
    }

    function getComment(event : any){
        const commentObj = {text: event.target.value, author: user.id, date: new Date().toString()}
        setComment(commentObj)
    }

    async function saveComment(){
      if (window.confirm("Ready to post your comment?")) {
        const result = await addCommentToTrack(track, comment)
        console.log(result)
        setIsOpen(true)
      }
    }
    
    return <div>
        <button className={styles.button} onClick={() => setIsOpen(!isOpen)}> <FaRegCommentDots/></button>
    <Popup
          closeOnDocumentClick={false}
          nested
          open={isOpen}
        >
            <div className={styles.modal}>
              <button className={styles.close} onClick={handleMenu}>
                &times;
              </button>
              <div className={styles.header}>{track.name} - {track.artist}</div>
              <div className={styles.content}>
                {' '}
                <textarea name="name" onBlur={getComment} placeholder="Leave a comment" defaultValue={comment.text}></textarea>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.save_button}
                  onClick={saveComment}
                >
                  <BiCommentAdd/>
                </button>
              </div>
            </div>
        </Popup>
    </div>
}