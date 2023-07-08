import "./NoteCard.css"
import { useNavigate } from "react-router-dom";
import {NoteLabelType} from "../../../../helper/entities/NotesRelated";

type NoteCardProps = {
    labelList: NoteLabelType[]
}

const NoteCard =({labelList}: NoteCardProps) => {
    const navigate = useNavigate();

    function handleOnClick(noteKey: number) {
        const newUrl = `/note-de-cours/${noteKey}`;
        navigate(newUrl);

    }

    return (
        <div className={"note-card__container"}>
            <div>
                {labelList.map((labelItem, index) => (
                    <div
                        className={"note-card__container-item"}
                        onClick={() => handleOnClick(labelItem.noteKey)}
                    >
                        {labelItem.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NoteCard