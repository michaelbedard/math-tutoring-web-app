import {EquationType} from "../../helper/entities/QuestionRelated";
import {DefVariableType} from "../../helper/entities/AnswerRelated";


export function getInitialResolvedStep(equation: EquationType | null, variablesUsed: (DefVariableType | null)[]) {
    if (equation === null){
        return "";
    }

    const formulaParts = equation.formula.split(/\[([^\]]+)]/);
    const firstStep = formulaParts.map((formulaPart, index) => {
        const isPlaceholder = index % 2 === 1;
        if (isPlaceholder) {
            const placeholderIndex = Math.floor(index / 2);
            if (variablesUsed[placeholderIndex] !== null) {
                return variablesUsed[placeholderIndex]?.value
            } else {
                return equation.variables[placeholderIndex].label
            }
        } else {
            return formulaPart
        }
    })
    return firstStep.join("");
}