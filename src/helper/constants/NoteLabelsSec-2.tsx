import {createContext} from "react";
import {NoteLabelType} from "../entities/NotesRelated";
import TempNote from "../../views-notes/tempNote";


export const NoteLabels_Sec2 = createContext<NoteLabelType[]>([
    {label: "Nombre & Chiffres 2", category: "arithmetique", noteKey:201, component:TempNote},
    {label: "Nombre Naturel 2", category: "arithmetique", noteKey:202, component:TempNote},
    {label: "Nombre entiers 2", category: "arithmetique", noteKey:203, component:TempNote},

    {label: "algebre 1 2", category: "algebre", noteKey:221, component:TempNote},
    {label: "algebre 2 2", category: "algebre", noteKey:222, component:TempNote},
    {label: "algebre 3 2", category: "algebre", noteKey:223, component:TempNote}
]);

