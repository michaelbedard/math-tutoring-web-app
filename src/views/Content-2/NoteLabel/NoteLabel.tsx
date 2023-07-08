import {useState} from "react";
import {axiosPutStar} from "../../../services/TabRelated";

type NoteLabelProps = {
    handleNoteClick: (noteKey: number) => void;
    noteKey: number,
    label: string
    hasStar: boolean
}
const NoteLabel = ({handleNoteClick, noteKey, label, hasStar}: NoteLabelProps) => {
    const [star, setStar] = useState(hasStar)

    function handleStarClick() {
        console.log("start")
        axiosPutStar(noteKey, !star);
        setStar(!star)
        console.log("start")
    }

    return (
        <div onClick={() => handleNoteClick(noteKey)}>
            <span>
                {label}
            </span>
            <span style={{padding: "5px", backgroundColor: "gold"}} onClick={() => handleStarClick()}>
                {star ? "yes" : "no"}
            </span>
        </div>
    )
}

export default NoteLabel