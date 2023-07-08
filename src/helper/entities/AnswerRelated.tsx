import {EquationType, Unit} from "./QuestionRelated";


export type AnswerType = {
    answerStepList: (AnsEquationStepType | AnsGraphStepType)[];
}

export type AnsEquationStepType = {
    type: "EQUATION",
    label: string,
    id: number,
    state: "Untouched" | "Drop" | "Solving" | "Solved",
    equationUsed: EquationType | null;
    variablesUsed: (DefVariableType | null)[];
    resolvedSteps: string[];
}

export type AnsGraphStepType = {
    type: "GRAPH";
    label: string,
    id: number
}

export type DefVariableType = {
    value: number
    units: Unit
    status: "Ok" | "Danger"
}