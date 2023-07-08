import RangeHandler from "./components/RangeHandler";
import React from "react";


type HighlighterProps = {
    children: React.ReactNode;
    location: number;
}

const Highlighter = ({ children, location }: HighlighterProps) => {
    return <RangeHandler children={children} location={location} />;
};

export default Highlighter;