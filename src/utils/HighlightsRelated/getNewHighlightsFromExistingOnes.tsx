import {HighlightType} from "../../helper/entities/HighlightRelated";


export function GetNewHighlightsFromExistingOnes(
    highlights: HighlightType[],
    newHighlight: HighlightType
): HighlightType[] {
    let startOffset = newHighlight.startOffset;
    let endOffset = newHighlight.endOffset;
    const style = newHighlight.style;

    const newHighlights: HighlightType[] = [];

    console.log(
        'ENTER GetNewHighlightsFromExistingOnes with : ' +
        JSON.stringify(highlights) +
        ', ' +
        JSON.stringify(newHighlight)
    );

    for (const existingHighlight of highlights) {
        console.log(
            'ITERATION FOR existingHighlight : ' +
            existingHighlight.startOffset +
            ', ' +
            existingHighlight.endOffset +
            ' WITH newHighlight : ' +
            startOffset +
            ', ' +
            endOffset
        );

        if (
            existingHighlight.startOffset < startOffset &&
            endOffset < existingHighlight.endOffset
        ) {
            console.log('INSIDE');

            if (style === 'DELETE' || style !== existingHighlight.style) {
                newHighlights.push({
                    startOffset: existingHighlight.startOffset,
                    endOffset: startOffset,
                    style: existingHighlight.style,
                });
                newHighlights.push({
                    startOffset: endOffset,
                    endOffset: existingHighlight.endOffset,
                    style: existingHighlight.style,
                });
            } else {
                startOffset = endOffset; // make them equal to not push to the list
            }
        } else if (
            startOffset < existingHighlight.startOffset &&
            existingHighlight.endOffset < endOffset
        ) {
            console.log('OUTSIDE');

            // do not push current existingHighlight (always)
        } else if (
            existingHighlight.startOffset < startOffset &&
            startOffset < existingHighlight.endOffset
        ) {
            console.log('EXTENDS RIGHT');

            if (style === 'DELETE' || style !== existingHighlight.style) {
                newHighlights.push({
                    startOffset: existingHighlight.startOffset,
                    endOffset: startOffset,
                    style: existingHighlight.style,
                });
            } else {
                startOffset = existingHighlight.startOffset; // extends the offset range to highlight
            }
        } else if (
            existingHighlight.startOffset < endOffset &&
            endOffset < existingHighlight.endOffset
        ) {
            console.log('EXTENDS LEFT');

            if (style === 'DELETE' || style !== existingHighlight.style) {
                newHighlights.push({
                    startOffset: endOffset,
                    endOffset: existingHighlight.endOffset,
                    style: existingHighlight.style,
                });
            } else {
                endOffset = existingHighlight.endOffset; // extends the offset range to highlight
            }
        } else {
            // Keep the existing highlight
            newHighlights.push(existingHighlight);
        }
    }

    if (style !== 'DELETE' && startOffset !== endOffset) {
        console.log('END push : ' + startOffset + ', ' + endOffset + ', ' + style);
        newHighlights.push({
            startOffset,
            endOffset,
            style,
        });
    }

    console.log('END LIST : ' + JSON.stringify(newHighlights));

    return newHighlights;
}
