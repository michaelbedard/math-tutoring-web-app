import React from "react";

export type NoteLabelType = {
    label: string,
    category: "arithmetique" | "algebre" | "other",
    noteKey: number,
    component: () => JSX.Element;
}