import React, { useEffect } from 'react';

interface SelectionHandlerProps {
    children: React.ReactNode;
    createControlButtons: (range: Range) => void;
}

const SelectionHandler = ({ children, createControlButtons }: SelectionHandlerProps) => {
    useEffect(() => {
        const wrapper = document.querySelector('#wrapper') as HTMLElement;
        wrapper.addEventListener('mouseup', handleSelection);

        return () => {
            wrapper.removeEventListener('mouseup', handleSelection);
        };
    }, []);

    const handleSelection = () => {
        const selection = window.getSelection();
        const selectedText = selection?.toString();

        if (selectedText !== '') {
            const range = selection?.getRangeAt(0);
            if (range && isSelectionValid(range)) {
                createControlButtons(range);
            }
        }
    };

    const isSelectionValid = (range: Range) => {
        let startContainer = range.startContainer as Node;
        let endContainer = range.endContainer as Node;
        const commonAncestor = range.commonAncestorContainer;

        let startParentNode = startContainer.parentNode as HTMLElement;
        while (
            (startParentNode.tagName === 'SPAN' && startParentNode.style.backgroundColor !== '') ||
            startParentNode.tagName === 'A'
            ) {
            console.log('PARENT');
            startContainer = startParentNode;
            startParentNode = startParentNode.parentNode as HTMLElement;
        }

        let endParentNode = endContainer.parentNode as HTMLElement;
        while (
            (endParentNode.tagName === 'SPAN' && endParentNode.style.backgroundColor !== '') ||
            endParentNode.tagName === 'A'
            ) {
            console.log('PARENT');
            endContainer = endParentNode;
            endParentNode = endParentNode.parentNode as HTMLElement;
        }

        if (
            commonAncestor.nodeType === Node.ELEMENT_NODE &&
            (commonAncestor !== startContainer.parentNode || commonAncestor !== endContainer.parentNode)
        ) {
            return false;
        }
        return true;
    };

    return (
        <div id="wrapper">
            {children}
        </div>
    );
};

export default SelectionHandler;
