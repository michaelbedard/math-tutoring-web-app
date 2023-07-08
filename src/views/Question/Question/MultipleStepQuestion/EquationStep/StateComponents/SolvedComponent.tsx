import {EquationType} from "../../../../../../helper/entities/QuestionRelated";
import {DefVariableType} from "../../../../../../helper/entities/AnswerRelated";
import React, {useEffect, useState} from "react";
import Draggable from "../../../../../../components/Draggable/Draggable";

type SolvedComponentProps = {
    equationUsed: EquationType | null;
    variablesUsed: (DefVariableType | null)[],
    lastStep: string
}

const SolvedComponent = ({equationUsed, variablesUsed, lastStep}: SolvedComponentProps) => {
    const [value, setValue] = useState('')
    const [symbol, setSymbol] = useState('')

    useEffect(() => {
        if (equationUsed !== undefined && equationUsed !== null) {
            const lastStepPart = lastStep.split("=")
            const label = lastStepPart[0];
            setValue(lastStepPart[1])

            setSymbol(() => {
                for (const variable of equationUsed?.variables) {
                    if (variable.label === label) {
                        console.log(variable)
                        if (variable.units.symbol === "None") {
                            return "";
                        } else if (variable.units.symbol === "Any") {
                            console.log(variablesUsed)
                            console.log(variablesUsed[variable.similarIndex[0]])
                            setSymbol((variablesUsed[variable.similarIndex[0]] as DefVariableType)?.units.symbol)
                        } else {
                            return variable.units.symbol
                        }
                    }
                }
                return "";
            })
        }
    }, [equationUsed, variablesUsed, lastStep])

    function handleOnDragStart(e: React.DragEvent, currDefVariable: DefVariableType) {
        console.log(currDefVariable)
        e.currentTarget.classList.add("dragging");
        e.dataTransfer.setData("application/json", JSON.stringify(currDefVariable));
    }

    return (
        <div>
            <Draggable
                status={"OK"}
                handleOnDragStart={(e:React.DragEvent) =>
                    handleOnDragStart(e, {value: parseInt(value), units:{symbol: symbol}, status: "Ok"})
            }
                label={`${value} ${symbol}`}
            />
        </div>
    )
}

export default SolvedComponent