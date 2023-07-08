import {reduce} from "./reduce";


export function getOperationOnBothSides(lastStep: string, selectText: string, inputText: string)
    : {status: "ERROR" | "OK", text: string} {
    const operatorRegex = /[+\-*/]/;
    const numberRegex = /-?\d+(\.\d+)?/g;

    const matches = inputText.match(operatorRegex);
    if (!matches || matches.length > 1) {
        return {status: "ERROR", text: "invalid number of operator"}
    }

    const operator = matches[0];
    const numberMatches = inputText.match(numberRegex);
    console.log(numberMatches)
    if (!numberMatches || numberMatches.length > 1) {
        return {status: "ERROR", text: "invalid number of numbers"}
    }
    let number = numberMatches[0];

    if (operator === "-") {
        number = number.replaceAll("-", "")
    }

    const lastStepParts = lastStep.split("=")
    console.log(`(${lastStepParts[0]})${operator}${number}`)


    const firstPart = reduce(lastStepParts[0], inputText, true)
    const secondPart = reduce(lastStepParts[1], inputText, true)

    return {status: "OK", text:
            `${firstPart}=${secondPart}`}

}