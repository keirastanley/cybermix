import { useState } from "react";
import Popup from "reactjs-popup"

export default function ModalPopup({playlist, updatePlaylistDetails, saveUpdates} : any){
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
        <button className="button" onClick={() => setIsOpen(!isOpen)}> Edit </button>
    <Popup
          closeOnDocumentClick={false}
          nested
          open={isOpen}
        >
            <div className="modal">
              <button className="close" onClick={handleMenu}>
                &times;
              </button>
              <div className="header"> Edit details </div>
              <div className="content">
                {' '}
                <input defaultValue={playlist.name} name="name" onBlur={updatePlaylistDetails}></input>
                <br />
                <input defaultValue={playlist.description} name="description" onBlur={updatePlaylistDetails}></input>
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    savePlaylistUpdates()
                  }}
                >
                  Save
                </button>
              </div>
            </div>
        </Popup>
    </div>
}