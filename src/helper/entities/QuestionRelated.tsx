export type QuestionType = {
    questionText: string,
    image: string,
    variables: VariableType[],
    steps: (EquationStepType | GraphStepType | UnitsChangeStepType)[]
}

export type VariableType = {
    name: string,
    units: string,
    min: number,
    max: number,
    type: string
}
export type EquationStepType = {
    name: string,
    id: number,
    equation: EquationType,
    useCase: string,
    variablesUseByName: string[],
    variableCreatedByName: string,
    type: string
}

export type GraphStepType = {
    name: string,
    id: number,
    type: string
}

export type UnitsChangeStepType = {
    name: string,
    id: number,
    units: string,
    type: string
}

export type Unit = {
    symbol: string,
}

export type EquationType = {
    name: string,
    formula: string
    variables: EquationVariable[],
}

export type EquationVariable = {
    positionIndex: number,
    units: Unit,
    label: string
    similarIndex: number[],

}