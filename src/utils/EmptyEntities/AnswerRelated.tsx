import {AnsEquationStepType, DefVariableType} from "../../helper/entities/AnswerRelated";
import {EquationType} from "../../helper/entities/QuestionRelated";


export function EmptyAnsEquationStepType(label: string, index: number) {
    return {
        type: "EQUATION",
        label: label,
        id: index,
        state: "Untouched",
        equationUsed: null,
        variablesUsed: [],
        resolvedSteps: []
    } as AnsEquationStepType;
}