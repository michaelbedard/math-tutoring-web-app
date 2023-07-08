import React, {useState} from "react";
import Solver from "../../../../../../helper/functionnalities/Solver/Solver";
import {getOperationOnBothSides} from "../../../../../../utils/EquationStepRelated/getOperationOnBothSides";
import {getSimplifyExpressionResponse} from "../../../../../../utils/EquationStepRelated/getSimplifyExpressionResponse";

type SolvingComponentProps = {
    resolvedSteps: string[],
    setResolvedSteps: React.Dispatch<React.SetStateAction<string[]>>
}

const SolvingComponent = ({resolvedSteps, setResolvedSteps}: SolvingComponentProps) => {
    const [errorMessage, setErrorMessage] = useState<string>('')

    function handleSubmit(selectText:string, inputText: string) {
        let response: {status: (undefined | "ERROR" | "OK"), text: string} = {status: undefined, text: ''}

        if (selectText.includes("=")) {
            console.log("handleSubmit => operation on both sides : " + inputText)
            response = getOperationOnBothSides(
                resolvedSteps[resolvedSteps.length - 1],
                selectText,
                inputText
            )
        } else {
            console.log("handleSubmit => simplify expression : " + selectText + " to " + inputText)
            response = getSimplifyExpressionResponse(
                resolvedSteps[resolvedSteps.length - 1],
                selectText,
                inputText
            )
        }

        console.log(response)
        if (response.status === "OK") {
            setResolvedSteps((prev) => {
                const newSteps = [...prev]
                newSteps.push(response.text)
                return newSteps;
            })
            setErrorMessage('')
        } else if (response.status === "ERROR"){
            console.log(response.text)
            setErrorMessage(response.text)
        }
    }

    return (
        <div>
            <div>
                {resolvedSteps !== undefined && resolvedSteps.map((resolvedStep, index) => {
                    if (index === resolvedSteps.length - 1) {
                        return (
                            <Solver handleSubmit={handleSubmit} key={index}>
                                {resolvedStep}
                            </Solver>
                        )
                    }
                    return <div>{resolvedStep}</div>
                })}
            </div>
            <div>
                {errorMessage}
            </div>
        </div>
    )
}

export default SolvingComponent