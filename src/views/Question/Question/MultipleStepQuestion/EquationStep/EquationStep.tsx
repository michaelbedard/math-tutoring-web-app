import {AnsEquationStepType, AnsGraphStepType, DefVariableType} from "../../../../../helper/entities/AnswerRelated";
import React, {useEffect, useRef, useState} from "react";
import {EquationType} from "../../../../../helper/entities/QuestionRelated";
import UntouchedComponent from "./StateComponents/UntouchedComponent";
import DropComponent from "./StateComponents/DropComponent";
import SolvingComponent from "./StateComponents/SolvingComponent";
import SolvedComponent from "./StateComponents/SolvedComponent";
import {getInitialResolvedStep} from "../../../../../utils/EquationStepRelated/getInitialResolvedStep";


type EquationStep2Props = {
    setAnswerData: React.Dispatch<(AnsEquationStepType | AnsGraphStepType)[]>
    stepIndex: number;
    info: AnsEquationStepType
}


const EquationStep = ({setAnswerData, stepIndex, info}: EquationStep2Props) => {
    const [state, setState] = useState<"Untouched" | "Drop" | "Solving" | "Solved">(info.state);
    const [equationUsed, setEquationUsed] = useState<EquationType | null>(info.equationUsed);
    const [variablesUsed, setVariablesUsed] = useState<(DefVariableType | null)[]>(info.variablesUsed);
    const [resolvedSteps, setResolvedSteps] = useState<string[]>(info.resolvedSteps);

    const [variablesUsedStatus, setVariableUsedStatus] = useState<("OK" | "DANGER")[]>([])

    useEffect(() => {
        // @ts-ignore
        setAnswerData((prev: (AnsEquationStepType | AnsGraphStepType)[]) => {
            const newAnswerData = [...prev];
            newAnswerData[stepIndex] = {
                ...(newAnswerData[stepIndex] as AnsEquationStepType),
                state: state,
                equationUsed: equationUsed,
                variablesUsed: variablesUsed,
                resolvedSteps: resolvedSteps,
            };
            return newAnswerData;
        });
    }, [state, equationUsed, variablesUsed, resolvedSteps]);

    useEffect(() => {
        if (equationUsed === null) {
            setState("Untouched")
        } else {
            setState("Drop")
            setVariableUsedStatus(Array(equationUsed.variables.length).fill("OK"))
        }
    }, [equationUsed])

    useEffect(() => {
            if (equationUsed === null || variablesUsed.length === 0 || variablesUsed.length === 1) return;
            let count = 0;
            let danger = false
            for (let currIndex = 0; currIndex < variablesUsed.length; currIndex++) {
                if (variablesUsed[currIndex] === null) {
                    count ++;
                } else {
                    const currEquationUnit = equationUsed?.variables[currIndex].units
                    const currUnit = variablesUsed[currIndex]?.units;
                    console.log(currEquationUnit)
                    console.log(currUnit)

                    if (currEquationUnit?.symbol === "Any") {
                        console.log(equationUsed?.variables[currIndex].similarIndex)
                        for (const similarIndex of equationUsed?.variables[currIndex].similarIndex) {
                            console.log(variablesUsed[similarIndex])
                            if (variablesUsed[similarIndex] !== null
                                && currUnit?.symbol.toLowerCase() !== variablesUsed[similarIndex]?.units.symbol.toLowerCase()) {
                                console.log(currUnit?.symbol + " : " + variablesUsed[similarIndex]?.units.symbol)
                                setVariableUsedStatus((prev) => {
                                    const newList = [...prev];
                                    newList[currIndex] = "DANGER";
                                    newList[similarIndex] = "DANGER";
                                    return newList
                                })
                                danger = true;
                            }
                        }
                    } else {
                        if (currUnit?.symbol.toLowerCase() !== equationUsed?.variables[currIndex].units.symbol.toLowerCase()) {
                            setVariableUsedStatus((prev) => {
                                const newList = [...prev];
                                newList[currIndex] = "DANGER";
                                return newList
                            })
                            danger = true;
                        }
                    }
                }
            }
            if (count === 1 && !danger){
                setState("Solving")
                setResolvedSteps(() => {
                    return [getInitialResolvedStep(equationUsed, variablesUsed)]
                })
            } else {
                setState("Drop")
                setResolvedSteps([])
            }
    }, [variablesUsed])

    useEffect(() => {
        if (resolvedSteps && resolvedSteps.length > 0) {
            const lastStep = resolvedSteps[resolvedSteps.length - 1]
            const lastStepParts = lastStep.split("=")

            const letterRegex = /^[A-Za-z]+$/;
            const numberRegex = /^-?\d+(\.\d+)?$/;

            if (letterRegex.test(lastStepParts[0]) && numberRegex.test(lastStepParts[1])) {
                setState("Solved")
            } else if (letterRegex.test(lastStepParts[1]) && numberRegex.test(lastStepParts[0])) {
                setState("Solved")
                setResolvedSteps((prev) => {
                    const newSteps = [...prev]
                    newSteps[newSteps.length - 1] = `${lastStepParts[1]}=${lastStepParts[0]}`
                    return newSteps
                })
            } else if (letterRegex.test(lastStepParts[0]) && numberRegex.test(lastStepParts[1])) {

            }
        }
    }, [resolvedSteps])

    return (
        <div>
            {state === "Untouched" &&
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <UntouchedComponent
                        setEquationUsed={setEquationUsed}
                        setVariablesUsed={setVariablesUsed}
                    />
                </div>
            }
            {state !== "Untouched" &&
                <div style={{ display: "flex" }}>
                    <div style={{ flexBasis: state === "Solved" ? "70%" : "100%" }}>
                        <DropComponent
                            equationUsed={equationUsed}
                            setVariablesUsed={setVariablesUsed}
                            variablesUsedStatus={variablesUsedStatus}
                            variablesUsed={variablesUsed}/>
                        <SolvingComponent
                            resolvedSteps={resolvedSteps}
                            setResolvedSteps={setResolvedSteps}/>
                    </div>
                    <div style={{ flexBasis: state === "Solved" ? "30%" : "0%" }}>
                        {state === "Solved" &&
                            <SolvedComponent
                                equationUsed={equationUsed}
                                variablesUsed={variablesUsed}
                                lastStep={resolvedSteps[resolvedSteps.length - 1]}/>
                        }
                    </div>
                </div>
            }
            <button onClick={()=>console.log(variablesUsedStatus)}>show status</button>
        </div>
    );
};


export default EquationStep