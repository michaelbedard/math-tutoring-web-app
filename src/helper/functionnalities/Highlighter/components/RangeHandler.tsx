import React, { useEffect, useState } from 'react';
import ButtonHandler from './ButtonHandler';
import {HighlightType} from "../../../entities/HighlightRelated";
import {serializedToRange} from "../../../../utils/HighlightsRelated/serializedToRange";
import {GetNewHighlightsFromExistingOnes} from "../../../../utils/HighlightsRelated/getNewHighlightsFromExistingOnes";
import axios from "axios";
import {axiosGetHighlightList, axiosPutHighlight} from "../../../../services/TabRelated";

type RangeHandlerProps = {
    children: React.ReactNode;
    location: number;
}

const RangeHandler = ({ children, location}: RangeHandlerProps) => {
    const [highlights, setHighlights] = useState<HighlightType[]>([]);


    useEffect(() => {
        const fetchHighlightTexts = async () => {
            const list: HighlightType[] = await axiosGetHighlightList(location);
            setHighlights(list);
        };

        fetchHighlightTexts();
    }, [location]);

    useEffect(() => {
        const performDOMManipulation = () => {
            for (const highlight of highlights) {
                console.log("hchsvjh")
                console.log(highlight);
                const range = serializedToRange(highlight.startOffset, highlight.endOffset);
                const span = document.createElement('span');
                span.style.backgroundColor = highlight.style.toLowerCase();

                const fragment = range.extractContents();
                span.appendChild(fragment);
                range.insertNode(span);
            }
        };

        if (document.readyState === 'complete') {
            performDOMManipulation();
        } else {
            const handleReadyStateChange = () => {
                if (document.readyState === 'complete') {
                    performDOMManipulation();
                    document.removeEventListener('readystatechange', handleReadyStateChange);
                }
            };

            document.addEventListener('readystatechange', handleReadyStateChange);

            return () => {
                document.removeEventListener('readystatechange', handleReadyStateChange);
            };
        }
    }, [highlights]);

    const saveNewHighlights = (newHighlightsArray: HighlightType[]) => {
        console.log(location)
        axiosPutHighlight(location, newHighlightsArray)
    };

    const highlightSelection = (newHighlight: HighlightType, save: boolean) => {
        let i = 0;

        setHighlights((prevHighlights) => {
            console.log('iiiiiiiiiiiiiiiiiiiiiii' + i);
            i++;
            console.log('-- setHighlights --');
            removeAllHighlights();
            const newHighlightsSet = GetNewHighlightsFromExistingOnes(prevHighlights, newHighlight);
            const newHighlightsArray = Array.from(newHighlightsSet);

            if (save && i === 1) {
                console.log('SAVE: ' + JSON.stringify(newHighlightsArray));
                saveNewHighlights(newHighlightsArray);
            }

            newHighlightsArray.forEach((highlight) => {
                const range = serializedToRange(highlight.startOffset, highlight.endOffset);
                const span = document.createElement('span');
                span.style.backgroundColor = highlight.style.toLowerCase();

                const fragment = range.extractContents();
                span.appendChild(fragment);
                range.insertNode(span);
            });

            return newHighlightsArray; // Return the new highlights as the updated state value
        });
    };

    const removeAllHighlights = () => {
        const existingHighlights = document.querySelectorAll('span[style*="background-color"]');
        existingHighlights.forEach((highlight) => {
            const parent = highlight.parentNode as Node;
            while (highlight.firstChild) {
                parent.insertBefore(highlight.firstChild, highlight);
            }
            parent.removeChild(highlight);
        });
    };

    return (
        <div>
            <ButtonHandler highlightSelection={highlightSelection}>
                {children}
            </ButtonHandler>
        </div>
    );
};

export default RangeHandler;
