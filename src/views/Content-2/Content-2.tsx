import {useContext, useEffect, useState} from "react";
import {NoteLabelType} from "../../helper/entities/NotesRelated";
import {NoteLabels_Sec1} from "../../helper/constants/NoteLabelsSec-1";
import {NoteLabels_Sec2} from "../../helper/constants/NoteLabelsSec-2";
import {NoteLabels_Sec3} from "../../helper/constants/NoteLabelsSec-3";
import {NoteLabels_Sec5} from "../../helper/constants/NoteLabelsSec-5";
import {NoteLabels_Sec4} from "../../helper/constants/NoteLabelsSec-4";
import Header from "../../components/Header/Header";
import PageNotFound from "../Z-PageNotFound/PageNotFound";

import "./Content-2.css"
import {useNavigate} from "react-router-dom";
import Highlighter from "../../helper/functionnalities/Highlighter/Highlighter";
import {axiosGetStarList} from "../../services/TabRelated";
import NoteLabel from "./NoteLabel/NoteLabel";

const emptyNoteLabel: NoteLabelType = {label: "", category: "other", noteKey: 0, component: PageNotFound}

interface NoteLabelCard {
    label: string,
    noteKey: number;
    hasStar: boolean
}

const Content2 =() => {
    const navigate = useNavigate()
    const [activeNote, setActiveNote] = useState<NoteLabelType>(emptyNoteLabel)

    const [activeAccordion, setActiveAccordion] = useState<number | null>(null)
    const [activeNoteLabel, setActiveNoteLabel] = useState<NoteLabelCard[]>([]);
    const [specialNoteLabel, setSpecialNoteLabel] = useState<number[]>([])

    const sec1 = useContext<NoteLabelType[]>(NoteLabels_Sec1);
    const sec2 = useContext<NoteLabelType[]>(NoteLabels_Sec2);
    const sec3 = useContext<NoteLabelType[]>(NoteLabels_Sec3);
    const sec4 = useContext<NoteLabelType[]>(NoteLabels_Sec4);
    const sec5 = useContext<NoteLabelType[]>(NoteLabels_Sec5);

    useEffect(() => {
        const parsedUrl = window.location.href.split("/");
        const noteKey = parseInt(parsedUrl[parsedUrl.length - 1]) //last past is the category
        if (noteKey > 100 && noteKey < 200) {
            setActiveNote(sec1.find((note) => note.noteKey === noteKey) || emptyNoteLabel);
        } else if (noteKey > 200 && noteKey < 300) {
            setActiveNote(sec2.find((note) => note.noteKey === noteKey) || emptyNoteLabel);
        } else if (noteKey > 300 && noteKey < 400) {
            setActiveNote(sec3.find((note) => note.noteKey === noteKey) || emptyNoteLabel);
        } else if (noteKey > 400 && noteKey < 500) {
            setActiveNote(sec4.find((note) => note.noteKey === noteKey) || emptyNoteLabel);
        } else if (noteKey > 500 && noteKey < 600) {
            setActiveNote(sec5.find((note) => note.noteKey === noteKey) || emptyNoteLabel);
        } else {
            setActiveNote(emptyNoteLabel);
        }
    }, [handleNoteClick])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const list: { tabKey: number, starFlag: boolean }[] = await axiosGetStarList();

                let newSpecialNoteLabel = [];
                for (const item of list) {
                    if (item.starFlag) {
                        newSpecialNoteLabel.push(item.tabKey)
                    }
                }
                setSpecialNoteLabel(newSpecialNoteLabel);
            } catch (error) {
                console.log(error);
                // Handle the error
            }
        };
        fetchData()
    }, [])

    function toggle (i: number, category: string) {
        console.log(specialNoteLabel)

        let newActiveNoteLabel: NoteLabelCard[] = []
        const common = sec1.filter((note) => note.category === category && !specialNoteLabel.includes(note.noteKey))
        for (const item of common) {
            newActiveNoteLabel.push({label: item.label, noteKey: item.noteKey, hasStar: false})
        }
        const specialCurrLevel = sec1.filter((note) => note.category === category && specialNoteLabel.includes(note.noteKey))
        for (const item of specialCurrLevel) {
            newActiveNoteLabel.push({label: item.label, noteKey: item.noteKey, hasStar: true})
        }
        const secAll = sec2.concat(sec3, sec4, sec5)
        const specialOtherLevel = secAll.filter((note) => note.category === category && specialNoteLabel.includes(note.noteKey))
        for (const item of specialOtherLevel) {
            newActiveNoteLabel.push({label: item.label, noteKey: item.noteKey, hasStar: true})
        }

        console.log(newActiveNoteLabel)
        setActiveNoteLabel(newActiveNoteLabel);

        if (activeAccordion === i) {
            return setActiveAccordion(null)
        }
        setActiveAccordion(i)
        return i;
    }

    function handleNoteClick(noteKey: number) {
        navigate(`/note-de-cours/${noteKey}`)
    }


    return (
        <div className={"content-2__background-container"}>
            <Header />
            <div className={"content-2__grid-container"}>
                <div className={"content-2__note-panel"}>
                    <div>
                        <a href={"/note-de-cours"}>back</a>
                    </div>
                    <div className={"content-2__accordion"}>
                        {["arithmetique", "algebre", "other"].map((category, index) => (
                            <div className={"content-2__accordion--item"} key={index}>
                                <div className={"content-2__accordion--title"} onClick={() => toggle(index, category)}>
                                    {category}
                                    <span>{activeAccordion === index ? "-" : "+"}</span>
                                </div>
                                <div className={activeAccordion === index ? "content-2__accordion--content show" : "content-2__accordion--content"}>
                                    {activeNoteLabel.map((noteLabel, labelIndex) => (
                                            <NoteLabel
                                                key={labelIndex}
                                                handleNoteClick={(noteKey) => handleNoteClick(noteKey)}
                                                noteKey={noteLabel.noteKey}
                                                label={noteLabel.label}
                                                hasStar={noteLabel.hasStar}
                                            />
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={"content-2__note-view"}>
                    <Highlighter location={activeNote.noteKey}>
                        {activeNote.component()}
                    </Highlighter>
                </div>
            </div>
        </div>
    )
}

export default Content2