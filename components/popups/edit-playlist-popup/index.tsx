import { useState } from "react";
import Popup from "reactjs-popup"
import styles from "@/styles/popup-styles/edit_playlist_popup.module.css"
import {VscSaveAs} from "react-icons/vsc"
import {CiEdit} from "react-icons/ci"

export default function EditPlaylistPopup({playlist, updatePlaylistDetails, saveUpdates} : any){
    const [isOpen, setIsOpen] = useState(false)

    function handleMenu(){
        if (window.confirm("Close without saving?")){
            setIsOpen(false)
        }
    }

    function savePlaylistUpdates(){
        const result = saveUpdates()
        if (result){
            setIsOpen(false)
        }
    }
    
    return <div>
        <button className={styles.button} onClick={() => setIsOpen(!isOpen)}> <CiEdit/> </button>
    <Popup
          closeOnDocumentClick={false}
          nested
          open={isOpen}
        >
            <div className={styles.modal}>
              <button className={styles.close} onClick={handleMenu}>
                &times;
              </button>
              <div className={styles.header}> Edit details </div>
              <div className={styles.content}>
                {' '}
                <input defaultValue={playlist.name} name="name" onBlur={updatePlaylistDetails} placeholder="Enter a name"></input>
                <br />
                <input defaultValue={playlist.description} name="description" onBlur={updatePlaylistDetails} placeholder="(Optional) Enter a description"></input>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.save_button}
                  onClick={() => {
                    savePlaylistUpdates()
                  }}
                >
                  <VscSaveAs/>
                </button>
              </div>
            </div>
        </Popup>
    </div>
}