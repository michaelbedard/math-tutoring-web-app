import { createContext } from "react";
import {NoteLabelType} from "../entities/NotesRelated";
import NombreChiffres from "../../views-notes/secondary-1/arithmetique/Nombre&Chiffres";
import NombreNaturel from "../../views-notes/secondary-1/arithmetique/NombreNaturels";
import TempNote from "../../views-notes/tempNote";
import Algebre1 from "../../views-notes/secondary-1/algebre/Algebre-1";

export const NoteLabels_Sec1 = createContext<NoteLabelType[]>([
    {label: "Nombre & Chiffres", category: "arithmetique", noteKey:101, component:NombreChiffres},
    {label: "Nombre Naturel", category: "arithmetique", noteKey:102, component:NombreNaturel},
    {label: "Nombre entiers", category: "arithmetique", noteKey:103, component:TempNote},

    {label: "algebre 1", category: "algebre", noteKey:121, component:Algebre1},
    {label: "algebre 2", category: "algebre", noteKey:122, component:TempNote},
    {label: "algebre 3", category: "algebre", noteKey:123, component:TempNote}
]);

