import React, {useEffect} from "react";

type SolverProps = {
    children: React.ReactNode;
    handleSubmit: (selectedText: string, inputText: string) => void;
}

const Solver = ({children, handleSubmit}: SolverProps) => {
    useEffect(() => {
        const wrapper = document.querySelector('#solver-wrapper') as HTMLElement;
        wrapper.addEventListener('mouseup', handleSelection);

        return () => {
            wrapper.removeEventListener('mouseup', handleSelection);
        };
    }, []);

    function handleSelection() {
        const selection = window.getSelection();
        const selectedText = selection?.toString();
        const range = selection?.getRangeAt(0);

        if (range !== undefined && selectedText !== undefined && selectedText !== '') {
            console.log(selectedText);
            createInput(selectedText, handleSubmit)

            const newInput = createInput(selectedText, handleSubmit);
            newInput.setAttribute('placeholder', "enter text");
            newInput.style.position = 'absolute';
            newInput.style.top = `${range?.getBoundingClientRect().top + 20}px`;
            newInput.style.left = `${range?.getBoundingClientRect().left}px`;
            document.body.appendChild(newInput);
        }
    }

    return (
        <div id="solver-wrapper">
            {children}
        </div>
    )
}

function createInput (selectedText: string, handleSubmit: (selectedText: string, inputText: string) => void) {
    const input = document.createElement('input');

    const changeHandler = () => {
        if (input.parentNode) {
            const selection = window.getSelection();
            selection?.removeAllRanges();

            input.removeEventListener('change', changeHandler);
            input.removeEventListener("keydown", enterKeyHandler)
            document.removeEventListener('click', documentClickHandler);
            input.parentNode.removeChild(input);
        }
    };

    const documentClickHandler = (event: MouseEvent) => {
        event.stopPropagation();

        const target = event.target as HTMLElement;
        if (target !== input && input.parentNode) {
            const selection = window.getSelection();
            selection?.removeAllRanges();

            input.removeEventListener('change', changeHandler);
            input.removeEventListener("keydown", enterKeyHandler)
            document.removeEventListener('click', documentClickHandler);
            input.parentNode.removeChild(input);
        }
    };

    const enterKeyHandler = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(selectedText, input.value);

            input.removeEventListener('change', changeHandler);
            input.removeEventListener("keydown", enterKeyHandler)
            document.removeEventListener('click', documentClickHandler);
            // @ts-ignore
            input.parentNode.removeChild(input);
        }
    };

    setTimeout(() => {
        input.addEventListener('change', changeHandler);
        setTimeout(() => {
            document.addEventListener('click', documentClickHandler);
            input.addEventListener("keydown", enterKeyHandler);
        }, 0);
    }, 0);

    return input;
};

export default Solver
