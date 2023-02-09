import { useEffect, useState } from "react";
import Popup from "reactjs-popup"
import styles from "@/styles/popup-styles/access_popup.module.css"
import {AiOutlineCheckCircle} from "react-icons/ai"
import {IoIosAddCircleOutline} from "react-icons/io"
import Access from "../../access";
import { spotifyUserType } from "@/data/types";
import LoadingIcons from "react-loading-icons";

type propsObj = {
    initialAccess: string[];
    user: spotifyUserType;
    grantAccess: Function;
}

/** Popup menu to allow users to grant or remove access to their playlist to other Spotify users */
export default function AccessPopup({initialAccess, user, grantAccess} : propsObj){
    const [isOpen, setIsOpen] = useState(false)
    const [access, setAccess] = useState<string[]>(initialAccess)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log("hi", access)
    }, [access])

    function handleMenu(){
        if (window.confirm("Close without saving?")){
            setIsOpen(false)
        }
    }

    async function handleAddAccess() {
        if (window.confirm("Save changes?")) {
          setLoading(true)
          for (let i = 0; i < access.slice(1).length; i++) {
              await grantAccess(access.slice(1)[i])
          }
          setLoading(false)
          setIsOpen(false)
        }
    }
    
    return <div>
        <button className={styles.button} onClick={() => setIsOpen(!isOpen)}> <IoIosAddCircleOutline/></button>
        {loading ? <LoadingIcons.TailSpin color="black"/> : 
          <Popup
            closeOnDocumentClick={false}
            nested
            open={isOpen}
          >
            <div className={styles.modal}>
              <button className={styles.close} onClick={handleMenu}>
                &times;
              </button>
              <div className={styles.content}>
                <Access currentUser={user} access={access} setAccess={setAccess}/>
                <button
                  className={styles.save_button}
                  onClick={handleAddAccess}
                >
                  <AiOutlineCheckCircle/>
                </button>
              </div>
            </div>
        </Popup>}
    </div>
}