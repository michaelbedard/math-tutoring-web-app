import {DefVariableType} from "../../../../../../helper/entities/AnswerRelated";
import {EquationType} from "../../../../../../helper/entities/QuestionRelated";
import Droppable from "../../../../../../components/Droppable/Droppable";
import Draggable from "../../../../../../components/Draggable/Draggable";
import React, {useState} from "react";

type DropComponentProps = {
    equationUsed: EquationType | null,
    variablesUsed: (DefVariableType | null)[];
    variablesUsedStatus: ("OK" | "DANGER")[]
    setVariablesUsed: React.Dispatch<React.SetStateAction<(DefVariableType | null)[]>>;
}

const DropComponent = ({equationUsed, variablesUsed, variablesUsedStatus, setVariablesUsed}: DropComponentProps) => {
    const [dragging, setDragging] = useState(false);

    function handleOnDragStart(e: React.DragEvent, currDefVariable: DefVariableType) {
        e.currentTarget.classList.add("dragging");
        e.dataTransfer.setData("application/json", JSON.stringify(currDefVariable));
        setDragging(true);
    }

    function handleDragEnd(e: React.DragEvent, placeholderIndex: number) {
        const dropEffect = e.dataTransfer.dropEffect
        if (dropEffect === "copy") {

            setVariablesUsed((prev => {
                const newVariablesUsed = [...prev];
                newVariablesUsed[placeholderIndex] = null;
                return newVariablesUsed;
            }));
        }
        setDragging(false);
    }

    function handleOnDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    function handleOnDrop(e: React.DragEvent, placeholderIndex: number) {
        e.preventDefault();

        if (true) { //(e.target as HTMLElement).classList.contains("variable-drop-zone")
            const transferData = JSON.parse(e.dataTransfer.getData("application/json")) as DefVariableType;

            setVariablesUsed((prev => {
                const newVariablesUsed = [...prev];
                newVariablesUsed[placeholderIndex] = transferData;
                return newVariablesUsed;
            }));
        }
    }

    const formulaPart = equationUsed !== null ?
        equationUsed.formula.split(/\[([^\]]+)]/) : [];

    return (
        <div>
            <div>
                {formulaPart.map((part, index) => {
                    const isPlaceholder = index % 2 === 1;
                    if (isPlaceholder) {
                        const placeholderIndex = Math.floor(index / 2);
                        const currDefVariable = variablesUsed[placeholderIndex];

                        if (currDefVariable === null) {
                            return (
                                <span key={index}>
              <Droppable
                  className={"variable-drop-zone"}
                  handleOnDrop={(e: React.DragEvent) => handleOnDrop(e, placeholderIndex)}
                  handleDragOver={(e: React.DragEvent) => handleOnDragOver(e)}
                  label={(equationUsed as EquationType).variables[placeholderIndex].label}
              />
            </span>
                            );
                        } else {
                            return (
                                <span key={index}>
              <Draggable
                  status={variablesUsedStatus[placeholderIndex]}
                  handleOnDragStart={(e: React.DragEvent) => handleOnDragStart(e, currDefVariable)}
                  handleDragEnd={(e: React.DragEvent) => handleDragEnd(e, placeholderIndex)}
                  label={`${currDefVariable.value} ${currDefVariable.units.symbol}`}
              />
            </span>
                            );
                        }
                    } else {
                        return <span key={index}>{part}</span>;
                    }
                })}
            </div>
            {dragging && (
                <div
                    onDragOver={(e: React.DragEvent) => handleOnDragOver(e)}
                    onDrop={() => console.log("object deleted")}
                >
                    Delete
                </div>
            )}
        </div>
    )
}

export default DropComponent