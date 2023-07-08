import { evaluate } from 'mathjs';
import {reduce} from "./reduce";

export function getSimplifyExpressionResponse(
    lastStep: string,
    selectText: string,
    inputText: string)
    : {status: ("ERROR" | "OK"), text: string} {

    // check if selection is valid
    let response = validateSelectText(lastStep, selectText)
    if (response.status === "ERROR") {
        return response
    }

    // check if input is valid
    response = validateInput(inputText)
    if (response.status === "ERROR") {
        return response
    }

    // validate result
    const result = evaluate(selectText);
    console.log("math js : " + selectText + " / " + result)
    if (result.toString() !== inputText) {
        return {status: "ERROR", text: "wrong answer"}
    }

    const addStepParts = lastStep.replaceAll(selectText, inputText).split("=")
    const firstPart = reduce(addStepParts[0], inputText, false)
    const secondPart = reduce(addStepParts[1], inputText, false)

    return {status: "OK", text: `${firstPart}=${secondPart}`}
}

function validateSelectText(lastStep: string, selectText: string): {status: ("ERROR" | "OK"), text: string} {
    const startIndex = lastStep.indexOf(selectText);
    let start = {index: startIndex, leftOperator: '', rightOperator: ''}
    let end = {index: startIndex + selectText.length - 1, leftOperator: '', rightOperator: ''}

    //check if selectText starts and end with a letter, number or a parenthesis
    let char = lastStep[start.index];
    if (/^[A-Za-z]$/.test(char)) {
        start.rightOperator = "LETTER"
    } else if (/^\d$/.test(char)) {
        start.rightOperator = (() => {
            for (let i = start.index + 1; i < selectText.length; i++) {
                const char = selectText[i];
                if (!/\d|\./.test(char)) {
                    return char;
                }
            }
            return "VOID";
        })();
    } else if (char === '(') {
        start.rightOperator = "("
    } else {
        return {status: "ERROR", text: "invalid start index selection"}
    }

    char = lastStep[end.index];
    console.log(char)
    if (/^\d$/.test(char)) {
        end.leftOperator = (() => {
            for (let i = end.index + 1; i < selectText.length; i--) {
                const char = selectText[i];
                if (!/\d|\./.test(char)) {
                    return char;
                }
            }
            return "VOID";
        })();
    } else if (char === ')') {
        end.leftOperator = ")"
    } else {
        return {status: "ERROR", text: "invalid end index selection"}
    }

    // check if there are same number of ( and ) inside selection
    let count = 0;
    for (let i = 0; i < selectText.length; i++) {
        if (selectText[i] === '(') {
            count += 1
        } else if (selectText[i] === ')') {
            count -= 1
        }
    }
    if (count > 0) {
        return {status: "ERROR", text: "missing a closing parenthesis inside selection"}
    } else if (count < 0) {
        return {status: "ERROR", text: "missing an opening parenthesis inside selection"}
    }

    //check if operation is valid
    if (start.index === 0){
        start.leftOperator = "VOID"
    } else {
        start.leftOperator = lastStep[start.index - 1];
    }

    if (toLevel(start.leftOperator) > toLevel(start.rightOperator)) {
        return {status: "ERROR", text: "invalid operation (left side error)"}
    }

    if (end.index === lastStep.length - 1){
        end.rightOperator = "VOID"
    } else {
        end.rightOperator = lastStep[end.index + 1];
    }

    if (toLevel(end.leftOperator) < toLevel(end.rightOperator)) {
        return {status: "ERROR", text: "invalid operation (right side error)"}
    }

    return {status: "OK", text: ""}
}

function toLevel(char: string) {
    if (char === ("+" || "-")) {
        return 1;
    } else if (char === ("x" || "/")) {
        return 2;
    } else if (char === ("^")) {
        return 3;
    } else {
        return 0;
    }
}

function validateInput(input: string): {status: ("ERROR" | "OK"), text: string} {
    const pattern = /^-?\d*\.?\d*$/;

    if (!pattern.test(input)) {
        return { status: "ERROR", text: "Invalid input text" };
    }

    return { status: "OK", text: "" };
}