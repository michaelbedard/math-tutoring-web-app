import React from 'react';
import SelectionHandler from './SelectionHandler';
import {HighlightType} from "../../../entities/HighlightRelated";
import {rangeToSerialized} from "../../../../utils/HighlightsRelated/rangeToSerialized";

interface ButtonHandlerProps {
    children: React.ReactNode;
    highlightSelection: (highlight: HighlightType, flag: boolean) => void;
}

const ButtonHandler= ({ children, highlightSelection}: ButtonHandlerProps) => {
    const createControlButtons = (range: Range) => {
        const yellowBtn = createButton(range, 'YELLOW');
        yellowBtn.textContent = 'YELLOW';
        yellowBtn.style.position = 'absolute';
        yellowBtn.style.top = `${range.getBoundingClientRect().top}px`;
        yellowBtn.style.left = `${range.getBoundingClientRect().left}px`;
        document.body.appendChild(yellowBtn);

        const blueBtn = createButton(range, 'BLUE');
        blueBtn.textContent = 'BLUE';
        blueBtn.style.position = 'absolute';
        blueBtn.style.top = `${range.getBoundingClientRect().top}px`;
        blueBtn.style.left = `${range.getBoundingClientRect().left + yellowBtn.offsetWidth}px`; // Add offset for the second button
        document.body.appendChild(blueBtn);

        const deleteBtn = createButton(range, 'DELETE');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.position = 'absolute';
        deleteBtn.style.top = `${range.getBoundingClientRect().top}px`;
        deleteBtn.style.left = `${range.getBoundingClientRect().left + yellowBtn.offsetWidth + blueBtn.offsetWidth}px`; // Add offset for the third button
        document.body.appendChild(deleteBtn);
    };

    const createButton = (range: Range, style: string) => {
        const button = document.createElement('button');
        console.log('createButton : ' + style);

        const clickHandler = () => {
            console.log('BUTTON CLICK');

            if (button.parentNode) {
                const d = rangeToSerialized(range);
                const newHighlight: HighlightType = {
                    startOffset: d[0],
                    endOffset: d[1],
                    style: style,
                };

                highlightSelection(newHighlight, true);

                const selection = window.getSelection();
                selection?.removeAllRanges();

                button.removeEventListener('click', clickHandler);
                document.removeEventListener('click', documentClickHandler);
                button.parentNode.removeChild(button);
            }
        };

        const documentClickHandler = (event: MouseEvent) => {
            event.stopPropagation();

            const target = event.target as HTMLElement;
            if (target !== button && button.parentNode) {
                const selection = window.getSelection();
                selection?.removeAllRanges();

                button.removeEventListener('click', clickHandler);
                document.removeEventListener('click', documentClickHandler);
                button.parentNode.removeChild(button);
            }
        };

        setTimeout(() => {
            button.addEventListener('click', clickHandler);
            setTimeout(() => {
                document.addEventListener('click', documentClickHandler);
            }, 0);
        }, 0);

        return button;
    };

    return (
        <SelectionHandler children={children} createControlButtons={createControlButtons} />
    );
};

export default ButtonHandler;
