import * as repl from "repl";

interface item {
    type: "OPEN" | "CLOSE" | "GROUND"
    index: number
    level: number
    operatorList: operator[]
}
interface operator {
    symbol: string
    index: number
}
interface lowestItemList {
    level: number;
    lowest: item[]
}

export function reduce(expression: string, input: string, replace: boolean) {
    let stack: item[] = [];
    let deleteList = []
    let lowestItemList = {level: 0, lowest: []} as lowestItemList

    for (let i=0; i < expression.length; i++) {
        const char = expression[i];

        if (char === "(") {
            if (stack.length !== 0) {
                const lastItem = stack[stack.length - 1];
                if (lastItem.type === "GROUND") {
                    if (lowestItemList.level === 0) { //is ground
                        lowestItemList.lowest.push(lastItem)
                    } else {
                        lowestItemList = {level: 0, lowest: [lastItem]}
                    }
                    stack.pop();
                }
            }
            stack.push ({
                type: 'OPEN',
                index: i,
                level: stack.length === 0 ? 1 : stack[stack.length - 1].level + 1,
                operatorList: [],
            });
        } else if (i === expression.length - 1 && char !== ")") {
            if (stack.length !== 0) {
                const lastItem = stack[stack.length - 1];
                if (lastItem.type === "GROUND") {
                    if (lowestItemList.level === 0) { //is ground
                        lowestItemList.lowest.push(lastItem)
                    } else {
                        lowestItemList = {level: 0, lowest: [lastItem]}
                    }
                    stack.pop()
                }
            }
        } else if (char === ")") {
            const lastItem = stack[stack.length - 1];
            if (lastItem.operatorList.length === 0) {
                // no operators inside, delete
                deleteList.push(lastItem.index)
                deleteList.push(i)
            } else if (lastItem.level < lowestItemList.level || lowestItemList.lowest.length === 0) {
                lowestItemList = {level: lastItem.level, lowest: [lastItem]}
            } else if (lastItem.level === lowestItemList.level) {
                lowestItemList.lowest.push(lastItem)
            }
            stack.pop()
        } else if (char === "+" || char === "-" || char === "*" || char === "/" || char === "^") {
            if (stack.length === 0) { // we are at ground
                stack.push({type: "GROUND", level: 0, index: getCharToLeft(expression, i), operatorList:[{symbol: char, index: i}]})
            } else {
                const lastItem = stack[stack.length - 1];
                lastItem.operatorList.push({symbol: char, index: i})
            }

        }
        else if (/^[A-Za-z]$/.test(char)) {
            // // check if letter.  if so, compare substring
            // const subString = expression.slice(i, i+3);
            // if (subString === "cos" || subString === "sin" || subString === "tan") {
            //     if (stack.length === 0) { // we are at ground
            //         stack.push({type: "GROUND", level: 0, index: i, operatorList:[{symbol: subString, index: i}]})
            //     } else {
            //         const lastItem = stack[stack.length - 1];
            //         lastItem.operatorList.push({symbol: subString, index: i})
            //     }
            //     i = i + 3;
            // }
        } else {
            continue;
        }
    }

    // get list of symbol, keep only the lowest family.
    // then, remove unusefull parenthesis and update symbol index
    // then, separate expression into terms (with symbol at index before)
    // remove term if equal to the inverse input and combine everything togheter again

    for (const deleteIndex of deleteList.reverse()) {
        expression = expression.slice(0, deleteIndex) + expression.slice(deleteIndex + 1);
    }

    console.log(lowestItemList)

    if (replace) {
        let operatorList: operator[] = []
        let operatorLevel = 20;
        for (const item of lowestItemList.lowest) {
            for (const operator of item.operatorList) {
                const currLevel = getOperatorLevel(operator.symbol);
                if (currLevel === operatorLevel) {
                    operatorList.push(operator)
                } else if (currLevel < operatorLevel) {
                    operatorList = [operator]
                    operatorLevel = currLevel
                }
            }
        }

        console.log(operatorList)

        for (const operator of operatorList) {
            const subDeleteList = deleteList.filter((deleteIndex) => deleteIndex < operator.index)
            operator.index = operator.index - subDeleteList.length;
        }

        let terms: {substring: string, starIndex: number, endIndex: number}[] = []
        let end = expression.length;
        for (const operator of operatorList.reverse()) {
            const substring = expression.substring(operator.index, end)
            terms.push({substring: substring, starIndex: operator.index, endIndex: end})
            end = operator.index;

            if (operatorList.indexOf(operator) === operatorList.length - 1 && operator.index !== 0) { // at the front and do not start with operator
                let tempSubstring = expression.substring(0, end)
                if (operatorLevel === 0) {
                    tempSubstring = "+" + tempSubstring
                } else if (operatorLevel === 1) {
                    tempSubstring = "*" + tempSubstring
                } else if (operatorLevel === 2) {
                    tempSubstring = "^" + tempSubstring
                }
                terms.push({substring: tempSubstring, starIndex: 0, endIndex: end})
            }
        }

        console.log(terms)

        if (operatorLevel === 2) {
            terms = [terms[terms.length - 1]]
        }

        let foundMatch = false;
        for (const term of terms) {
            if (input === getInverseExpression(term.substring)) {
                console.log(getInverseExpression(term.substring))
                expression = expression.slice(0, term.starIndex) + expression.slice(term.endIndex);
                foundMatch = true;
                break;
            }
        }

        console.log(foundMatch)

        if (!foundMatch) {
            const level = getOperatorLevel(input[0]);
            if (level > operatorLevel) {
                expression = "(" + expression + ")" + input
            } else {
                expression = expression + input
            }
        }
    }

    if (expression[0] === "+" || expression[0] === "*" || expression[0] === "/") {
        expression = expression.slice(1, expression.length)
    }

    return expression
}

function getCharToLeft(str: string, index: number): number {
    for (let i = index - 1; i >= 0; i--) {
        const char = str[i];
        if (/[^\d.a-zA-Z]/.test(char)) { // not a letter, number or dot
            return i + 1;
        }
    }
    return 0; // If no character is found
}

const common_trigIdentities = [
    {symbol: "cos", inverse: "arccos"},
    {symbol: "sin", inverse: "arcsin"},
    {symbol: "tan", inverse: "arctan"},
]

function getOperatorLevel(operator: string): number {
    if (operator === "+" || operator === "-") {
        return 0;
    } else if (operator === "*" || operator === "/") {
        return 1;
    } else if (operator === "^") {
        return 2;
    }
    return 10;
}

function getInverseExpression(expression: string) {
    if (expression.includes("+")) {
        expression = expression.replace("+", "-")
    } else if (expression.includes("+")) {
        expression = expression.replace("-", "+")
    } else if (expression.includes("+")) {
        expression = expression.replace("*", "/")
    } else if (expression.includes("/")) {
        expression = expression.replace("/", "*")
    } else if (expression.includes("^")) {
        expression = expression.replace("^", "")
        expression = "log(" + expression + ")" // change
    }
    return expression;
}