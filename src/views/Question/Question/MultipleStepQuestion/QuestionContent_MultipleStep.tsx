import {EquationStepType, GraphStepType, UnitsChangeStepType} from "../../../../helper/entities/QuestionRelated";
import React, {createContext, ReactNode, useEffect, useState} from "react";
import {AnsEquationStepType, AnsGraphStepType} from "../../../../helper/entities/AnswerRelated";
import AnswerContext from "../../../../helper/context/AnswerContext";
import {EmptyAnsEquationStepType} from "../../../../utils/EmptyEntities/AnswerRelated";
import EquationStep from "./EquationStep/EquationStep";
import StepRowContainer from "./components/StepRow/StepRowContainer";
type QuestionContent_MultipleStepProps = {
    questionContentObj: (EquationStepType | GraphStepType | UnitsChangeStepType)[]
}

const QuestionContent_MultipleStep = ({questionContentObj}: QuestionContent_MultipleStepProps) => {
    const [answerData, setAnswerData] = useState<(AnsEquationStepType | AnsGraphStepType)[]>([]);
    const [indexList, setIndexList] = useState([0, 1, 2])

    useEffect(() => {
        setAnswerData(():(AnsEquationStepType | AnsGraphStepType)[] => {
            const newAnswerData: (AnsEquationStepType | AnsGraphStepType)[] = []

            questionContentObj.map((step, index) => {
                if (step.type === "EQUATION") {
                    newAnswerData.push(EmptyAnsEquationStepType(step.name, index));
                } else {
                    newAnswerData.push(EmptyAnsEquationStepType(step.name, index)); //change
                }
            });
            return newAnswerData;
        })
    }, [])

    function handleOnDragStart(e: React.DragEvent, stepIndex: number) {
        e.currentTarget.classList.add("dragging");
        e.dataTransfer.setData("number", String(stepIndex))
        console.log(e.dataTransfer.getData("number"))
    }

    function handleOnDrop(e: React.DragEvent, stepIndex: number) {
        const transferData = parseInt(e.dataTransfer.getData("number"));
        console.log("dropped step with index " + transferData + " to index " + stepIndex)
        console.log(e.target as HTMLElement)

        if (true) {
            setIndexList((prev) => {
                const newList = [...prev]
                const oldValue = newList[prev.indexOf(stepIndex)];
                newList[prev.indexOf(stepIndex)] = newList[prev.indexOf(transferData)]
                newList[prev.indexOf(transferData)] = oldValue
                return newList;
            })
        }

    }

    function handleOnDragOver(e: React.DragEvent) {
        console.log("drag over")
        e.preventDefault();
    }


    return (
        <AnswerContext.Provider value={answerData}>
            {indexList.map((stepIndex) => {
                const currStep = answerData.find((step) => step.id === stepIndex)
                if (currStep === undefined) {
                    return;
                }
                if (currStep.type === "EQUATION") {
                    return (
                        <StepRowContainer
                            key={stepIndex}
                            label={currStep.label}
                            stepIndex={stepIndex}
                            handleDragStart={(e: React.DragEvent, index: number) => handleOnDragStart(e, index)}
                            handleOnDrop={(e: React.DragEvent, index: number) => handleOnDrop(e, index)}
                            handleOnDragOver={(e:React.DragEvent) => handleOnDragOver(e)}
                        >
                            <EquationStep
                                setAnswerData={setAnswerData}
                                stepIndex={stepIndex}
                                info={currStep as AnsEquationStepType}
                                />
                        </StepRowContainer>
                    );
                } else if (currStep.type === "GRAPH") {
                    //complete
                }
                return null;
            })}
            {/*<button onClick={() => switchOrder(0, 2)}> switch </button>*/}
        </AnswerContext.Provider>
    )
}

export default QuestionContent_MultipleStep