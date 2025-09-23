import { CiEdit } from "react-icons/ci"
import Image from "next/image"
import Song from "../song"
import { playlistDataType, spotifyUserType } from "@/data/types"
import styles from "@/styles/playlist.module.css"
import { v4 as uuidv4 } from "uuid"
import { BsSpotify } from "react-icons/bs"
import Link from "next/link"
import { useRouter } from "next/router";
import { BsTrash } from "react-icons/bs";

type propsObj = {
  user: spotifyUserType;
  playlist: playlistDataType;
  deletePlaylist: Function;
  removeCommentFromTrack: Function;
}

/** Full playlist view, displaying all the main details, comments and links to edit view and each track's individual page */
export default function Playlist({ user, playlist, deletePlaylist, removeCommentFromTrack }: propsObj) {
  const router = useRouter()

            rel="noreferrer"
    </div>
  </div>
}