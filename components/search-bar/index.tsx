import { BsSearch } from "react-icons/bs"
import styles from "@/styles/search_bar.module.css"
import { ChangeEventHandler, KeyboardEventHandler } from "react";

type propsObj = {
    changeFunction: ChangeEventHandler<HTMLInputElement>;
    keyFunction: KeyboardEventHandler<HTMLInputElement>;
    placeholder: string;
}

/** An input and search icon that executes a function on press of "Enter" key */
export default function SearchBar({changeFunction, keyFunction, placeholder} : propsObj) {
    return <div className={styles.search_input_section}>
            <input
                onChange={changeFunction}
                onKeyDown={keyFunction}
                placeholder={placeholder}
            >
            </input>
            <BsSearch />
        </div>
}