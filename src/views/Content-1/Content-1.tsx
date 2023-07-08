import "./Content-1.css"
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import NoteCard from "./components/NoteCard/NoteCard";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {NoteLabels_Sec1} from "../../helper/constants/NoteLabelsSec-1";
import {NoteLabelType} from "../../helper/entities/NotesRelated";
import {NoteLabels_Sec2} from "../../helper/constants/NoteLabelsSec-2";

const Content1 = () => {
    const sec1 = useContext<NoteLabelType[]>(NoteLabels_Sec1);
    const sec2 = useContext<NoteLabelType[]>(NoteLabels_Sec2);
    const navigate = useNavigate()

    function handleNoteClick(noteKey: number) {
        const newUrl = `/note-de-cours/${noteKey}`;
        navigate(newUrl);
    }

    const allNotes = sec1.concat(sec2)

    return (
        <div className={"content-1__background-container"}>
            <Header />
            <h1 className={"content-1__title"}>NOTE DE COURS</h1>
            <div className={"content-1__search-bar"}>
                <SearchBar
                    items={allNotes}
                    displayField1={"label"}
                    displayField2={"category"}
                    onItemClick={(item: NoteLabelType) => handleNoteClick(item.noteKey)}
                />
            </div>

            {/*the following contains all the notes in one grid so that the slider effect affect everything at one*/}
            <div className={"content-1__grid-container"}>
                <div className={"content-1__grid-content"}>
                    <div>
                        <div>image</div>
                        <h3>Arithmetique</h3>
                    </div>
                    <div>
                        <div>image</div>
                        <h3>Algebra</h3>
                    </div>
                    <div>
                        <div>image</div>
                        <h3>XXX</h3>
                    </div>
                    <div>
                        <div>image</div>
                        <h3>YYY</h3>
                    </div>
                    <div>
                        <div>image</div>
                        <h3>ZZZ</h3>
                    </div>

                    {/*the following represent each combination of level header and notes*/}
                    <div className="content-1__title sec-1">
                        <h1>Secondaire 1</h1>
                    </div>
                    {["arithmetique", "algebre", "other"].map((category, index) => (
                        <NoteCard
                            labelList={sec1.filter((note) => note.category === category)}
                        />
                    ))}

                    <div className="content-1__title sec-2">
                        <h1>Secondaire 2</h1>
                    </div>
                    {["arithmetique", "algebre", "other"].map((category, index) => (
                        <NoteCard
                            labelList={sec2.filter((note) => note.category === category)}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Content1